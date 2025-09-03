import ProductsClient from './ProductsClient';

export default function ProductsPage({ searchParams }) {
  return <ProductsClient searchParams={searchParams} />;
}