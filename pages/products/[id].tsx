import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import { Product } from "@/types";
import axios from "axios";

interface ProductViewProps extends GetServerSideProps {
  product: Product;
}

export default function ProductView({ product }: ProductViewProps) {
  console.log(product);
  return (
    <Layout>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <p>{product.description}</p>
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
