export default function ProductItem({ product }) {
    return (
      <div className="grid grid-cols-5 gap-2 items-center border-b px-2 py-1">
        <div>{product.name}</div>
        <div>{product.price.toLocaleString()} đ</div>
        <div>{product.category}</div>
        <div>{product.stock}</div>
        <button className="text-gray-400 cursor-not-allowed">Xoá</button>
      </div>
    );
  }
  