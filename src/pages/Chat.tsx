// import { useState } from 'react';
// import {
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Avatar,
//   Box,
//   Card,
//   CardContent,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   IconButton,
// } from '@mui/material';
// import { useTranslation } from 'react-i18next';
// import LanguageIcon from '@mui/icons-material/Language';
// import SendIcon from '@mui/icons-material/Send';
// import PersonIcon from '@mui/icons-material/Person';
// import axios from 'axios';

// interface Message {
//   id: string;
//   sender: string;
//   content: string;
//   timestamp: Date;
//   isExpert: boolean;
// }

// interface Expert {
//   id: string;
//   name: string;
//   specialization: string;
//   experience: string;
//   rating: number;
//   availability: string[];
//   price: number;
// }

// const sampleExperts: Expert[] = [
//   {
//     id: '1',
//     name: 'Dr. Sarah Johnson',
//     specialization: 'Plant Pathology',
//     experience: '15 years',
//     rating: 4.8,
//     availability: ['Monday', 'Wednesday', 'Friday'],
//     price: 50,
//   },
//   {
//     id: '2',
//     name: 'Prof. Michael Chen',
//     specialization: 'Soil Science',
//     experience: '20 years',
//     rating: 4.9,
//     availability: ['Tuesday', 'Thursday', 'Saturday'],
//     price: 60,
//   },
// ];

// const Chat = () => {
//   const { t, i18n } = useTranslation();
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       sender: 'System',
//       content: t('chat.welcome'),
//       timestamp: new Date(),
//       isExpert: true,
//     },
//   ]);
//   const [newMessage, setNewMessage] = useState('');
//   const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
//   const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');
//   const [languageDialogOpen, setLanguageDialogOpen] = useState(false);

//   const handleLanguageChange = (lang: string) => {
//     i18n.changeLanguage(lang);
//     setLanguageDialogOpen(false);
//   };

//   const sendMessageToBackend = async (message: Message) => {
//     try {
//       await axios.post('http://localhost:3001/api/messages', {
//         ...message,
//         timestamp: message.timestamp.toISOString(),
//       });
//     } catch (err) {
//       console.error('Error sending message to backend:', err);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (newMessage.trim()) {
//       const message: Message = {
//         id: Date.now().toString(),
//         sender: 'You',
//         content: newMessage,
//         timestamp: new Date(),
//         isExpert: false,
//       };

//       setMessages((prev) => [...prev, message]);
//       setNewMessage('');
//       await sendMessageToBackend(message);

//       // Simulated expert reply
//       setTimeout(async () => {
//         const expertReply: Message = {
//           id: (Date.now() + 1).toString(),
//           sender: 'Expert',
//           content: t('chat.expertResponse'),
//           timestamp: new Date(),
//           isExpert: true,
//         };
//         setMessages((prev) => [...prev, expertReply]);
//         await sendMessageToBackend(expertReply);
//       }, 1000);
//     }
//   };

//   const handleExpertSelect = (expert: Expert) => {
//     setSelectedExpert(expert);
//     setBookingDialogOpen(true);
//   };

//   const handleBooking = () => {
//     // Save booking later if needed
//     console.log('Booking:', { expert: selectedExpert, date: selectedDate, time: selectedTime });
//     setBookingDialogOpen(false);
//   };

//   return (
//     <Container sx={{ py: 4 }}>
//       {/* Language Button */}
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//         <IconButton onClick={() => setLanguageDialogOpen(true)} color="primary">
//           <LanguageIcon />
//         </IconButton>
//       </Box>

//       {/* Language Dialog */}
//       <Dialog open={languageDialogOpen} onClose={() => setLanguageDialogOpen(false)}>
//         <DialogTitle>Select Language</DialogTitle>
//         <DialogContent>
//           <List>
//             <ListItem button onClick={() => handleLanguageChange('en')}>
//               <ListItemText primary="English" />
//             </ListItem>
//             <ListItem button onClick={() => handleLanguageChange('hi')}>
//               <ListItemText primary="हिंदी" />
//             </ListItem>
//             <ListItem button onClick={() => handleLanguageChange('ta')}>
//               <ListItemText primary="தமிழ்" />
//             </ListItem>
//           </List>
//         </DialogContent>
//       </Dialog>

