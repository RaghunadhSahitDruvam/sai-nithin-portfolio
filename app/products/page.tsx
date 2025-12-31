import { getPageMetadata } from "@/lib/metadata";
import ProductsClient from "./products-client";

export async function generateMetadata() {
  return await getPageMetadata("products");
}

export default function ProductsPage() {
  return <ProductsClient />;
}
