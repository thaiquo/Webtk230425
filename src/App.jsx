import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Áo thun', price: 100000, category: 'Thời trang', stock: 20 },
    { id: 2, name: 'Điện thoại', price: 20000000, category: 'Công nghệ', stock: 10 },
    { id: 3, name: 'Nồi cơm điện', price: 1500000, category: 'Gia dụng', stock: 15 },
  ]);

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      <h1>Quản lý sản phẩm</h1>
      <ProductForm onAdd={addProduct} />
      <ProductList products={products} onDelete={deleteProduct} />
    </div>
  );
};

export default App;