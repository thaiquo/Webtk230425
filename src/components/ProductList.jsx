import React from 'react';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Áo thun', price: 100000, category: 'Thời trang', stock: 20 },
    { id: 2, name: 'Điện thoại', price: 20000000, category: 'Công nghệ', stock: 10 },
    { id: 3, name: 'Nồi cơm điện', price: 1500000, category: 'Gia dụng', stock: 15 },
  ];

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Tồn kho</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <button>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;