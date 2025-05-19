'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  LinearProgress,
  Stack,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Slide,
  Fade,
  Zoom
} from '@mui/material';
import { useTheme } from '@/context/theme-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Check, X, ChevronRight, ChevronLeft, 
  Shuffle, Edit, Trash2, Save, Star, StarOff,
  HelpCircle, RotateCcw, Copy, Heart
} from 'lucide-react';

// Animation-related imports
import { motion } from 'framer-motion';
import FlashcardForm from './components/FlashcardForm';
import FlashcardList from './components/FlashcardList';
import StudySession from './components/StudySession';
import StatsDialog from './components/StatsDialog';

type Flashcard = {
  id: string;
  question: string;
  answer: string;
  starred: boolean;
  lastReviewed?: Date;
  difficulty?: 'easy' | 'medium' | 'hard';
};

type FloatingObject = {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
};

const LOCAL_STORAGE_KEY = 'enhancedFlashcards';

const generateId = () => Math.random().toString(36).substring(2, 9);

export default function EnhancedCards() {
  const { theme } = useTheme();
  const router = useRouter();
  const containerRef = useRef(null);
  const animationRef = useRef<number | null>(null);

  
  // State variables
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [started, setStarted] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editCardId, setEditCardId] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState('');
  const [shuffleMode, setShuffleMode] = useState(false);
  const [statsDialogOpen, setStatsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [studySessionStarted, setStudySessionStarted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [studyTime, setStudyTime] = useState(0);
  const [floatingObjects, setFloatingObjects] = useState<FloatingObject[]>([]);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [completionConfetti, setCompletionConfetti] = useState(false);
  
  // Styles
  const isDarkMode = theme === 'dark';
  
  const baseButtonStyle = {
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    transition: 'all 0.3s ease',
  };
  
  const waveButtonStyle = {
    ...baseButtonStyle,
    color: '#fff',
    backgroundColor: isDarkMode ? '#bb86fc' : '#1976d2',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: isDarkMode
        ? 'linear-gradient(120deg, #bb86fc, #3700b3)'
        : 'linear-gradient(120deg, #42a5f5, #1976d2)',
      zIndex: -1,
      transition: 'left 0.5s ease',
    },
    '&:hover::before': {
      left: 0,
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 7px 14px rgba(0,0,0,0.1)',
    },
  };

  const waveButtonGreen = {
    ...waveButtonStyle,
    backgroundColor: '#4caf50',
    '&::before': {
      ...waveButtonStyle['&::before'],
      background: 'linear-gradient(120deg, #66bb6a, #388e3c)',
    },
  };

  const waveButtonOrange = {
    ...waveButtonStyle,
    backgroundColor: '#fb8c00',
    '&::before': {
      ...waveButtonStyle['&::before'],
      background: 'linear-gradient(120deg, #ffb74d, #ef6c00)',
    },
  };

  const waveButtonBlue = {
    ...waveButtonStyle,
    backgroundColor: isDarkMode ? '#bb86fc' : '#1976d2',
    '&::before': {
      ...waveButtonStyle['&::before'],
      background: isDarkMode
        ? 'linear-gradient(120deg, #bb86fc, #3700b3)'
        : 'linear-gradient(120deg, #42a5f5, #1976d2)',
    },
  };
  
  const faceStyle = {
    borderRadius: 16,
    px: 3,
    py: 4,
    background: isDarkMode
      ? 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))'
      : 'linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.01))',
    border: isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.2)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: isDarkMode
      ? '0 8px 32px rgba(0, 0, 0, 0.25)'
      : '0 8px 32px rgba(0, 0, 0, 0.05)',
    color: isDarkMode ? '#fff' : '#000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  };
  
  const glowStyle = isHovered
    ? {
        background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${
          isDarkMode ? 'rgba(187, 134, 252, 0.15)' : 'rgba(25, 118, 210, 0.08)'
        }, transparent 60%)`,
      }
    : {};
  
  // Interactive background logic
  useEffect(() => {
    const createFloatingObjects = () => {
      const objects = [];
      const count = 15; // Adjust number of objects
      
      for (let i = 0; i < count; i++) {
        objects.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 40 + 10, // Size between 10-50px
          speed: Math.random() * 0.1 + 0.05, // Speed between 0.05-0.15
          opacity: Math.random() * 0.15 + 0.05, // Opacity between 0.05-0.2
          rotation: Math.random() * 360,
        });
      }
      
      setFloatingObjects(objects);
    };
    
    createFloatingObjects();
    
    const animateObjects = () => {
      setFloatingObjects(prev => 
        prev.map(obj => ({
          ...obj,
          y: obj.y <= 100 ? obj.y + obj.speed : -10,
          rotation: (obj.rotation + 0.1) % 360,
        }))
      );
      
      animationRef.current = requestAnimationFrame(animateObjects);
    };
    
    animationRef.current = requestAnimationFrame(animateObjects);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Timer for study session
  useEffect(() => {
    let timer:any;
    if (studySessionStarted) {
      timer = setInterval(() => {
        setStudyTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [studySessionStarted]);
  
  // Load cards from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setCards(JSON.parse(saved));
      } catch {
        console.error('Failed to parse saved flashcards');
      }
    }
  }, []);
  
  // Save cards to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);
  
  // Update filtered cards when cards change
  useEffect(() => {
    filterCards();
  }, [cards, searchQuery]);
  
  // Functions
  const filterCards = () => {
    let filtered = [...cards];
    
    // Apply search query if any
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        card => 
          card.question.toLowerCase().includes(query) || 
          card.answer.toLowerCase().includes(query)
      );
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
    
    setFilteredCards(filtered);
  };
  
  const handleAddCard = () => {
    if (question.trim() && answer.trim()) {
      const newCard = {
        id: generateId(),
        question,
        answer,
        starred: false,
        lastReviewed: undefined,
        difficulty,
      };
      
      setCards([...cards, newCard]);
      setQuestion('');
      setAnswer('');
      setDifficulty('medium');
    }
  };
  
  const handleEditCard = (id:any) => {
    const cardToEdit = cards.find(card => card.id === id);
    if (cardToEdit) {
      setQuestion(cardToEdit.question);
      setAnswer(cardToEdit.answer);
      setDifficulty(cardToEdit.difficulty || 'medium');
      setEditMode(true);
      setEditCardId(id);
    }
  };
  
  const handleUpdateCard = () => {
    if (question.trim() && answer.trim()) {
      setCards(cards.map(card => 
        card.id === editCardId 
          ? { ...card, question, answer, difficulty } 
          : card
      ));
      
      setQuestion('');
      setAnswer('');
      setEditMode(false);
      setEditCardId('');
    }
  };
  
  const handleDeleteCard = (id: React.SetStateAction<string>) => {
    setCardToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    setCards(cards.filter(card => card.id !== cardToDelete));
    setDeleteDialogOpen(false);
    setCardToDelete('');
    
    // Reset to first card if we deleted the current card
    if (started && currentIndex >= cards.length - 1) {
      setCurrentIndex(0);
    }
  };
  
  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      if (currentIndex + 1 < filteredCards.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // End of deck
        setCompletionConfetti(true);
        setTimeout(() => setCompletionConfetti(false), 3000);
      }
    }, 300);
  };
  
  const handlePrevious = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 >= 0 ? prev - 1 : prev));
    }, 300);
  };
  
  const toggleStar = (id: string) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, starred: !card.starred } : card
    ));
  };
  
  const shuffleCards = () => {
    // Fisher-Yates shuffle algorithm
    let shuffled = [...filteredCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setFilteredCards(shuffled);
    setCurrentIndex(0);
    setFlipped(false);
    setShuffleMode(true);
  };
  
  const handleAnswerResponse = (correct: boolean) => {
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      setWrongAnswers(prev => prev + 1);
    }
    
    // Update last reviewed timestamp
    const currentCardId = filteredCards[currentIndex].id;
    setCards(cards.map(card => 
      card.id === currentCardId 
        ? { ...card, lastReviewed: new Date() } 
        : card
    ));
    
    handleNext();
  };
  
  const resetStudySession = () => {
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setStudyTime(0);
    setCurrentIndex(0);
    setFlipped(false);
    setStudySessionStarted(false);
  };
  
  const exportCards = () => {
    const dataStr = JSON.stringify(cards);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    // Create a link and trigger download
    const exportLink = document.createElement('a');
    exportLink.setAttribute('href', dataUri);
    exportLink.setAttribute('download', 'flashcards-export.json');
    document.body.appendChild(exportLink);
    exportLink.click();
    document.body.removeChild(exportLink);
  };
  
const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
};

  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleMouseMove = (e: { currentTarget: { getBoundingClientRect: () => any; }; clientX: number; clientY: number; }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x, y });
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const startStudy = () => {
    setStarted(true);
    setStudySessionStarted(true);
    setCurrentIndex(0);
    setFlipped(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setStudyTime(0);
    
    // Use filtered cards if there's a search, otherwise use all cards
    if (searchQuery.trim() === '') {
      setFilteredCards([...cards]);
    }
  };
  
  // Current card logic
  const currentCard = filteredCards[currentIndex];
  const totalCards = filteredCards.length;
  
  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <Container 
      sx={{ 
        py: 6, 
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden'
      }}
      ref={containerRef}
    >
      {/* Floating background objects */}
      {floatingObjects.map((obj) => (
        <Box
          key={obj.id}
          sx={{
            position: 'absolute',
            left: `${obj.x}%`,
            top: `${obj.y}%`,
            width: `${obj.size}px`,
            height: `${obj.size}px`,
            opacity: obj.opacity,
            borderRadius: '50%',
            background: isDarkMode 
              ? obj.id % 3 === 0 
                ? 'rgba(187, 134, 252, 0.3)' 
                : obj.id % 3 === 1 
                  ? 'rgba(3, 218, 198, 0.3)' 
                  : 'rgba(98, 0, 238, 0.3)'
              : obj.id % 3 === 0 
                ? 'rgba(25, 118, 210, 0.2)' 
                : obj.id % 3 === 1 
                  ? 'rgba(76, 175, 80, 0.2)' 
                  : 'rgba(0, 137, 123, 0.2)',
            transform: `rotate(${obj.rotation}deg)`,
            zIndex: 0,
            transition: 'transform 0.3s ease',
            boxShadow: isDarkMode 
              ? '0 0 15px rgba(187, 134, 252, 0.2)' 
              : '0 0 15px rgba(25, 118, 210, 0.1)',
          }}
        />
      ))}
      
      {/* Confetti effect for deck completion */}
      {completionConfetti && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, pointerEvents: 'none' }}>
          {Array.from({ length: 100 }).map((_, i) => (
            <Box
              key={i}
              component={motion.div}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: -20,
                rotate: Math.random() * 360
              }}
              animate={{ 
                y: window.innerHeight + 20,
                rotate: Math.random() * 360 
              }}
              transition={{ 
                duration: Math.random() * 2 + 2,
                ease: "linear" 
              }}
              sx={{
                position: 'absolute',
                width: Math.random() * 15 + 5,
                height: Math.random() * 15 + 5,
                background: i % 5 === 0 
                  ? '#ff4081' 
                  : i % 5 === 1 
                    ? '#03dac6' 
                    : i % 5 === 2 
                      ? '#bb86fc' 
                      : i % 5 === 3 
                        ? '#ffeb3b' 
                        : '#4caf50',
                borderRadius: i % 2 === 0 ? '50%' : '3px',
                opacity: 0.7,
              }}
            />
          ))}
        </Box>
      )}
      
      <Typography 
        variant="h4" 
        textAlign="center" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          position: 'relative',
          zIndex: 1,
          mb: 3
        }}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🧠 Super Flashcards
        </motion.div>
      </Typography>
      
      {/* Flashcard Form */}
      <FlashcardForm
        question={question}
        answer={answer}
        difficulty={difficulty}
        editMode={editMode}
        onQuestionChange={setQuestion}
        onAnswerChange={setAnswer}
        onDifficultyChange={setDifficulty}
        onSubmit={editMode ? handleUpdateCard : handleAddCard}
        onCancelEdit={() => {
          setEditMode(false);
          setQuestion('');
          setAnswer('');
          setEditCardId('');
        }}
        anchorEl={anchorEl}
        handleMenuClick={handleMenuClick}
        handleMenuClose={handleMenuClose}
        setStatsDialogOpen={setStatsDialogOpen}
        exportCards={exportCards}
        resetStudySession={resetStudySession}
        isDarkMode={isDarkMode}
      />
      
      {/* Search and session info */}
      <Box sx={{ mb: 4, position: 'relative', zIndex: 2 }}>
        <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
          <Chip 
            label={`${cards.length} ${cards.length === 1 ? 'Card' : 'Cards'}`} 
            size="small" 
            sx={{ mr: 1 }}
          />
          {studySessionStarted && (
            <>
              <Chip 
                label={`Time: ${formatTime(studyTime)}`} 
                size="small" 
                sx={{ mr: 1 }}
              />
              <Chip 
                label={`Correct: ${correctAnswers}`} 
                color="success" 
                size="small" 
                sx={{ mr: 1 }}
              />
              <Chip 
                label={`Wrong: ${wrongAnswers}`} 
                color="error" 
                size="small" 
              />
            </>
          )}
        </Typography>
        
        <Box sx={{ display: 'flex', mb: 3 }}>
          <TextField
            fullWidth
            label="Search cards..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mr: 2 }}
            size="small"
          />
          
          <Button 
            variant="contained" 
            onClick={() => setSearchQuery('')}
            sx={{ borderRadius: 2 }}
            disabled={!searchQuery}
          >
            Clear
          </Button>
        </Box>
        
        {showSearchResults && (
          <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
            Found {filteredCards.length} cards matching "{searchQuery}"
          </Typography>
        )}
        
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="contained"
            disabled={cards.length === 0}
            onClick={startStudy}
            sx={{
              py: 1.5,
              borderRadius: '999px',
              minWidth: 140,
            }}
          >
            ▶️ Start Study
          </Button>
          
          <Button
            variant="contained"
            disabled={cards.length === 0}
            onClick={shuffleCards}
            sx={{
              py: 1.5,
              borderRadius: '999px',
              minWidth: 140,
            }}
            startIcon={<Shuffle />}
          >
            Shuffle
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => window.location.href = '/'}
            sx={{
              py: 1.5,
              borderRadius: '999px',
              minWidth: 140,
            }}
          >
            🏠 Home
          </Button>
        </Stack>
      </Box>
      
      {/* Study Session */}
      <StudySession
        started={started && filteredCards.length > 0}
        filteredCards={filteredCards}
        currentIndex={currentIndex}
        totalCards={filteredCards.length}
        flipped={flipped}
        isDarkMode={isDarkMode}
        currentCard={filteredCards[currentIndex]}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        setFlipped={setFlipped}
        handleAnswerResponse={handleAnswerResponse}
        toggleStar={toggleStar}
        exitStudy={() => {
          setStarted(false);
          resetStudySession();
        }}
        glowStyle={glowStyle}
        faceStyle={faceStyle}
        handleMouseMove={handleMouseMove}
        handleMouseLeave={handleMouseLeave}
      />
      
      {/* Flashcard List */}
      {cards.length > 0 && !started && (
        <FlashcardList
          filteredCards={filteredCards}
          isDarkMode={isDarkMode}
          searchQuery={searchQuery}
          handleEditCard={handleEditCard}
          handleDeleteCard={handleDeleteCard}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Flashcard</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this flashcard? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Stats Dialog */}
      <StatsDialog
        open={statsDialogOpen}
        onClose={() => setStatsDialogOpen(false)}
        studyTime={studyTime}
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
        totalCards={filteredCards.length}
        cards={cards}
        isDarkMode={isDarkMode}
        formatTime={formatTime}
      />
    </Container>
  );
}