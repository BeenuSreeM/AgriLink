import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ChatIcon from '@mui/icons-material/Chat';
import bgImage from './bg_imag.avif'; // Update path if necessary

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Marketplace',
      description: 'Connect directly with consumers and sell your crops at fair prices',
      icon: <ShoppingCartIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/marketplace'
    },
    {
      title: 'Disease Detection',
      description: 'Detect plant diseases instantly using our AI-powered image analysis',
      icon: <CameraAltIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/disease-detection'
    },
    {
      title: 'Expert Chat',
      description: 'Get advice from agricultural experts and connect with other farmers',
      icon: <ChatIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/chat'
    }
  ];

  return (
    <Box>
      {/* Hero Section with Full-Fit Background Image */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '60vh', md: '80vh' },
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1
          }
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to AgriLink
          </Typography>
          <Typography variant="h6" component="h2" sx={{ mb: 4 }}>
            Your all-in-one platform for smart farming and direct market access
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/marketplace')}
            sx={{ mr: 2 }}
          >
            Start Selling
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            onClick={() => navigate('/disease-detection')}
          >
            Analyze Crops
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: { xs: 6, md: 8 } }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Our Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                }}
                onClick={() => navigate(feature.path)}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography gutterBottom variant="h6" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
