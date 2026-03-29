import { getInfoSlugs, getInfoPageWithHtml } from "@/lib/markdown";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getInfoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await getInfoPageWithHtml(params.slug);
  if (!page) return {};
  return {
    title: `${page.title} – DiabetesShop`,
  };
}

export default async function InfoPage({ params }: { params: { slug: string } }) {
  const page = await getInfoPageWithHtml(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/info"
        className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-800 text-sm font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Info
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-3">{page.title}</h1>

      {page.lastUpdated && (
        <p className="flex items-center gap-1 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100">
          <Calendar className="w-4 h-4" />
          Last updated: {page.lastUpdated}
        </p>
      )}

      {page.content && (
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      )}
    </div>
  );
}
