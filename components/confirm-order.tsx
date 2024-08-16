import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import Image from "next/image";

import data from "@/lib/data.json";

type Props = {
  cart: {
    id: number;
    quantity: number;
  }[];
  orderTotal: number;
  onCompleteOrder: () => void;
};

export const ConfirmOrder = ({ cart, orderTotal, onCompleteOrder }: Props) => {
  const dataInCart = data.filter((_, id) =>
    cart.some((cartItem) => cartItem.id === id)
  );

  const dataQty = cart.map((cartItem) => {
    const item = data.find((_, id) => id === cartItem.id)!;
    return { ...item, quantity: cartItem.quantity, id: cartItem.id };
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={cart.length === 0}
          className="bg-red rounded-full w-full py-4"
        >
          Confirm Order
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="space-y-6">
            <Image
              src="/assets/images/icon-order-confirmed.svg"
              alt=""
              width={48}
              height={48}
            />
            <div className="space-y-2">
              <h1 className="text-[40px] font-bold text-rose-900">
                Order Confirmed
              </h1>
              <p className="text-rose-500 text-base font-normal">
                We hope you enjoy your food!
              </p>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="divide-y bg-rose-50 p-6 mt-8 max-h-[300px] overflow-auto">
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
                          <span className="text-rose-500 font-bold">
                            $ {total}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {orderTotal > 0 && (
              <div className="p-6 border-t flex items-center justify-between bg-rose-50">
                <p>Order Total</p>
                <p className="text-rose-900 font-bold text-2xl">
                  ${orderTotal}
                </p>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-red w-full rounded-full"
            onClick={onCompleteOrder}
          >
            Start New Order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
