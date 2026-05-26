import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteContent } from "@/content/site";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/strapi/blog";

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post não encontrado | Sandy Carvalho" };
  }

  return {
    title: `${post.title} | Sandy Carvalho`,
    description: post.excerpt || post.title,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar global={siteContent.global} />
      <main className="flex-grow py-12 md:py-24">
        <article className="container px-4 md:px-6 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao blog
          </Link>

          
          <header className="space-y-4 mb-10">
            <p className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</p>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>
            {post.cover ? (
              <div className="relative mb-10 h-[280px] w-full overflow-hidden rounded-lg shadow-lg md:h-[400px]">
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            ) : null}
            {post.excerpt ? <p className="text-lg text-muted-foreground">{post.excerpt}</p> : null}
          </header>


          <div className="prose prose-neutral max-w-none dark:prose-invert space-y-4 text-muted-foreground">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="md:text-lg/relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
      <Footer global={siteContent.global} />
    </div>
  );
}
