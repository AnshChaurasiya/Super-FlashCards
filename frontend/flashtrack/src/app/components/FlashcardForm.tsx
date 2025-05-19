import React from 'react';
import { Box, Typography, TextField, Button, Stack, Chip, InputAdornment, Menu, MenuItem, Divider, IconButton } from '@mui/material';
import { Check, Save, HelpCircle } from 'lucide-react';

interface FlashcardFormProps {
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  editMode: boolean;
  onQuestionChange: (v: string) => void;
  onAnswerChange: (v: string) => void;
  onDifficultyChange: (d: 'easy' | 'medium' | 'hard') => void;
  onSubmit: () => void;
  onCancelEdit: () => void;
  anchorEl: null | HTMLElement;
  handleMenuClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleMenuClose: () => void;
  setStatsDialogOpen: (v: boolean) => void;
  exportCards: () => void;
  resetStudySession: () => void;
  isDarkMode: boolean;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({
  question,
  answer,
  difficulty,
  editMode,
  onQuestionChange,
  onAnswerChange,
  onDifficultyChange,
  onSubmit,
  onCancelEdit,
  anchorEl,
  handleMenuClick,
  handleMenuClose,
  setStatsDialogOpen,
  exportCards,
  resetStudySession,
  isDarkMode
}) => {
  // Styles (should be moved to a shared file or context if reused)
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

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: 'auto',
        mb: 4,
        position: 'relative',
        zIndex: 2,
        backdropFilter: 'blur(8px)',
        backgroundColor: isDarkMode
          ? 'rgba(30, 30, 30, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
        borderRadius: 4,
        p: 3,
        boxShadow: isDarkMode
          ? '0 8px 32px rgba(0, 0, 0, 0.3)'
          : '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          {editMode ? '✏️ Edit Flashcard' : '✨ Create Flashcard'}
        </Typography>
        <Box>
          <IconButton
            onClick={handleMenuClick}
            sx={{ color: isDarkMode ? '#bb86fc' : '#1976d2' }}
          >
            <HelpCircle size={20} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => setStatsDialogOpen(true)}>
              Study Statistics
            </MenuItem>
            <MenuItem onClick={exportCards}>
              Export Flashcards
            </MenuItem>
            <Divider />
            <MenuItem onClick={resetStudySession}>
              Reset Session
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box
        component="form"
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <TextField
          fullWidth
          label="Question"
          variant="outlined"
          value={question}
          onChange={e => onQuestionChange(e.target.value)}
          sx={{ mb: 2 }}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <HelpCircle size={18} opacity={0.7} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Answer"
          variant="outlined"
          value={answer}
          onChange={e => onAnswerChange(e.target.value)}
          sx={{ mb: 2 }}
          required
          multiline
          rows={2}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Check size={18} opacity={0.7} />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Difficulty:
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              label="Easy"
              color={difficulty === 'easy' ? 'success' : 'default'}
              onClick={() => onDifficultyChange('easy')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="Medium"
              color={difficulty === 'medium' ? 'primary' : 'default'}
              onClick={() => onDifficultyChange('medium')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="Hard"
              color={difficulty === 'hard' ? 'error' : 'default'}
              onClick={() => onDifficultyChange('hard')}
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              ...(editMode ? waveButtonBlue : waveButtonGreen),
              py: 1.5,
              borderRadius: '999px',
              flex: 1,
            }}
            startIcon={editMode ? <Save /> : <Check />}
          >
            {editMode ? 'Update Card' : 'Add Card'}
          </Button>
          {editMode && (
            <Button
              variant="outlined"
              onClick={onCancelEdit}
              sx={{ borderRadius: '999px' }}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default FlashcardForm; 