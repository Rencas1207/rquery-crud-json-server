import React from 'react';
import Products from './components/Products';
import ProductForm from './components/ProductForm';

const App = () => {
  return (
    <main>
      <ProductForm />
      <Products />
    </main>
  );
};

export default App;
