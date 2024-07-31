import React, { useState } from 'react';
import { Grid } from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';

const ProductGrid = ({ products }) => {
  const [productCounts, setProductCounts] = useState({});

  const handleAdd = (productId) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }));
  };

  const handleRemove = (productId) => {
    setProductCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[productId] > 0) {
        newCounts[productId] -= 1;
      }
      return newCounts;
    });
  };

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
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
  );
};

export default ProductGrid;