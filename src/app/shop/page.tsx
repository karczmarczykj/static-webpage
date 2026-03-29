import Link from "next/link";
import { getAllProducts } from "@/lib/markdown";
import { Star, ShoppingCart } from "lucide-react";

export default function ShopPage() {
  const products = getAllProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Shop</h1>
        <p className="text-gray-600">
          Quality diabetes management products, carefully selected by our team of experts.
        </p>
      </div>

      {/* Category tabs */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-teal-50 text-teal-700 border border-teal-100"
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg">No products yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="h-44 bg-gradient-to-br from-teal-100 to-cyan-50 flex items-center justify-center">
                <span className="text-5xl">🛍️</span>
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-teal-600 uppercase tracking-wide">
                  {product.category}
                </span>
                <h2 className="font-semibold text-gray-900 mt-1 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {product.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-500">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                    <span className="font-bold text-gray-900">
                      {product.price.toFixed(2)} {product.currency}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-lg">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
