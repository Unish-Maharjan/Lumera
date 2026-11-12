import Image from "next/image";
import Container from "@/components/ui/Container";
import { Heading } from "../ui";

export interface GridItem {
  id: string;
  title: string;
  image?: string; // path in /public; a plain placeholder shows without one
}

const DEFAULT_ITEMS: GridItem[] = [
  { id: "side", title: "Side Profile", image: "/images/productdetails/closeup.jpg" },
  { id: "connections", title: "Connections & Interface", image: "/images/productdetails/back.jpg" },
  { id: "front", title: "Full Front View", image: "/images/productdetails/wideview.jpg" },
  { id: "build", title: "Chassis Construction", image: "/images/productdetails/hero.jpg" },
];

interface ProductGridProps {
  items?: GridItem[];
}

export function ProductGrid({ items = DEFAULT_ITEMS }: ProductGridProps) {
  return (
    <section
      id="gallery"
      className="w-full overflow-hidden bg-white pb-24 text-zinc-950 sm:pb-32 lg:pb-40"
    >
      <Container size="xl">
        <Heading size="2xl" variant="dark" align="center" className="mb-12 lg:mb-16">
          Take a closer look
        </Heading>

        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          {items.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-3xl bg-[#F4F4F6] p-8 sm:p-10 lg:p-12"
            >
              <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {item.title}
              </h3>

              {/* A fixed ratio keeps every card the same size */}
              <div className="relative mt-8 aspect-[4/3] w-full">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 rounded-2xl bg-black/5" />
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export const ProductParts = ProductGrid;
export default ProductGrid;