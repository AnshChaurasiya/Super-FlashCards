import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Stack, LinearProgress, Chip } from '@mui/material';
import { Star } from 'lucide-react';

type Flashcard = {
  id: string;
  question: string;
  answer: string;
  starred: boolean;
  lastReviewed?: Date;
  difficulty?: 'easy' | 'medium' | 'hard';
};

interface StatsDialogProps {
  open: boolean;
  onClose: () => void;
  studyTime: number;
  correctAnswers: number;
  wrongAnswers: number;
  totalCards: number;
  cards: Flashcard[];
  isDarkMode: boolean;
  formatTime: (seconds: number) => string;
}

const StatsDialog: React.FC<StatsDialogProps> = ({
  open,
  onClose,
  studyTime,
  correctAnswers,
  wrongAnswers,
  totalCards,
  cards,
  isDarkMode,
  formatTime,
}) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>Study Statistics</DialogTitle>
    <DialogContent>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Current Session
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Study Time
            </Typography>
            <Typography variant="h5">{formatTime(studyTime)}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Cards Studied
            </Typography>
            <Typography variant="h5">
              {correctAnswers + wrongAnswers} / {totalCards}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Accuracy
            </Typography>
            <Typography variant="h5">
              {correctAnswers + wrongAnswers > 0
                ? Math.round((correctAnswers / (correctAnswers + wrongAnswers)) * 100)
                : 0}
              %
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <LinearProgress
              variant="determinate"
              value={
                correctAnswers + wrongAnswers > 0
                  ? (correctAnswers / (correctAnswers + wrongAnswers)) * 100
                  : 0
              }
              color="success"
              sx={{ height: 10, borderRadius: 5, mb: 1 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="success.main">
                Correct: {correctAnswers}
              </Typography>
              <Typography variant="body2" color="error.main">
                Wrong: {wrongAnswers}
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Flashcard Breakdown
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Chip label={`Easy: ${cards.filter(c => c.difficulty === 'easy').length}`} color="success" />
          <Chip label={`Medium: ${cards.filter(c => c.difficulty === 'medium').length}`} color="primary" />
          <Chip label={`Hard: ${cards.filter(c => c.difficulty === 'hard').length}`} color="error" />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Chip
            label={`Starred: ${cards.filter(c => c.starred).length}`}
            icon={<Star size={16} />}
            sx={{
              bgcolor: isDarkMode ? 'rgba(245, 0, 87, 0.2)' : 'rgba(245, 0, 87, 0.1)',
              color: '#f50057',
            }}
          />
          <Chip label={`Total: ${cards.length}`} variant="outlined" />
        </Box>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

export default StatsDialog; 