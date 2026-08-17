import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ArticlePage from "./ArticlePage";

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { slug } = await params;
  return <ArticlePage slug={slug} />;
}
