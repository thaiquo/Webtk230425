import { useState } from "react";
import ProductItem from "../components/ProductItem";

export default function ProductManager() {
  const [products, setProducts] = useState([
    { id: 1, name: "Áo thun", price: 200000, category: "Thời trang", stock: 10 },
    { id: 2, name: "Điện thoại", price: 5000000, category: "Công nghệ", stock: 5 },
    { id: 3, name: "Nồi cơm", price: 1500000, category: "Gia dụng", stock: 3 },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Thời trang",
    stock: "",
  });

  const handleAdd = () => {
    const { name, price, category, stock } = newProduct;
    if (!name || !price || !stock) return;
    setProducts([
      ...products,
      {
        id: Date.now(),
        name,
        price: Number(price),
        category,
        stock: Number(stock),
      },
    ]);
    setNewProduct({ name: "", price: "", category: "Thời trang", stock: "" });
  };

  return (
    <div>
      {/* Form thêm sản phẩm mới */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Tên"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Giá"
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <select
          className="border p-2"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        >
          <option value="Thời trang">Thời trang</option>
          <option value="Công nghệ">Công nghệ</option>
          <option value="Gia dụng">Gia dụng</option>
        </select>
        <input
          className="border p-2"
          placeholder="Tồn kho"
          type="number"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <button className="bg-blue-500 text-white p-2" onClick={handleAdd}>
          Thêm sản phẩm
        </button>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="border rounded">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
