

// import { useState } from 'react';
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   TextField,
//   Box,
//   Chip,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions
// } from '@mui/material';
// import { useTranslation } from 'react-i18next';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// // Import images locally from the same folder
// import tomatoImage from './tomato.jpg';
// import riceImage from './rice.jpg';
// import mangoImage from './mango.jpg';

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   unit: string;
//   category: string;
//   farmer: string;
//   location: string;
//   image: string;
//   seasonal?: boolean;
//   organic?: boolean;
//   priceHistory?: {
//     date: string;
//     price: number;
//   }[];
// }

// const sampleProducts: Product[] = [
//   {
//     id: '1',
//     name: 'Organic Tomatoes',
//     description: 'Fresh, locally grown organic tomatoes',
//     price: 2.99,
//     quantity: 100,
//     unit: 'kg',
//     category: 'Vegetables',
//     farmer: 'Palani',
//     location: 'Andipatti',
//     image: tomatoImage,
//     organic: true,
//     priceHistory: [
//       { date: '2023-10-01', price: 3.29 },
//       { date: '2023-10-08', price: 3.15 },
//       { date: '2023-10-15', price: 2.99 }
//     ]
//   },
//   {
//     id: '2',
//     name: 'Premium Rice',
//     description: 'High-quality basmati rice',
//     price: 5.99,
//     quantity: 500,
//     unit: 'kg',
//     category: 'Grains',
//     farmer: 'babu',
//     location: 'Padalur',
//     image: riceImage,
//     priceHistory: [
//       { date: '2023-10-01', price: 5.49 },
//       { date: '2023-10-08', price: 5.79 },
//       { date: '2023-10-15', price: 5.99 }
//     ]
//   },
//   {
//     id: '3',
//     name: 'Seasonal Mangoes',
//     description: 'Sweet and juicy seasonal mangoes',
//     price: 4.99,
//     quantity: 200,
//     unit: 'kg',
//     category: 'Fruits',
//     farmer: 'Raj Patel',
//     location: 'Florida',
//     image: mangoImage,
//     seasonal: true,
//     priceHistory: [
//       { date: '2023-10-01', price: 5.49 },
//       { date: '2023-10-08', price: 5.29 },
//       { date: '2023-10-15', price: 4.99 }
//     ]
//   }
  
// ];

