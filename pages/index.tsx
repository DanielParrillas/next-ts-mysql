import { ProductForm } from "@/components/ProductForm";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Product } from "@/types";

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
    <div>
      <ProductForm />
      {products.map((product) => (
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <p>{getDateProduct(product)}</p>
        </div>
      ))}
    </div>
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
