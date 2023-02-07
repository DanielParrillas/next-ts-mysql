import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import { Product } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import { handleError } from "@/lib/handleErrors";
import { toast } from "react-toastify";

interface ProductViewProps extends GetServerSideProps {
  product: Product;
}

export default function ProductView({ product }: ProductViewProps) {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    await axios
      .delete(`/api/products/${id}`)
      .then(() => {
        toast.error("Producto eliminado correctamente");
        router.push("/");
      })
      .catch((error) => {
        handleError(error);
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="border border-gray-200 shadow-md p-6 rounded mb-6">
        <h1>{product.name}</h1>
        <p>{product.price}</p>
        <p>{product.description}</p>
        <button
          className="bg-yellow-500 text-white py-2 px-6 rounded hover:bg-yellow-600 duration-300"
          onClick={() => router.push(`/products/edit/${product.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 duration-300"
          onClick={() => handleDelete(product.id)}
        >
          Delete
        </button>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: product } = await axios.get(
    `http://localhost:3000/api/products/${context.query.id}`
  );

  return {
    props: {
      product,
    },
  };
};
