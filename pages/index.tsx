import Layout from "@/components/Layout";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Product } from "@/types";
import Link from "next/link";

interface HomeProps extends GetServerSideProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  console.log(products);

  const getDateProduct = (product: Product) => {
    if (typeof product.created === undefined) {
      return "";
    } else {
      return String(product.created);
    }
  };
  return (
    <Layout>
      {products.map((product) => (
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
      ))}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: products } = await axios.get(
    "http://localhost:3000/api/products"
  );
  return {
    props: {
      products,
    },
  };
};
