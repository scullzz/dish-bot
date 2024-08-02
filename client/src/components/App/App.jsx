import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import ProductGrid from '../ProductGrid/ProductGrid';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { pink } from '@mui/material/colors';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null); // Set to null initially
  const headerRef = useRef(null);

  useEffect(() => {
    axios.get('https://pluswibe.space/api/categories/products')
      .then(response => {
        setCategories(response.data);
        if (response.data.length > 0) {
          setSelectedCategory(response.data[0].id); // Set to first category's id
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = headerRef.current ? headerRef.current.clientHeight : 0;
      let found = false;
      
      for (let i = categories.length - 1; i >= 0; i--) {
        const categoryElement = document.getElementById(`category-${categories[i].id}`);
        if (categoryElement) {
          const categoryTop = categoryElement.getBoundingClientRect().top;
          if (categoryTop <= headerHeight + 10) { // Adjust offset as needed
            setSelectedCategory(categories[i].id);
            found = true;
            break;
          }
        }
      }

      if (!found) {
        setSelectedCategory(categories[0]?.id || null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  const handleAddToCart = () => {
    setCartItems(cartItems + 1);
  };

  const handleRemoveFromCart = () => {
    setCartItems(cartItems > 0 ? cartItems - 1 : 0);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element && headerRef.current) {
      const headerHeight = headerRef.current.clientHeight; // Get the header height
      const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Header ref={headerRef} selectedCategory={selectedCategory} onCategoryClick={handleCategoryClick} />
      <div style={{ paddingTop: headerRef.current ? headerRef.current.clientHeight : '100px'}}></div>
      {categories.map((category) => (
        <div key={category.id} id={`category-${category.id}`} style={{ paddingTop: '0px', backgroundColor: 'white' }}>
          <ProductGrid category={category} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
        </div>
      ))}
      <ShoppingCart itemCount={cartItems} />
    </div>
  );
};

export default App;