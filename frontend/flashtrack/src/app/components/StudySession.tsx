import React from 'react';
import { Box, Typography, LinearProgress, Chip, Stack, Button, Tooltip, Fade, Zoom, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { X, Check, ChevronLeft, ChevronRight, RotateCcw, Star, StarOff } from 'lucide-react';

// Types
export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  starred: boolean;
  lastReviewed?: Date;
  difficulty?: 'easy' | 'medium' | 'hard';
};

interface StudySessionProps {
  started: boolean;
  filteredCards: Flashcard[];
  currentIndex: number;
  totalCards: number;
  flipped: boolean;
  isDarkMode: boolean;
  currentCard: Flashcard | undefined;
  handlePrevious: () => void;
  handleNext: () => void;
  setFlipped: (v: boolean) => void;
  handleAnswerResponse: (correct: boolean) => void;
  toggleStar: (id: string) => void;
  exitStudy: () => void;
  glowStyle: any;
  faceStyle: any;
  handleMouseMove: (e: any) => void;
  handleMouseLeave: () => void;
}

const StudySession: React.FC<StudySessionProps> = ({
  started,
  filteredCards,
  currentIndex,
  totalCards,
  flipped,
  isDarkMode,
  currentCard,
  handlePrevious,
  handleNext,
  setFlipped,
  handleAnswerResponse,
  toggleStar,
  exitStudy,
  glowStyle,
  faceStyle,
  handleMouseMove,
  handleMouseLeave,
}) => {
  if (!started || !filteredCards.length) return null;
  return (
    <Fade in={true}>
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          <Zoom in={true}>
            <span>🔁 Study Mode</span>
          </Zoom>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography textAlign="center" variant="body2">
            Card {currentIndex + 1} of {totalCards}
          </Typography>
          {currentCard && currentCard.difficulty && (
            <Chip
              label={currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
              color={
                currentCard.difficulty === 'easy'
                  ? 'success'
                  : currentCard.difficulty === 'medium'
                  ? 'primary'
                  : 'error'
              }
              size="small"
            />
          )}
        </Box>
        <Box sx={{ position: 'relative', mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={((currentIndex + 1) / totalCards) * 100}
            sx={{
              height: 8,
              borderRadius: 4,
              background: isDarkMode
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.05)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: `${((currentIndex + 1) / totalCards) * 100}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: isDarkMode ? '#bb86fc' : '#1976d2',
              width: 16,
              height: 16,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 0 2px white',
              zIndex: 1,
            }}
          >
            <Typography variant="caption" sx={{ color: 'white', fontSize: '0.6rem' }}>
              {currentIndex + 1}
            </Typography>
          </Box>
        </Box>
        {/* Flashcard with flip and glow */}
        <Box
          component={motion.div}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{
            width: '100%',
            maxWidth: 500,
            height: 300,
            mx: 'auto',
            mb: 4,
            perspective: '1000px',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <Box
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setFlipped(!flipped)}
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s ease',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front Face */}
            <Box
              sx={{
                ...faceStyle,
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                ...glowStyle,
              }}
            >
              <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                <IconButton
                  size="small"
                  onClick={e => {
                    e.stopPropagation();
                    if (currentCard) toggleStar(currentCard.id);
                  }}
                  sx={{ color: isDarkMode ? '#bb86fc' : '#f50057' }}
                >
                  {currentCard && currentCard.starred ? <Star size={18} /> : <StarOff size={18} opacity={0.6} />}
                </IconButton>
              </Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ mb: 3, color: isDarkMode ? '#bb86fc' : '#1976d2', fontWeight: 'bold' }}
              >
                Question
              </Typography>
              <Typography variant="body1" sx={{ maxHeight: 180, overflow: 'auto' }}>
                {currentCard && currentCard.question}
              </Typography>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                  opacity: 0.7,
                }}
              >
                <RotateCcw size={14} style={{ marginRight: 4 }} />
                Tap to flip
              </Box>
            </Box>
            {/* Back Face */}
            <Box
              sx={{
                ...faceStyle,
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                ...glowStyle,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ mb: 3, color: isDarkMode ? '#bb86fc' : '#1976d2', fontWeight: 'bold' }}
              >
                Answer
              </Typography>
              <Typography variant="body1" sx={{ maxHeight: 180, overflow: 'auto' }}>
                {currentCard && currentCard.answer}
              </Typography>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                  opacity: 0.7,
                }}
              >
                <RotateCcw size={14} style={{ marginRight: 4 }} />
                Tap to flip
              </Box>
            </Box>
          </Box>
        </Box>
        <Stack spacing={2} sx={{ mb: 4 }}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Tooltip title="I got it wrong">
              <Button
                variant="contained"
                color="error"
                startIcon={<X />}
                onClick={() => handleAnswerResponse(false)}
                sx={{ borderRadius: 999, px: 3 }}
              >
                Didn't Know
              </Button>
            </Tooltip>
            <Button
              variant="outlined"
              onClick={() => setFlipped(!flipped)}
              sx={{
                borderRadius: 999,
                minWidth: 120,
                borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              }}
            >
              {flipped ? 'Show Question' : 'Show Answer'}
            </Button>
            <Tooltip title="I got it right">
              <Button
                variant="contained"
                color="success"
                startIcon={<Check />}
                onClick={() => handleAnswerResponse(true)}
                sx={{ borderRadius: 999, px: 3 }}
              >
                Got It
              </Button>
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              disabled={currentIndex === 0}
              onClick={handlePrevious}
              startIcon={<ChevronLeft />}
              sx={{ borderRadius: 999 }}
            >
              Previous
            </Button>
            <Button
              disabled={currentIndex + 1 >= totalCards}
              onClick={handleNext}
              endIcon={<ChevronRight />}
              variant="contained"
              sx={{ borderRadius: 999 }}
            >
              Next
            </Button>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <Button
              variant="text"
              size="small"
              onClick={exitStudy}
              startIcon={<X size={16} />}
              sx={{ color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}
            >
              Exit Study Mode
            </Button>
          </Box>
        </Stack>
      </Box>
    </Fade>
  );
};

export default StudySession; 