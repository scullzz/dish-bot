import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import ProductGrid from '../ProductGrid/ProductGrid';

const App = () => {
  const [Data, setSushiData] = useState([]);

  useEffect(() => {
    axios.get('http://185.189.167.220:6969/api/products')
      .then(response => setSushiData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Header />
      <ProductGrid products={Data} />
    </div>
  );
};

export default App;