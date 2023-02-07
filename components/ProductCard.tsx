import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const getDateProduct = (product: Product) => {
    if (typeof product.created === undefined) {
      return "";
    } else {
      return String(product.created);
    }
  };
  return (
    <div>
      <Link key={product.id} href={`/products/${product.id}`}>
        <div
          key={product.id}
          className="border border-gray-200 shadow-md p-6 rounded mb-6"
        >
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <p>{getDateProduct(product)}</p>
        </div>
      </Link>
    </div>
  );
}
