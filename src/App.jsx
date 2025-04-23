// "use client"

import { useState, useEffect } from "react"
import ProductItem from "./components/ProductItem"
import "./App.css"

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products")
    return savedProducts
      ? JSON.parse(savedProducts)
      : [
          { id: 1, name: "Áo thun nam", price: 150000, category: "Thời trang", stock: 20 },
          { id: 2, name: "Điện thoại Samsung", price: 5000000, category: "Công nghệ", stock: 10 },
          { id: 3, name: "Nồi cơm điện", price: 800000, category: "Gia dụng", stock: 15 },
          { id: 4, name: "Quần jean", price: 350000, category: "Thời trang", stock: 25 },
          { id: 5, name: "Laptop Asus", price: 15000000, category: "Công nghệ", stock: 5 },
        ]
  })

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products))
  }, [products])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProduct({
      ...newProduct,
      [name]: value,
    })
  }

  const handleAddProduct = () => {
    // Validate inputs
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm")
      return
    }

    const productToAdd = {
      id: Date.now(), // Generate a unique ID
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category,
      stock: Number(newProduct.stock),
    }

    setProducts([...products, productToAdd])

    // Reset form
    setNewProduct({
      name: "",
      price: "",
      category: "",
      stock: "",
    })

    // Close form after adding
    setIsFormOpen(false)
  }

  const handleDeleteProduct = (id) => {
    // Xóa confirm để kiểm tra xem có phải vấn đề từ hộp thoại xác nhận không
    setProducts(products.filter((product) => product.id !== id))
    console.log("Đã xóa sản phẩm có id:", id) // Thêm log để debug
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || product.category === categoryFilter),
  )

  const totalStock = products.reduce((total, product) => total + product.stock, 0)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4">
        <header className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
          <p className="text-gray-600 mt-1">Hệ thống quản lý sản phẩm đơn giản</p>
        </header>

        {/* Controls */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
            >
              <span className="mr-2">{isFormOpen ? "✕ Đóng form" : "+ Thêm sản phẩm mới"}</span>
            </button>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="w-full md:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full p-2 border rounded"
                  placeholder="Tìm kiếm sản phẩm..."
                />
              </div>
              <div className="w-full md:w-48">
                <select value={categoryFilter} onChange={handleCategoryFilter} className="w-full p-2 border rounded">
                  <option value="">Tất cả danh mục</option>
                  <option value="Thời trang">Thời trang</option>
                  <option value="Công nghệ">Công nghệ</option>
                  <option value="Gia dụng">Gia dụng</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form thêm sản phẩm */}
          {isFormOpen && (
            <div className="bg-gray-50 p-4 rounded border mb-6 transition-all">
              <h2 className="text-xl font-semibold mb-4">Thêm sản phẩm mới</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Giá (VNĐ)</label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Nhập giá sản phẩm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Danh mục</label>
                  <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="Thời trang">Thời trang</option>
                    <option value="Công nghệ">Công nghệ</option>
                    <option value="Gia dụng">Gia dụng</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tồn kho</label>
                  <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Nhập số lượng tồn kho"
                  />
                </div>
              </div>
              <button
                onClick={handleAddProduct}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Thêm sản phẩm
              </button>
            </div>
          )}

          {/* Hiển thị tổng số */}
          <div className="bg-blue-50 p-3 rounded flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="font-medium text-blue-800">
              Tổng sản phẩm: <span className="font-bold">{products.length}</span> | Tổng tồn kho:{" "}
              <span className="font-bold">{totalStock}</span>
            </div>
            <div className="mt-2 md:mt-0">
              {categoryFilter && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Đang lọc: {categoryFilter}
                </span>
              )}
              {searchTerm && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium ml-2">
                  Tìm kiếm: {searchTerm}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bảng danh sách sản phẩm */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-3 px-4 text-left font-semibold">Tên sản phẩm</th>
                    <th className="py-3 px-4 text-right font-semibold">Giá</th>
                    <th className="py-3 px-4 text-left font-semibold">Danh mục</th>
                    <th className="py-3 px-4 text-right font-semibold">Tồn kho</th>
                    <th className="py-3 px-4 text-center font-semibold">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <ProductItem key={product.id} product={product} onDelete={handleDeleteProduct} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              {products.length === 0 ? (
                <div>
                  <p className="mb-2">Chưa có sản phẩm nào.</p>
                  <button onClick={() => setIsFormOpen(true)} className="text-blue-500 hover:underline">
                    Thêm sản phẩm mới
                  </button>
                </div>
              ) : (
                <p>Không tìm thấy sản phẩm phù hợp với bộ lọc.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
