'use client';

import React from 'react';
import { Box, Container, Typography, Button, Grid, Avatar, Card, CardContent, Divider, IconButton, useMediaQuery } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import Header from './common/Header';
import CustomButton from './common/CustomButton';
import FallingCards from './Visuals/FallingCards';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '@/context/theme-context';
import { useRouter } from 'next/navigation';
import FlashcardDemo from './flashcards/FlashCardDemo';

const HomePage = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  const scrollTo = (id:any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Header />

      <Box
        id="home"
        sx={{
          background: theme === 'dark' 
            ? 'linear-gradient(to bottom, #1A1A2E, #16213E)' 
            : 'linear-gradient(to bottom, #F4F0FF, #EAF4FF)',
          minHeight: '100vh',
          color: theme === 'dark' ? '#FFFFFF' : '#1A1A40',
          position: 'relative',
          overflowX: 'hidden', // Prevent horizontal scrolling
        }}
      >
        {/* Hero Section */}
        <Container sx={{ 
          py: { xs: 6, sm: 8, md: 10 }, 
          textAlign: 'center', 
          scrollMarginTop: '100px',
          px: { xs: 2, sm: 4, md: 6 } 
        }}>
          <Typography
            variant={isMobile ? "h3" : "h2"}
            gutterBottom
            sx={{ 
              fontWeight: 800, 
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Master Memory with Flashcards
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="md"
            mx="auto"
            sx={{ 
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              px: { xs: 2, sm: 0 }
            }}
          >
            Flip cards, challenge your brain, and retain information more effectively.
            Our flashcard app combines design and science to help you study better.
          </Typography>

          {/* Try Button */}
          <Box mt={4}>
            <CustomButton
              text="Try Demo"
              onClick={() => scrollTo('demo')}
              isTryButton
            />
          </Box>
        </Container>

        {/* Demo Section */}
        <Container id="demo" sx={{ 
          py: { xs: 6, sm: 8, md: 10 }, 
          scrollMarginTop: '100px',
          px: { xs: 2, sm: 4, md: 6 }
        }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            textAlign="center" 
            sx={{ mb: 4 }}
          >
            🚀 Interactive Demo
          </Typography>
          
          <Box 
            sx={{ 
              background: theme === 'dark' 
                ? 'rgba(26, 32, 53, 0.6)' 
                : 'rgba(255, 255, 255, 0.6)', 
              backdropFilter: 'blur(8px)',
              borderRadius: 4,
              p: { xs: 2, sm: 3, md: 4 },
              mb: 6,
              position: 'relative',
              zIndex: 5
            }}
          >
            <FlashcardDemo />
            
            <Box textAlign="center" mt={isMobile ? 12 : 6} >
              <Button 
                variant="contained" 
                size={isMobile ? "medium" : "large"}
                onClick={() => router.push('/ownCards')}
                sx={{ 
                  mt: { xs: 2, sm: 3, md: 4 },
                  px: { xs: 3, md: 4 },
                  py: { xs: 1, md: 1.5 },
                  borderRadius: 2,
                  background: theme === 'dark' ? '#6C63FF' : '#3F51B5',
                  '&:hover': {
                    background: theme === 'dark' ? '#5A52D5' : '#303F9F',
                  },
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                }}
              >
                Start Building Your Deck ➤
              </Button>
            </Box>
          </Box>
        </Container>

        {/* Features Section */}
        <Container sx={{ 
          py: { xs: 6, sm: 8, md: 10 }, 
          scrollMarginTop: '100px',
          px: { xs: 2, sm: 4, md: 6 } 
        }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            textAlign="center" 
            sx={{ mb: { xs: 4, md: 6 } }}
          >
            ✨ Why FlashTrack?
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {[
              {
                title: 'Beautiful UI',
                description: 'Eye-catching animations and design that makes studying a joy',
                emoji: '🎨',
                icon: <CodeIcon fontSize="large" />
              },
              {
                title: 'Memory Science',
                description: 'Built on spaced repetition principles to maximize retention',
                emoji: '🧠',
                icon: <SchoolIcon fontSize="large" />
              },
              {
                title: 'Track Progress',
                description: 'Monitor your learning with intuitive statistics and insights',
                emoji: '📊',
                icon: <RocketLaunchIcon fontSize="large" />
              },
            ].map((feature) => (
              <Box 
                key={feature.title}
                sx={{
                  textAlign: 'center',
                  p: { xs: 2, sm: 3 },
                  borderRadius: 2,
                  height: '100%',
                  background: theme === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.02)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease',
                    boxShadow: theme === 'dark'
                      ? '0 10px 25px rgba(0, 0, 0, 0.2)'
                      : '0 10px 25px rgba(0, 0, 0, 0.1)'
                  },
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant={isMobile ? "h3" : "h2"} sx={{ mb: 2 }}>{feature.emoji}</Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>{feature.title}</Typography>
                <Typography color="text.secondary">{feature.description}</Typography>
              </Box>
            ))}
          </Box>
        </Container>

        {/* About Section - Enhanced */}
        <Container id="about" sx={{ 
          py: { xs: 6, sm: 8, md: 10 }, 
          scrollMarginTop: '100px',
          px: { xs: 2, sm: 4, md: 6 } 
        }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            gutterBottom 
            textAlign="center"
            sx={{ mb: { xs: 3, md: 4 } }}
          >
            👨‍💻 About Me
          </Typography>
          
          <Card 
            elevation={3} 
            sx={{ 
              borderRadius: 4,
              background: theme === 'dark' 
                ? 'rgba(26, 32, 53, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              overflow: 'visible',
              position: 'relative',
              mb: 5
            }}
          >
            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <Box 
                sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', md: '4fr 8fr' },
                  gap: 4,
                  alignItems: 'center'
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar 
                    sx={{ 
                      width: { xs: 150, md: 200 }, 
                      height: { xs: 150, md: 200 },
                      mx: 'auto',
                      border: theme === 'dark' ? '4px solid #6C63FF' : '4px solid #3F51B5',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                      bgcolor: theme === 'dark' ? '#2d3748' : '#e2e8f0'
                    }}
                  >
                    <Typography variant="h3">AC</Typography>
                  </Avatar>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mt: 2, 
                      fontWeight: 600,
                      color: theme === 'dark' ? '#f7fafc' : '#2d3748'
                    }}
                  >
                    Ansh Chaurasiya
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mt: 1,
                      color: theme === 'dark' ? '#a0aec0' : '#4a5568',
                      fontStyle: 'italic'
                    }}
                  >
                    Computer Science Student
                  </Typography>
                </Box>
                
                <Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      lineHeight: 1.8,
                      color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
                      textAlign: { xs: 'center', md: 'left' },
                      mt: { xs: 2, md: 0 }
                    }}
                  >
                    I am a passionate computer science student with a strong foundation in programming, exceptional English skills, and a talent for delivering impactful presentations. My insatiable curiosity drives me to explore diverse topics, with a particular fascination for space and physics.
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      lineHeight: 1.8,
                      color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
                      textAlign: { xs: 'center', md: 'left' },
                      mt: 2
                    }}
                  >
                    I eagerly follow the latest discoveries, theories, and advancements in these fields, constantly seeking to expand my knowledge and understanding.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
          
          <Typography 
            maxWidth="md" 
            mx="auto" 
            textAlign="center" 
            sx={{ 
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: theme === 'dark' ? '#BBB' : '#444',
              fontStyle: 'italic',
              mt: 4
            }}
          >
            If you are interested in connecting, collaborating, or discussing fascinating topics, feel free to reach out. Let's embark on a journey of learning and innovation together.
          </Typography>
        </Container>

        {/* Contact Section - Enhanced */}
        <Container id="contact" sx={{ 
          py: { xs: 6, sm: 8, md: 10 }, 
          scrollMarginTop: '100px',
          px: { xs: 2, sm: 4, md: 6 } 
        }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            gutterBottom 
            textAlign="center"
            sx={{ mb: { xs: 3, md: 4 } }}
          >
            📬 Let's Connect
          </Typography>
          
          <Card 
            elevation={3} 
            sx={{ 
              borderRadius: 4,
              background: theme === 'dark' 
                ? 'rgba(26, 32, 53, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              maxWidth: 800,
              mx: 'auto'
            }}
          >
            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <Box 
                sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                  gap: 3,
                  justifyContent: 'center'
                }}
              >
                <Box sx={{ 
                  textAlign: 'center',
                  borderRight: { xs: 'none', md: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)' },
                  pb: { xs: 2, md: 0 },
                  borderBottom: { xs: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)', md: 'none' },
                }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%'
                    }}
                  >
                    <IconButton 
                      href="mailto:anshchaurasiya239@gmail.com"
                      sx={{ 
                        color: theme === 'dark' ? '#bb86fc' : '#3F51B5',
                        mb: 1,
                        transform: 'scale(1.2)'
                      }}
                    >
                      <EmailIcon fontSize="large" />
                    </IconButton>
                    <Typography variant="h6" sx={{ mb: 1 }}>Email</Typography>
                    <Typography 
                      sx={{ 
                        color: theme === 'dark' ? '#bb86fc' : '#1976d2',
                        wordBreak: 'break-word'
                      }}
                    >
                      anshchaurasiya239@gmail.com
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  textAlign: 'center',
                  borderRight: { xs: 'none', md: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)' },
                  pb: { xs: 2, sm: 0 },
                  borderBottom: { xs: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)', sm: 'none' },
                }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%'
                    }}
                  >
                    <IconButton 
                      href="https://github.com/AnshChaurasiya" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ 
                        color: theme === 'dark' ? '#bb86fc' : '#333',
                        mb: 1,
                        transform: 'scale(1.2)'
                      }}
                    >
                      <GitHubIcon fontSize="large" />
                    </IconButton>
                    <Typography variant="h6" sx={{ mb: 1 }}>GitHub</Typography>
                    <Typography 
                      component="a" 
                      href="https://github.com/AnshChaurasiya" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ 
                        color: theme === 'dark' ? '#bb86fc' : '#1976d2',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      github.com/AnshChaurasiya
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%'
                    }}
                  >
                    <IconButton 
                      href="https://in.linkedin.com/in/ansh-chaurasiya-29a018257" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ 
                        color: theme === 'dark' ? '#bb86fc' : '#0077B5',
                        mb: 1,
                        transform: 'scale(1.2)'
                      }}
                    >
                      <LinkedInIcon fontSize="large" />
                    </IconButton>
                    <Typography variant="h6" sx={{ mb: 1 }}>LinkedIn</Typography>
                    <Typography 
                      component="a" 
                      href="https://in.linkedin.com/in/ansh-chaurasiya-29a018257" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ 
                        color: theme === 'dark' ? '#bb86fc' : '#1976d2',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      linkedin.com/in/ansh-chaurasiya-29a018257
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
          
          <Box 
            sx={{ 
              textAlign: 'center', 
              mt: 6,
              pb: 4
            }}
          >
            <Button
              variant="outlined"
              onClick={() => scrollTo('home')}
              sx={{
                borderRadius: 50,
                px: 3,
                py: 1,
                borderColor: theme === 'dark' ? '#bb86fc' : '#3F51B5',
                color: theme === 'dark' ? '#bb86fc' : '#3F51B5',
                '&:hover': {
                  borderColor: theme === 'dark' ? '#9d65ee' : '#303F9F',
                  backgroundColor: theme === 'dark' ? 'rgba(187, 134, 252, 0.1)' : 'rgba(63, 81, 181, 0.08)',
                }
              }}
            >
              Back to Top
            </Button>
          </Box>
        </Container>

        {/* Falling Cards Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none', // To allow interactions with elements behind it
            zIndex: 1
          }}
        >
          <FallingCards />
        </Box>
      </Box>
    </>
  );
};

export default HomePage;