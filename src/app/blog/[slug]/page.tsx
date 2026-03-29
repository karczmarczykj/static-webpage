import { getBlogSlugs, getBlogPostWithHtml } from "@/lib/markdown";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostWithHtml(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} – DiabetesShop Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostWithHtml(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-800 text-sm font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <div className="h-56 bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl mb-8 flex items-center justify-center">
        <span className="text-6xl">📝</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full"
          >
            <Tag className="w-3 h-3" />
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
        {post.date && (
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {post.date}
          </span>
        )}
        {post.author && (
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {post.author}
          </span>
        )}
      </div>

      {post.content && (
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
    </div>
  );
}
