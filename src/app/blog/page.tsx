import Link from "next/link";
import { getAllBlogPosts } from "@/lib/markdown";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Blog</h1>
        <p className="text-gray-600">
          Expert articles, health tips, and community stories for people living with diabetes.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="h-48 bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center">
                <span className="text-5xl">📝</span>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-teal-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    {post.author && (
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-teal-600 hover:text-teal-800 font-medium flex items-center gap-1"
                  >
                    Read <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
