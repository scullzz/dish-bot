import React from 'react';
import { Badge, Fab, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ShoppingCart = ({ itemCount }) => {
  return (
    <Box position="fixed" bottom={16} right={16}>
      <Fab color="primary" aria-label="cart">
        <Badge badgeContent={itemCount} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </Fab>
    </Box>
  );
};

export default ShoppingCart;