import React from 'react';
import ProductList from './components/ProductList'; // Import component ProductList

const App = () => {
  return (
    <div>
      <h1>Quản lý sản phẩm</h1>
      <ProductList />  {/* Sử dụng component ProductList */}
    </div>
  );
};

export default App;