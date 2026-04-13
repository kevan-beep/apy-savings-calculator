import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BigBankVsHighYieldPost,
  HowToOpenHighYieldPost,
  WhatIsApyPost,
} from "@/components/blog/PostBodies";
import { getBlogPost } from "@/lib/blog";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return [
    { slug: "what-is-apy" },
    { slug: "big-bank-vs-high-yield" },
    { slug: "how-to-open-high-yield-savings" },
  ];
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const body =
    post.slug === "what-is-apy" ? (
      <WhatIsApyPost />
    ) : post.slug === "big-bank-vs-high-yield" ? (
      <BigBankVsHighYieldPost />
    ) : post.slug === "how-to-open-high-yield-savings" ? (
      <HowToOpenHighYieldPost />
    ) : null;

  if (!body) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {post.date}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-slate-600">{post.description}</p>
      <div className="mt-10">{body}</div>
      <div className="mt-12 border-t border-slate-200 pt-8 text-sm">
        <Link href="/blog" className="font-semibold text-emerald-600">
          ← Back to blog
        </Link>
        <span className="mx-2 text-slate-300">·</span>
        <Link href="/" className="font-semibold text-emerald-600">
          Try the calculator
        </Link>
      </div>
    </div>
  );
}