// const Marketplace = () => {
//   const { t } = useTranslation();
//   const [products] = useState<Product[]>(sampleProducts);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [category, setCategory] = useState('all');
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [orderQuantity, setOrderQuantity] = useState(1);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [showPriceHistory, setShowPriceHistory] = useState(false);

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleCategoryChange = (event: any) => {
//     setCategory(event.target.value);
//   };

//   const handleProductClick = (product: Product) => {
//     setSelectedProduct(product);
//     setDialogOpen(true);
//   };

//   const handleClose = () => {
//     setDialogOpen(false);
//     setSelectedProduct(null);
//     setOrderQuantity(1);
//   };

//   const handlePurchase = () => {
//     console.log('Purchase:', { product: selectedProduct, quantity: orderQuantity });
//     handleClose();
//   };

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       category === 'all' ||
//       (category === 'seasonal' && product.seasonal) ||
//       (category === 'organic' && product.organic) ||
//       product.category === category;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <Container sx={{ py: 4 }}>
//       <Typography variant="h2" component="h1" gutterBottom>
//         Marketplace
//       </Typography>

//       <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//         <TextField
//           label="Search products"
//           variant="outlined"
//           value={searchTerm}
//           onChange={handleSearch}
//           sx={{ flexGrow: 1, minWidth: '200px' }}
//         />
//         <FormControl sx={{ minWidth: '200px' }}>
//           <InputLabel>Category</InputLabel>
//           <Select value={category} label="Category" onChange={handleCategoryChange}>
//             <MenuItem value="all">{t('marketplace.category.all')}</MenuItem>
//             <MenuItem value="Vegetables">{t('marketplace.category.vegetables')}</MenuItem>
//             <MenuItem value="Fruits">{t('marketplace.category.fruits')}</MenuItem>
//             <MenuItem value="Grains">{t('marketplace.category.grains')}</MenuItem>
//             <MenuItem value="seasonal">{t('marketplace.category.seasonal')}</MenuItem>
//             <MenuItem value="organic">{t('marketplace.category.organic')}</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       <Grid container spacing={3}>
//         {filteredProducts.map((product) => (
//           <Grid item xs={12} sm={6} md={4} key={product.id}>
//             <Card
//               sx={{
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 cursor: 'pointer',
//                 '&:hover': { transform: 'translateY(-4px)', transition: '0.3s' }
//               }}
//               onClick={() => handleProductClick(product)}
//             >
//               <CardMedia component="img" height="200" image={product.image} alt={product.name} />
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography gutterBottom variant="h5" component="h2">
//                   {product.name}
//                 </Typography>
//                 <Typography color="text.secondary" paragraph>
//                   {product.description}
//                 </Typography>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Typography variant="h6" color="primary">
//                     ${product.price}/{product.unit}
//                   </Typography>
//                   <Chip label={product.category} color="primary" variant="outlined" />
//                 </Box>
//                 <Typography variant="body2" sx={{ mt: 1 }}>
//                   Farmer: {product.farmer}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {selectedProduct && (
//         <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
//           <DialogTitle>{selectedProduct.name}</DialogTitle>
//           <DialogContent>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//               <Button
//                 variant="outlined"
//                 onClick={() => setShowPriceHistory(!showPriceHistory)}
//               >
//                 {t('Trend')}
//               </Button>
//             </Box>
//             {showPriceHistory && selectedProduct?.priceHistory && (
//               <Box sx={{ height: 300, mb: 3 }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart
//                     data={selectedProduct.priceHistory}
//                     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </Box>
//             )}
//             <Box sx={{ mb: 2 }}>
//               <img
//                 src={selectedProduct.image}
//                 alt={selectedProduct.name}
//                 style={{ width: '100%', borderRadius: 8 }}
//               />
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <TextField
//               type="number"
//               label="Quantity"
//               value={orderQuantity}
//               onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
//               sx={{ mr: 2 }}
//             />
//             <Button onClick={handlePurchase} variant="contained">
//               Buy
//             </Button>
//             <Button onClick={handleClose}>Cancel</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Container>
//   );
// };

// export default Marketplace;




import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Badge
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';

// Images
import tomatoImage from './tomato.jpg';
import riceImage from './rice.jpg';
import mangoImage from './mango.jpg';
import seedImage from './seed.jpeg';
import cowDungImage from './cow_dung.jpg';
import hayImage from './hey_image.jpeg';
import bananaLeafImage from './bana_leadf.jpeg';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  farmer: string;
  location: string;
  image: string;
  seasonal?: boolean;
  organic?: boolean;
  priceHistory?: {
    date: string;
    price: number;
  }[];
}

interface CartItem {
  product: Product;
  quantity: number;
  type: 'buy' | 'sell';
}

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    description: 'Fresh, locally grown organic tomatoes',
    price: 120,
    quantity: 100,
    unit: 'kg',
    category: 'Vegetables',
    farmer: 'Palani',
    location: 'Andipatti',
    image: tomatoImage,
    organic: true,
    priceHistory: [
      { date: '2023-10-01', price: 130 },
      { date: '2023-10-08', price: 125 },
      { date: '2023-10-15', price: 120 }
    ]
  },
  {
    id: '2',
    name: 'Premium Rice',
    description: 'High-quality basmati rice',
    price: 240,
    quantity: 500,
    unit: 'kg',
    category: 'Grains',
    farmer: 'Babu',
    location: 'Padalur',
    image: riceImage,
    priceHistory: [
      { date: '2023-10-01', price: 220 },
      { date: '2023-10-08', price: 230 },
      { date: '2023-10-15', price: 240 }
    ]
  },
  {
    id: '3',
    name: 'Seasonal Mangoes',
    description: 'Sweet and juicy seasonal mangoes',
    price: 200,
    quantity: 200,
    unit: 'kg',
    category: 'Fruits',
    farmer: 'Raj Patel',
    location: 'Florida',
    image: mangoImage,
    seasonal: true,
    priceHistory: [
      { date: '2023-10-01', price: 220 },
      { date: '2023-10-08', price: 210 },
      { date: '2023-10-15', price: 200 }
    ]
  },
  {
    id: '4',
    name: 'Agricultural Seeds',
    description: 'High-quality seeds for farming',
    price: 80,
    quantity: 1000,
    unit: 'pack',
    category: 'Farming Supplies',
    farmer: 'Muthu',
    location: 'Salem',
    image: seedImage
  },
  {
    id: '5',
    name: 'Organic Cow Dung',
    description: 'Pure cow dung manure for agriculture',
    price: 60,
    quantity: 300,
    unit: 'kg',
    category: 'Farming Supplies',
    farmer: 'Ganesh',
    location: 'Karur',
    image: cowDungImage,
    organic: true
  },
  {
    id: '6',
    name: 'Dry Hay Bales',
    description: 'Dried hay for cattle feed and farming',
    price: 100,
    quantity: 150,
    unit: 'bale',
    category: 'Farming Supplies',
    farmer: 'Ravi Kumar',
    location: 'Dindigul',
    image: hayImage
  },
  {
    id: '7',
    name: 'Banana Leaves',
    description: 'Fresh banana leaves for cooking and serving',
    price: 50,
    quantity: 500,
    unit: 'bundle',
    category: 'Farming Supplies',
    farmer: 'Suresh',
    location: 'Madurai',
    image: bananaLeafImage
  }
];

