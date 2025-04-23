"use client"

function ProductItem({ product, onDelete }) {
  return (
    <tr className="hover:bg-gray-50 border-b">
      <td className="py-3 px-4 border-b">
        <div className="font-medium">{product.name}</div>
      </td>
      <td className="py-3 px-4 border-b text-right">
        <div className="font-medium text-gray-900">{product.price.toLocaleString()} đ</div>
      </td>
      <td className="py-3 px-4 border-b">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium
          ${product.category === "Thời trang" ? "bg-purple-100 text-purple-800" : ""}
          ${product.category === "Công nghệ" ? "bg-blue-100 text-blue-800" : ""}
          ${product.category === "Gia dụng" ? "bg-yellow-100 text-yellow-800" : ""}
        `}
        >
          {product.category}
        </span>
      </td>
      <td className="py-3 px-4 border-b text-right">
        <div className={`font-medium ${product.stock < 10 ? "text-red-600" : "text-gray-900"}`}>{product.stock}</div>
      </td>
      <td className="py-3 px-4 border-b text-center">
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full text-sm transition-colors"
        >
          Xoá
        </button>
      </td>
    </tr>
  )
}

export default ProductItem
