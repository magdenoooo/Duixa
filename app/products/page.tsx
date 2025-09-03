export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const params = await searchParams;
  return <ProductsClient searchParams={params} />;
}