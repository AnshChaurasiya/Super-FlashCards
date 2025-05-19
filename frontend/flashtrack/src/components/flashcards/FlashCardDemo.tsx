'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Stack, useTheme } from '@mui/material';

// Sample demo flashcards
const demoFlashcards = [
  { id: '1', question: 'What is the capital of France?', answer: 'Paris' },
  { id: '2', question: 'What is 2 + 2?', answer: '4' },
  { id: '3', question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
];

export default function FlashcardDemo() {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  
  const currentCard = demoFlashcards[currentIndex];

  const handleMouseMove = (e:any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setGlowPosition({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % demoFlashcards.length);
    }, 300);
  };

  // Dynamic glow effect based on theme
  const glowColor = theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(0, 0, 0, 0.05)';

  const glowStyle = isHovered
    ? {
        background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}, transparent 60%)`,
      }
    : {};

  // Theme-responsive colors
  const faceStyle = {
    borderRadius: 16,
    px: 3,
    py: 4,
    background: theme.palette.mode === 'dark'
      ? "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))"
      : "linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.01))",
    border: theme.palette.mode === 'dark'
      ? "1px solid rgba(255, 255, 255, 0.2)"
      : "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: theme.palette.mode === 'dark'
      ? "0 8px 32px rgba(0, 0, 0, 0.25)"
      : "0 8px 32px rgba(0, 0, 0, 0.05)",
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    transition: "background 0.2s ease",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        height: 300,
        mx: "auto",
        mb: 4,
        perspective: "1000px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <Box
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setFlipped((prev) => !prev)}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          mb: 2,
        }}
      >
        {/* Front Face */}
        <Box
          sx={{
            ...faceStyle,
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            ...glowStyle,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Question
          </Typography>
          <Typography variant="body1">{currentCard.question}</Typography>
        </Box>

        {/* Back Face */}
        <Box
          sx={{
            ...faceStyle,
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            ...glowStyle,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Answer
          </Typography>
          <Typography variant="body1" mb={2}>
            {currentCard.answer}
          </Typography>
        </Box>
      </Box>

      <Box textAlign="center" mt={4}>
        <Button variant="contained" onClick={handleNext} sx={{ mx: 1 }}>
          Next Card
        </Button>
        <Button variant="outlined" onClick={() => setFlipped(!flipped)} sx={{ mx: 1 }}>
          {flipped ? "Show Question" : "Show Answer"}
        </Button>
      </Box>
      
      <Typography textAlign="center" variant="body2" color="text.secondary" mt={2} mb ={1}>
        Click the card to flip or use the buttons below
      </Typography>
    </Box>
  );
}