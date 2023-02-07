import axios, { AxiosError } from "axios";
import { NewProduct } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { handleError } from "@/lib/handleErrors";

interface ProductFormProps {}

export function ProductForm() {
  const [product, setProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0,
  });

  const router = useRouter();

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(`/api/products/${router.query.id}`);
      setProduct(data);
    };
    if (router.query?.id) {
      getProduct();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (router.query.id) {
      const res = await axios
        .put(`/api/products/${router.query.id}`, product)
        .then((response) => {
          console.log(response);
          router.push("/");
          toast.success("Task Updated", {
            position: "bottom-center",
          });
        })
        .catch((error) => handleError(error));
    } else {
      const res = await axios
        .post("/api/products", product)
        .then((response) => {
          toast.success("Product created succesfully");
          console.log(response);
          router.push("/");
        })
        .catch((error) => handleError(error));
    }
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
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name:
        </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          value={product.name}
        />

        <label
          htmlFor="price"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Price:
        </label>
        <input
          type="text"
          name="price"
          onChange={handleChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          value={product.price}
        />

        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description:
        </label>
        <textarea
          name="description"
          rows={2}
          onChange={handleChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          value={product.description}
        ></textarea>

        <button className="bg-blue-500 hover:bg-blue-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white transition-all duration-300">
          {router.query.id ? "Update Product" : "Save Product"}
        </button>
        <Link href={"/"}>
          <button className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 duration-300">
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
}
