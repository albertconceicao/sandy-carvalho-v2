import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContent } from "@/content/site";
import { getBlogPosts } from "@/lib/strapi/blog";

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

export const revalidate = 60;

export const metadata = {
  title: "Blog | Sandy Carvalho",
  description: "Artigos sobre psicologia, saúde mental e bem-estar.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar global={siteContent.global} />
      <main className="flex-grow py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </Link>

          <div className="space-y-4 mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Blog</h1>
            <p className="max-w-2xl text-muted-foreground md:text-lg">
              Reflexões sobre psicologia, relacionamentos e saúde mental.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="max-w-xl text-muted-foreground md:text-lg">
              Em breve, novos artigos sobre psicologia, relacionamentos e saúde mental. Volte em breve!
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                    {post.cover ? (
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.cover.src}
                          alt={post.cover.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ) : null}
                    <CardHeader>
                      <p className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</p>
                      <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
                      {post.excerpt ? <CardDescription>{post.excerpt}</CardDescription> : null}
                    </CardHeader>
                    <CardContent>
                      <span className="text-sm font-medium text-primary">Ler mais →</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer global={siteContent.global} />
    </div>
  );
}
