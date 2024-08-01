import React, { useEffect, useState, forwardRef } from 'react';
import { AppBar, Tabs, Tab, Box, Avatar, Typography } from '@mui/material';
import axios from 'axios';

const Header = forwardRef(({ selectedCategory, onCategoryClick }, ref) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://185.189.167.220:6969/api/categories/products')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryClick = (categoryId) => {
    onCategoryClick(categoryId);
  };

  return (
    <AppBar ref={ref} position="fixed" color="default" sx={{ boxShadow: 'none', backgroundColor: 'white', zIndex: 1100 }}>
      <Box sx={{ overflowX: 'auto' }}>
        <Tabs
          value={selectedCategory || false} // Ensure valid value for Tabs
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable categories"
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: 'black' } }}
        >
          {categories.map((category) => (
            <Tab
              key={category.id}
              label={
                <Box display="flex" alignItems="center">
                  <Avatar src={category.imageUrl} alt={category.name} sx={{ width: 32, height: 32, marginRight: 1 }} />
                  <Typography variant="body2" sx={{ color: 'black', fontSize: '0.875rem', fontWeight: 'bold' }}>
                    {category.name}
                  </Typography>
                </Box>
              }
              value={category.id}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </Tabs>
      </Box>
    </AppBar>
  );
});

export default Header;