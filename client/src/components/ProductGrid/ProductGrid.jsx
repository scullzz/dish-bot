import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box, Button } from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';
import { addItem, increase, decrease, deleteItem, clearCart } from '../../slice/itemsSlice';
import { selectProductCounts, selectTotalPrice } from '../../slice/selectors';

const ProductGrid = ({ category }) => {
  const dispatch = useDispatch();
  const productCounts = useSelector(selectProductCounts);
  const totalPrice = useSelector(selectTotalPrice);

  const handleAdd = (product) => {
    if (productCounts[product.id]) {
      dispatch(increase(product));
    } else {
      dispatch(addItem(product));
    }
  };

  const handleRemove = (product) => {
    if (productCounts[product.id] > 1) {
      dispatch(decrease(product));
    } else {
      dispatch(deleteItem(product));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
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
              onAdd={() => handleAdd(product)}
              onRemove={() => handleRemove(product)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;