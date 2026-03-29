"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  id: string;
  slug: string;
  title: string;
  price: number;
  currency: string;
  image?: string;
}

export default function AddToCartButton({
  id,
  slug,
  title,
  price,
  currency,
  image,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id, slug, title, price, currency, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
        added
          ? "bg-green-500 hover:bg-green-600"
          : "bg-teal-500 hover:bg-teal-600 active:scale-95"
      }`}
    >
      {added ? (
        <>
          <Check className="w-5 h-5" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          Add to Basket
        </>
      )}
    </button>
  );
}
