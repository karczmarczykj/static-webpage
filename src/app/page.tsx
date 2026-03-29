import Link from "next/link";
import { getAllBlogPosts, getAllProducts } from "@/lib/markdown";
import { ArrowRight, Star } from "lucide-react";

export default function Home() {
  const recentPosts = getAllBlogPosts().slice(0, 3);
  const featuredProducts = getAllProducts().slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-cyan-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Partner in{" "}
            <span className="text-teal-600">Diabetes Management</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Discover quality products, expert advice, and community support to
            help you live well with diabetes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/blog"
              className="bg-white hover:bg-gray-50 text-teal-600 font-semibold px-8 py-3 rounded-lg border border-teal-200 transition-colors"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Expert-Reviewed Products",
                desc: "Every product is reviewed by certified diabetes educators",
                emoji: "🏥",
              },
              {
                title: "Free Shipping",
                desc: "Free delivery on orders over 200 PLN",
                emoji: "🚚",
              },
              {
                title: "30-Day Returns",
                desc: "Not satisfied? Return within 30 days, hassle-free",
                emoji: "🔄",
              },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-xl bg-gray-50">
                <div className="text-4xl mb-3">{f.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <Link
                href="/shop"
                className="text-teal-600 hover:text-teal-800 font-medium text-sm flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/shop/${product.slug}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <div className="h-48 bg-gradient-to-br from-teal-100 to-cyan-50 flex items-center justify-center">
                    <span className="text-5xl">🛍️</span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-teal-600 uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mt-1 mb-2 group-hover:text-teal-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {product.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {product.price.toFixed(2)} {product.currency}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">From the Blog</h2>
              <Link
                href="/blog"
                className="text-teal-600 hover:text-teal-800 font-medium text-sm flex items-center gap-1"
              >
                All Posts <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="h-40 bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl mb-3 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {post.date} · {post.author}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Journey to Better Health
          </h2>
          <p className="text-teal-100 mb-8 max-w-xl mx-auto">
            Join thousands of people who trust DiabetesShop for their diabetes
            management needs.
          </p>
          <Link
            href="/shop"
            className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-lg hover:bg-teal-50 transition-colors inline-flex items-center gap-2"
          >
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
