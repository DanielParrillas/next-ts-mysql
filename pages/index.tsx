import Layout from "@/components/Layout";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Product } from "@/types";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

interface HomeProps extends GetServerSideProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  console.log(products);

  const renderProducts = () => {
    if (products.length === 0) return <h1>No products</h1>;

    return products.map((product) => (
      <ProductCard key={`product-card-${product.id}`} product={product} />
    ));
  };

  return (
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderProducts()}
      </div>
      <Link href={"/new"}>
        <button className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 duration-300">
          New Product
        </button>
      </Link>
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
