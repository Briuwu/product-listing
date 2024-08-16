"use client";

import data from "@/lib/data.json";
import { Card } from "./card";

export const Products = () => {
  const dataWithId = data.map((item, index) => ({ ...item, id: index }));

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-bold text-rose-900 text-[40px]">Desserts</h1>
      </header>
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))]">
        {dataWithId.map((item) => (
          <Card key={item.id} card={item} />
        ))}
      </div>
    </div>
  );
};
