import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import StudiesIndex from "./StudiesIndex";

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return <StudiesIndex />;
}
