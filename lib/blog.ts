export type BlogListItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export const blogPosts: BlogListItem[] = [
  {
    slug: "what-is-apy",
    title: "What Is APY and Why Does It Matter for Your Savings?",
    description:
      "Understand annual percentage yield, how it differs from APR, and why your savings rate quietly shapes your future.",
    date: "2026-04-01",
  },
  {
    slug: "big-bank-vs-high-yield",
    title: "Big Bank vs High-Yield Savings: The Real Cost of Loyalty",
    description:
      "Loyalty feels responsible — until you run the numbers. See what staying at a big bank can cost at common balances.",
    date: "2026-04-05",
  },
  {
    slug: "how-to-open-high-yield-savings",
    title: "How to Open a High-Yield Savings Account in 3 Minutes",
    description:
      "A calm, practical walkthrough for opening an online savings account, including safety, FDIC insurance, and access to your cash.",
    date: "2026-04-08",
  },
];

export function getBlogPost(slug: string): BlogListItem | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