//       <Grid container spacing={3}>
//         {/* Chat Section */}
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
//             {/* Messages */}
//             <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
//               <List>
//                 {messages.map((message) => (
//                   <ListItem
//                     key={message.id}
//                     sx={{
//                       flexDirection: message.isExpert ? 'row' : 'row-reverse',
//                     }}
//                   >
//                     <ListItemAvatar>
//                       <Avatar sx={{ bgcolor: message.isExpert ? 'primary.main' : 'secondary.main' }}>
//                         <PersonIcon />
//                       </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary={message.sender}
//                       secondary={
//                         <Typography
//                           sx={{
//                             backgroundColor: message.isExpert ? 'primary.light' : 'secondary.light',
//                             p: 1,
//                             borderRadius: 1,
//                             display: 'inline-block',
//                           }}
//                         >
//                           {message.content}
//                         </Typography>
//                       }
//                       secondaryTypographyProps={{ component: 'div' }}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>

//             {/* Input */}
//             <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
//               <Grid container spacing={2}>
//                 <Grid item xs>
//                   <TextField
//                     fullWidth
//                     placeholder={t('chat.inputPlaceholder')}
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                   />
//                 </Grid>
//                 <Grid item>
//                   <Button
//                     variant="contained"
//                     endIcon={<SendIcon />}
//                     onClick={handleSendMessage}
//                   >
//                     {t('chat.send')}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Paper>
//         </Grid>

//         {/* Experts Section */}
//         <Grid item xs={12} md={4}>
//           <Typography variant="h6" gutterBottom>
//             Available Experts
//           </Typography>
//           {sampleExperts.map((expert) => (
//             <Card key={expert.id} sx={{ mb: 2 }}>
//               <CardContent>
//                 <Typography variant="h6">{expert.name}</Typography>
//                 <Typography color="text.secondary">{expert.specialization}</Typography>
//                 <Typography variant="body2">Experience: {expert.experience}</Typography>
//                 <Typography variant="body2">Rating: {expert.rating}/5.0</Typography>
//                 <Typography variant="body2" color="primary">${expert.price}/hour</Typography>
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   sx={{ mt: 1 }}
//                   onClick={() => handleExpertSelect(expert)}
//                 >
//                   Book Consultation
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </Grid>
//       </Grid>

//       {/* Booking Dialog */}
//       <Dialog open={bookingDialogOpen} onClose={() => setBookingDialogOpen(false)}>
//         <DialogTitle>{t('chat.booking.title')}</DialogTitle>
//         <DialogContent>
//           <Typography gutterBottom>
//             {selectedExpert?.name} - {selectedExpert?.specialization}
//           </Typography>
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>{t('chat.booking.selectDate')}</InputLabel>
//             <Select
//               value={selectedDate}
//               label={t('chat.booking.selectDate')}
//               onChange={(e) => setSelectedDate(e.target.value)}
//             >
//               {selectedExpert?.availability.map((day) => (
//                 <MenuItem key={day} value={day}>
//                   {day}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>{t('chat.booking.selectTime')}</InputLabel>
//             <Select
//               value={selectedTime}
//               label={t('chat.booking.selectTime')}
//               onChange={(e) => setSelectedTime(e.target.value)}
//             >
//               <MenuItem value="09:00">9:00 AM</MenuItem>
//               <MenuItem value="10:00">10:00 AM</MenuItem>
//               <MenuItem value="11:00">11:00 AM</MenuItem>
//               <MenuItem value="14:00">2:00 PM</MenuItem>
//               <MenuItem value="15:00">3:00 PM</MenuItem>
//               <MenuItem value="16:00">4:00 PM</MenuItem>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setBookingDialogOpen(false)}>
//             {t('chat.booking.cancel')}
//           </Button>
//           <Button
//             onClick={handleBooking}
//             variant="contained"
//             disabled={!selectedDate || !selectedTime}
//           >
//             {t('chat.booking.book')}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default Chat;


import React, { useState } from 'react';
import {
  Container, Grid, Paper, TextField, Button, List, ListItem, ListItemText,
  Avatar, ListItemAvatar, Typography, Box, Card, CardContent, Dialog,
  DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl,
  InputLabel, IconButton, ListItemButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isExpert: boolean;
}

interface Expert {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  price: number;
  availability: string[];
}

const sampleExperts: Expert[] = [
  {
    id: 1,
    name: 'Ramaswamy',
    specialization: 'Rice field',
    experience: '10 years',
    rating: 4.8,
    price: 500,
    availability: ['Monday', 'Wednesday', 'Friday'],
  },
  {
    id: 2,
    name: 'Kumar',
    specialization: 'Organic Farming',
    experience: '8 years',
    rating: 4.6,
    price: 400,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
  },
];