const Marketplace = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
    setOrderQuantity(1);
    setShowPriceHistory(false);
  };

  const handleAddToCart = (type: 'buy' | 'sell') => {
    if (!selectedProduct) return;

    const updatedProducts = products.map((prod) =>
      prod.id === selectedProduct.id
        ? {
            ...prod,
            quantity:
              type === 'sell'
                ? prod.quantity + orderQuantity
                : Math.max(prod.quantity - orderQuantity, 0)
          }
        : prod
    );
    setProducts(updatedProducts);

    const cartItem: CartItem = {
      product: selectedProduct,
      quantity: orderQuantity,
      type
    };
    setCartItems((prev) => [...prev, cartItem]);
    handleClose();
  };

  const handleConfirmOrder = () => {
    alert('Order placed successfully!');
    setCartItems([]);
    setCartOpen(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === 'all' ||
      (category === 'seasonal' && product.seasonal) ||
      (category === 'organic' && product.organic) ||
      product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2" component="h1">
          Marketplace
        </Typography>
        <IconButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search products"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ flexGrow: 1, minWidth: '200px' }}
        />
        <FormControl sx={{ minWidth: '200px' }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={handleCategoryChange}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Vegetables">Vegetables</MenuItem>
            <MenuItem value="Fruits">Fruits</MenuItem>
            <MenuItem value="Grains">Grains</MenuItem>
            <MenuItem value="Farming Supplies">Farming Supplies</MenuItem>
            <MenuItem value="seasonal">Seasonal</MenuItem>
            <MenuItem value="organic">Organic</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': { transform: 'translateY(-4px)', transition: '0.3s' }
              }}
              onClick={() => handleProductClick(product)}
            >
              <CardMedia component="img" height="200" image={product.image} alt={product.name} />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {product.name}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Typography color="primary" variant="h6">
                  ₹{product.price}/{product.unit}
                </Typography>
                <Chip label={product.category} color="primary" variant="outlined" sx={{ mt: 1 }} />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Available: {product.quantity} {product.unit}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Product Dialog */}
      {selectedProduct && (
        <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedProduct.name}</DialogTitle>
          <DialogContent>
            <Button variant="outlined" onClick={() => setShowPriceHistory(!showPriceHistory)} sx={{ mb: 2 }}>
              {t('Trend')}
            </Button>
            {showPriceHistory && selectedProduct?.priceHistory && (
              <Box sx={{ height: 300, mb: 3 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedProduct.priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            )}
            <img src={selectedProduct.image} alt={selectedProduct.name} width="100%" style={{ borderRadius: 8 }} />
          </DialogContent>
          <DialogActions>
            <TextField
              type="number"
              label="Quantity"
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
              sx={{ mr: 2 }}
            />
            <Button onClick={() => handleAddToCart('buy')} variant="contained">
              Buy
            </Button>
            <Button onClick={() => handleAddToCart('sell')} variant="outlined">
              Sell
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Cart Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ width: 300, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6">Cart</Typography>
            <IconButton onClick={() => setCartOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {cartItems.map((item, idx) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={`${item.type === 'buy' ? 'Buy' : 'Sell'}: ${item.product.name}`}
                  secondary={`Qty: ${item.quantity} | ₹${item.product.price} x ${item.quantity}`}
                />
              </ListItem>
            ))}
            {cartItems.length === 0 && <Typography>No items in cart</Typography>}
          </List>
          {cartItems.length > 0 && (
            <Button fullWidth variant="contained" onClick={handleConfirmOrder} sx={{ mt: 2 }}>
              Confirm Order
            </Button>
          )}
        </Box>
      </Drawer>
    </Container>
  );
};

export default Marketplace;
