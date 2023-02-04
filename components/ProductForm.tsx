import axios from "axios";
import { NewProduct } from "@/types";
import { useState } from "react";
import { useRouter } from "next/router";

interface ProductFormProps {}

export function ProductForm() {
  const [product, setProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0,
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post("/api/products", product);
    console.log(res);
    router.push("/");
  };

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-col"
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="shadow border rounded py-2 px-3 text-gray-700"
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          onChange={handleChange}
          className="shadow border rounded py-2 px-3 text-gray-700"
        />

        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          rows={2}
          onChange={handleChange}
          className="shadow border rounded py-2 px-3 text-gray-700"
        ></textarea>

        <button className="bg-blue-500 hover:bg-blue-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white transition-all duration-300">
          Send product
        </button>
      </form>
    </div>
  );
}
