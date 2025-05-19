import React from 'react';
import { Box, Typography, IconButton, Slide, Chip } from '@mui/material';
import { Edit, Trash2, Heart } from 'lucide-react';

type Flashcard = {
  id: string;
  question: string;
  answer: string;
  starred: boolean;
  lastReviewed?: Date;
  difficulty?: 'easy' | 'medium' | 'hard';
};

interface FlashcardListProps {
  filteredCards: Flashcard[];
  isDarkMode: boolean;
  searchQuery: string;
  handleEditCard: (id: string) => void;
  handleDeleteCard: (id: string) => void;
}

const FlashcardList: React.FC<FlashcardListProps> = ({
  filteredCards,
  isDarkMode,
  searchQuery,
  handleEditCard,
  handleDeleteCard,
}) => (
  <Box
    sx={{
      mt: 4,
      p: 3,
      borderRadius: 2,
      bgcolor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.03)',
      position: 'relative',
      zIndex: 2,
    }}
  >
    <Typography variant="h6" sx={{ mb: 2 }}>
      📚 Your Flashcards
    </Typography>
    <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
      {filteredCards.length > 0 ? (
        filteredCards.map((card, index) => (
          <Slide
            direction="right"
            in={true}
            key={card.id}
            style={{ transformOrigin: '0 0 0' }}
            {...{ timeout: 100 + index * 50 }}
          >
            <Box
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  bgcolor:
                    card.difficulty === 'easy'
                      ? '#4caf50'
                      : card.difficulty === 'medium'
                      ? '#2196f3'
                      : '#f44336',
                }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, pr: 6 }}>
                {card.question}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {card.answer}
              </Typography>
              <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex' }}>
                {card.starred && <Heart size={16} color="#f50057" fill="#f50057" style={{ marginRight: 8 }} />}
                <IconButton size="small" onClick={() => handleEditCard(card.id)} sx={{ mr: 1 }}>
                  <Edit size={16} />
                </IconButton>
                <IconButton size="small" onClick={() => handleDeleteCard(card.id)} color="error">
                  <Trash2 size={16} />
                </IconButton>
              </Box>
            </Box>
          </Slide>
        ))
      ) : (
        <Typography variant="body2" sx={{ textAlign: 'center', py: 3, opacity: 0.7 }}>
          No cards found. {searchQuery ? 'Try a different search term.' : 'Add some flashcards to get started!'}
        </Typography>
      )}
    </Box>
  </Box>
);

export default FlashcardList; 