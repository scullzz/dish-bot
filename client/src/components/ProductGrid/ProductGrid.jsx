import React, { useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';

const ProductGrid = ({ category, onAddToCart, onRemoveFromCart }) => {
  const [productCounts, setProductCounts] = useState({});

  const handleAdd = (productId) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }));
    onAddToCart();
  };

  const handleRemove = (productId) => {
    setProductCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[productId] > 0) {
        newCounts[productId] -= 1;
        onRemoveFromCart();
      }
      return newCounts;
    });
  };

  return (
    <Box>
      <Typography variant="h4" component="h2" sx={{ margin: 2, fontWeight: 600 }}>
        {category.name}
      </Typography>
      <Grid container spacing={2}>
        {category.products.map((product) => (
          <Grid item xs={6} key={product.id}>
            <ProductCard
              product={product}
              count={productCounts[product.id] || 0}
              onAdd={() => handleAdd(product.id)}
              onRemove={() => handleRemove(product.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;