const Chat = () => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'System',
      content: t('chat.welcome'),
      timestamp: new Date(),
      isExpert: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageDialogOpen(false);
  };

  const sendMessageToBackend = async (message: Message) => {
    try {
      await axios.post('http://localhost:3001/api/messages', {
        ...message,
        timestamp: message.timestamp.toISOString().slice(0, 19).replace('T', ' '),
      });
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const sendBookingToBackend = async () => {
    try {
      await axios.post('http://localhost:3001/api/bookings', {
        expert_id: selectedExpert?.id,
        expert_name: selectedExpert?.name,
        specialization: selectedExpert?.specialization,
        date_selected: selectedDate,
        time_selected: selectedTime,
      });
    } catch (err) {
      console.error('Error booking expert:', err);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: newMessage,
        timestamp: new Date(),
        isExpert: false,
      };

      setMessages((prev) => [...prev, message]);
      setNewMessage('');
      await sendMessageToBackend(message);

      setTimeout(async () => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'Expert',
          content: t('chat.expertResponse'),
          timestamp: new Date(),
          isExpert: true,
        };
        setMessages((prev) => [...prev, reply]);
        await sendMessageToBackend(reply);
      }, 1000);
    }
  };

  const handleExpertSelect = (expert: Expert) => {
    setSelectedExpert(expert);
    setBookingDialogOpen(true);
  };

  const handleBooking = async () => {
    await sendBookingToBackend();
    setBookingDialogOpen(false);
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={() => setLanguageDialogOpen(true)} color="primary">
          <LanguageIcon />
        </IconButton>
      </Box>

      {/* Language Dialog */}
      <Dialog open={languageDialogOpen} onClose={() => setLanguageDialogOpen(false)}>
        <DialogTitle>Select Language</DialogTitle>
        <DialogContent>
          <List>
            <ListItemButton onClick={() => handleLanguageChange('en')}>
              <ListItemText primary="English" />
            </ListItemButton>
            <ListItemButton onClick={() => handleLanguageChange('hi')}>
              <ListItemText primary="हिंदी" />
            </ListItemButton>
            <ListItemButton onClick={() => handleLanguageChange('ta')}>
              <ListItemText primary="தமிழ்" />
            </ListItemButton>
          </List>
        </DialogContent>
      </Dialog>

      <Grid container spacing={3}>
        {/* Chat Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
              <List>
                {messages.map((msg) => (
                  <ListItem
                    key={msg.id}
                    sx={{ flexDirection: msg.isExpert ? 'row' : 'row-reverse' }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: msg.isExpert ? 'primary.main' : 'secondary.main' }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={msg.sender}
                      secondary={
                        <Typography
                          sx={{
                            backgroundColor: msg.isExpert ? 'primary.light' : 'secondary.light',
                            p: 1,
                            borderRadius: 1,
                            display: 'inline-block',
                          }}
                        >
                          {msg.content}
                        </Typography>
                      }
                      secondaryTypographyProps={{ component: 'div' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder={t('chat.inputPlaceholder')}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" endIcon={<SendIcon />} onClick={handleSendMessage}>
                    {t('chat.send')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Expert List */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Available Experts</Typography>
          {sampleExperts.map((expert) => (
            <Card key={expert.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{expert.name}</Typography>
                <Typography color="text.secondary">{expert.specialization}</Typography>
                <Typography>Experience: {expert.experience}</Typography>
                <Typography>Rating: {expert.rating}/5.0</Typography>
                <Typography color="primary">₹{expert.price}/hour</Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() => handleExpertSelect(expert)}
                >
                  Book Consultation
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onClose={() => setBookingDialogOpen(false)}>
        <DialogTitle>Book Your Expert Consultation</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            {selectedExpert?.name} - {selectedExpert?.specialization}
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Date</InputLabel>
            <Select
              value={selectedDate}
              label="Select Date"
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {selectedExpert?.availability.map((day) => (
                <MenuItem key={day} value={day}>{day}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Time</InputLabel>
            <Select
              value={selectedTime}
              label="Select Time"
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <MenuItem value="09:00">9:00 AM</MenuItem>
              <MenuItem value="11:00">11:00 AM</MenuItem>
              <MenuItem value="14:00">2:00 PM</MenuItem>
              <MenuItem value="16:00">4:00 PM</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookingDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleBooking} disabled={!selectedDate || !selectedTime} variant="contained">
            Book Now
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Chat;
