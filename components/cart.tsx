"use client";
import data from "@/lib/data.json";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "./ui/button";
import Image from "next/image";
import { ConfirmOrder } from "./confirm-order";

export const Cart = () => {
  const { cart, removeItem, removeAll } = useCartStore();

  const dataInCart = data.filter((_, id) =>
    cart.some((cartItem) => cartItem.id === id)
  );

  const dataQty = cart.map((cartItem) => {
    const item = data.find((_, id) => id === cartItem.id)!;
    return { ...item, quantity: cartItem.quantity, id: cartItem.id };
  });

  let orderTotal: number = 0;
  return (
    <div className="bg-white p-6 rounded-md self-start space-y-6">
      <h2 className="text-red font-bold text-2xl">
        Your Cart {dataInCart.length > 0 ? `(${dataInCart.length})` : ""}
      </h2>
      <div className="divide-y">
        {dataQty.map((item) => {
          let total = item.price! * item.quantity;
          orderTotal += total;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-4"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image.thumbnail.substring(1)}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-md"
                />
                <div className="space-y-2">
                  <h3>{item.name}</h3>
                  <p className="text-sm flex items-center gap-2">
                    <span className="text-red font-bold mr-2">
                      x{item.quantity}
                    </span>
                    <span className="text-rose-500">@ ${item.price}</span>
                    <span className="text-rose-500 font-bold">$ {total}</span>
                  </p>
                </div>
              </div>
              <Button variant={"ghost"} onClick={() => removeItem(item.id)}>
                <Image
                  src={"/assets/images/icon-remove-item.svg"}
                  alt=""
                  width={10}
                  height={10}
                  className="outline rounded-full outline-offset-4 outline-rose-400"
                />
              </Button>
            </div>
          );
        })}
      </div>
      {orderTotal > 0 && (
        <div className="py-6 border-t flex items-center justify-between">
          <p>Order Total</p>
          <p className="text-rose-900 font-bold text-2xl">${orderTotal}</p>
        </div>
      )}
      <div className="bg-rose-50 p-4 flex items-center gap-2 justify-center rounded-sm">
        <Image
          src={"/assets/images/icon-carbon-neutral.svg"}
          alt=""
          width={21}
          height={20}
        />
        <p className="text-rose-900">
          This is a <span className="font-bold">carbon-neutral</span> delivery
        </p>
      </div>
      <ConfirmOrder
        cart={cart}
        orderTotal={orderTotal}
        onCompleteOrder={removeAll}
      />
    </div>
  );
};
