import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductCard = ({ product, count, onAdd, onRemove }) => {
  const truncateDescription = (description) => {
    const maxLength = 20; // Adjust the max length as needed
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <Card sx={{ boxShadow: 'none', border: 'none', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <CardMedia
        component="img"
        height="100"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: 'contain' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" sx={{ fontSize: '1rem' }}>{product.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ height: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {truncateDescription(product.description)}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ fontSize: '1rem', color: 'black' }}>
            {product.price} сум
          </Typography>
        </Box>
        {count === 0 ? (
          <Button
            variant="contained"
            size="small"
            sx={{ marginTop: '10px', backgroundColor: 'black', color: 'white', '&:active': { backgroundColor: 'gray' } }}
            onClick={onAdd}
          >
            Добавить
          </Button>
        ) : (
          <Box display="flex" alignItems="center" sx={{ marginTop: '10px', justifyContent: 'center' }}>
            <IconButton 
              onClick={onRemove} 
              sx={{ 
                color: 'white', 
                backgroundColor: 'black', 
                '&:hover': { backgroundColor: 'black' },
                '&:active': { backgroundColor: 'gray' },
                position: 'absolute',
                left: 0,
                marginLeft: '5px',
                width: '30px',
                height: '30px'
              }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ margin: '0 10px' }}>{count}</Typography>
            <IconButton 
              onClick={onAdd} 
              sx={{ 
                color: 'white', 
                backgroundColor: 'black', 
                '&:hover': { backgroundColor: 'black' },
                '&:active': { backgroundColor: 'gray' },
                position: 'absolute',
                right: 0,
                marginRight: '5px',
                width: '30px',
                height: '30px'
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;