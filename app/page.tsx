import { Cart } from "@/components/cart";
import { Products } from "@/components/products";

function Home() {
  return (
    <main className="container py-6">
      <div className="grid lg:grid-cols-[1fr_384px] gap-8">
        <Products />
        <Cart />
      </div>
    </main>
  );
}
export default Home;
