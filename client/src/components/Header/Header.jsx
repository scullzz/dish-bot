import React, { useEffect, useState } from 'react';
import { AppBar, Tabs, Tab, Box, Avatar, Typography } from '@mui/material';
import axios from 'axios';

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://185.189.167.220:6969/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <AppBar position="static" color="default" sx={{ boxShadow: 'none', backgroundColor: 'white' }}>
      <Box sx={{ overflowX: 'auto' }}>
        <Tabs
          value={0}
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
            />
          ))}
        </Tabs>
      </Box>
    </AppBar>
  );
};

export default Header;