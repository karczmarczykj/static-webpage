import Link from "next/link";
import { getAllInfoPages } from "@/lib/markdown";
import { FileText, ArrowRight } from "lucide-react";

export default function InfoIndexPage() {
  const pages = getAllInfoPages();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Info</h1>
        <p className="text-gray-600">Learn more about us, our policies, and how we work.</p>
      </div>

      {pages.length === 0 ? (
        <p className="text-gray-400">No info pages yet.</p>
      ) : (
        <div className="space-y-4">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/info/${page.slug}`}
              className="flex items-center justify-between p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {page.title}
                  </h2>
                  {page.lastUpdated && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      Last updated: {page.lastUpdated}
                    </p>
                  )}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-teal-500 transition-colors" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
