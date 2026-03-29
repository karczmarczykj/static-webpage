import { getProductSlugs, getProductWithHtml } from "@/lib/markdown";
import Link from "next/link";
import { ArrowLeft, Star, Check, Package } from "lucide-react";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateStaticParams() {
  const slugs = getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductWithHtml(params.slug);
  if (!product) return {};
  return {
    title: `${product.title} – DiabetesShop`,
    description: product.excerpt,
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductWithHtml(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/shop"
        className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-800 text-sm font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product image */}
        <div className="h-80 lg:h-auto bg-gradient-to-br from-teal-100 to-cyan-50 rounded-2xl flex items-center justify-center">
          <span className="text-8xl">🛍️</span>
        </div>

        {/* Product info */}
        <div>
          <span className="text-sm font-medium text-teal-600 uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-3">{product.title}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating} out of 5 ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{product.excerpt}</p>

          {/* Features */}
          {product.features.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Price and CTA */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-gray-900">
                {product.price.toFixed(2)} {product.currency}
              </span>
              <div
                className={`flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full ${
                  product.inStock
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <Package className="w-4 h-4" />
                {product.inStock ? "In Stock" : "Out of Stock"}
              </div>
            </div>

            <AddToCartButton
              id={product.id}
              slug={product.slug}
              title={product.title}
              price={product.price}
              currency={product.currency}
              image={product.image}
            />
          </div>

          <p className="text-xs text-gray-400">
            Free shipping on orders over 200 PLN · 30-day returns
          </p>
        </div>
      </div>

      {/* Full description */}
      {product.content && (
        <div className="mt-16 pt-8 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
          <div
            className="prose-content max-w-3xl"
            dangerouslySetInnerHTML={{ __html: product.content }}
          />
        </div>
      )}
    </div>
  );
}
