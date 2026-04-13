import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — High-Yield Savings Education",
  description:
    "Plain-English articles on APY, compound interest, high-yield savings accounts, and how to compare rates responsibly.",
  openGraph: {
    title: "Blog — High-Yield Savings Education",
    description:
      "Plain-English articles on APY, compound interest, high-yield savings accounts, and how to compare rates responsibly.",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Blog
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
        Practical explainers on savings yields, banking psychology, and how to
        evaluate FDIC-insured cash accounts without the hype.
      </p>
      <div className="mt-10 space-y-6">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {post.date}
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-emerald-700"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {post.description}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-emerald-600"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
