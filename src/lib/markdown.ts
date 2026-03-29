import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

const pageDirectory = path.join(process.cwd(), "page");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  coverImage?: string;
  content?: string;
}

export interface Product {
  slug: string;
  id: string;
  title: string;
  price: number;
  currency: string;
  excerpt: string;
  description?: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  features: string[];
  image?: string;
  content?: string;
}

export interface InfoPage {
  slug: string;
  title: string;
  lastUpdated: string;
  content?: string;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  return result.toString();
}

// Blog
export function getBlogSlugs(): string[] {
  const blogDir = path.join(pageDirectory, "blog");
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllBlogPosts(): BlogPost[] {
  const slugs = getBlogSlugs();
  return slugs
    .map((slug) => getBlogPost(slug))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string): BlogPost | null {
  const fullPath = path.join(pageDirectory, "blog", `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    author: data.author ?? "",
    tags: data.tags ?? [],
    coverImage: data.coverImage,
    content,
  };
}

export async function getBlogPostWithHtml(slug: string): Promise<BlogPost | null> {
  const post = getBlogPost(slug);
  if (!post || !post.content) return post;
  post.content = await markdownToHtml(post.content);
  return post;
}

// Shop / Products
export function getProductSlugs(): string[] {
  const shopDir = path.join(pageDirectory, "shop");
  if (!fs.existsSync(shopDir)) return [];
  return fs
    .readdirSync(shopDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllProducts(): Product[] {
  const slugs = getProductSlugs();
  return slugs
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => p !== null);
}

export function getProduct(slug: string): Product | null {
  const fullPath = path.join(pageDirectory, "shop", `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    slug,
    id: data.id ?? slug,
    title: data.title ?? slug,
    price: data.price ?? 0,
    currency: data.currency ?? "PLN",
    excerpt: data.excerpt ?? "",
    description: data.description,
    category: data.category ?? "",
    inStock: data.inStock ?? false,
    rating: data.rating ?? 0,
    reviewCount: data.reviewCount ?? 0,
    features: data.features ?? [],
    image: data.image,
    content,
  };
}

export async function getProductWithHtml(slug: string): Promise<Product | null> {
  const product = getProduct(slug);
  if (!product || !product.content) return product;
  product.content = await markdownToHtml(product.content);
  return product;
}

// Info pages
export function getInfoSlugs(): string[] {
  const infoDir = path.join(pageDirectory, "info");
  if (!fs.existsSync(infoDir)) return [];
  return fs
    .readdirSync(infoDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllInfoPages(): InfoPage[] {
  const slugs = getInfoSlugs();
  return slugs
    .map((slug) => getInfoPage(slug))
    .filter((p): p is InfoPage => p !== null);
}

export function getInfoPage(slug: string): InfoPage | null {
  const fullPath = path.join(pageDirectory, "info", `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title ?? slug,
    lastUpdated: data.lastUpdated ?? "",
    content,
  };
}

export async function getInfoPageWithHtml(slug: string): Promise<InfoPage | null> {
  const page = getInfoPage(slug);
  if (!page || !page.content) return page;
  page.content = await markdownToHtml(page.content);
  return page;
}
