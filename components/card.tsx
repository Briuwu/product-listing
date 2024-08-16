"use client";
import { useState, useEffect } from "react";
import { CardImg } from "./card-img";
import { Button } from "./ui/button";
import { useCartStore } from "@/stores/cart-store";

type Props = {
  card: {
    image: {
      thumbnail: string;
      mobile: string;
      tablet: string;
      desktop: string;
    };
    name: string;
    category: string;
    price: number;
    id: number;
  };
};

export const Card = ({ card }: Props) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { addToCart, cart, removeFromCart } = useCartStore();

  const displayQty = (id: number) => {
    const item = cart.find((item) => item.id === id);
    return item?.quantity || 0;
  };

  useEffect(() => {
    if (cart.some((item) => item.id === card.id)) {
      setIsAddedToCart(true);
    } else {
      setIsAddedToCart(false);
    }
  }, [cart, card.id]);
  return (
    <div>
      <div className="relative w-fit">
        <CardImg
          mobile={card.image.mobile}
          tablet={card.image.tablet}
          desktop={card.image.desktop}
        />
        {isAddedToCart ? (
          <div className="rounded-full bg-red border-rose-400 text-white text-center gap-2 border absolute right-1/2 translate-x-1/2 -bottom-5 text-sm hover:bg-red py-3 px-7 w-[160px] justify-between flex items-center">
            <Button
              variant={"ghost"}
              className="px-2 py-1"
              onClick={() => removeFromCart(card.id)}
            >
              -
            </Button>
            <span>{displayQty(card.id)}</span>
            <Button
              variant={"ghost"}
              className="px-2 py-1"
              onClick={() => addToCart(card.id)}
            >
              +
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsAddedToCart(true)}
            className="rounded-full bg-white border-rose-400 text-rose-900 text-center gap-2 border absolute right-1/2 translate-x-1/2 -bottom-5 text-sm hover:bg-white hover:text-red py-3 px-7 w-[160px]"
          >
            <img src="/assets/images/icon-add-to-cart.svg" alt="" />
            Add to cart
          </Button>
        )}
      </div>
      <div className="space-y-1 mt-[38px]">
        <span className="text-rose-500 text-sm">{card.category}</span>
        <p className="text-rose-900 font-semibold text-base">{card.name}</p>
        <p className="text-red font-semibold text-base">${card.price}</p>
      </div>
    </div>
  );
};
