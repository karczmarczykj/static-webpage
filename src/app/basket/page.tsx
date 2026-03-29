"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";

export default function BasketPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-200" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your basket is empty</h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Basket{" "}
          <span className="text-gray-400 font-normal text-xl">({totalItems} items)</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 font-medium"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-5"
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🛍️</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/shop/${item.slug}`}
                className="font-semibold text-gray-900 hover:text-teal-600 transition-colors line-clamp-1"
              >
                {item.title}
              </Link>
              <p className="text-sm text-gray-500 mt-0.5">
                {item.price.toFixed(2)} {item.currency} each
              </p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center font-medium text-gray-900">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Subtotal */}
            <div className="w-24 text-right">
              <span className="font-bold text-gray-900">
                {(item.price * item.quantity).toFixed(2)} {item.currency}
              </span>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-300 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal ({totalItems} items)</span>
            <span>{totalPrice.toFixed(2)} PLN</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span className={totalPrice >= 200 ? "text-green-600 font-medium" : ""}>
              {totalPrice >= 200 ? "Free" : "14.99 PLN"}
            </span>
          </div>
          {totalPrice < 200 && (
            <p className="text-xs text-teal-600">
              Add {(200 - totalPrice).toFixed(2)} PLN more for free shipping!
            </p>
          )}
        </div>
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between font-bold text-gray-900 text-lg">
            <span>Total</span>
            <span>
              {(totalPrice + (totalPrice >= 200 ? 0 : 14.99)).toFixed(2)} PLN
            </span>
          </div>
        </div>

        <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          Proceed to Checkout <ArrowRight className="w-4 h-4" />
        </button>

        <Link
          href="/shop"
          className="block text-center text-sm text-teal-600 hover:text-teal-800 font-medium mt-3"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
