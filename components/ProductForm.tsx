import axios from "axios";
import { Product } from "@/types";

interface ProductFormProps {}

export function ProductForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product: Product = {
      name: "product1",
      description: "some product",
      price: 10000,
    };
    const res = await axios.post("/api/products", product);
    console.log(res);
  };
  return (
    <div className="bg-gray-300">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" />

        <label htmlFor="price">Price:</label>
        <input type="number" name="price" />

        <label htmlFor="description">Description:</label>
        <textarea name="description" rows={2}></textarea>

        <button>Send product</button>
      </form>
    </div>
  );
}
