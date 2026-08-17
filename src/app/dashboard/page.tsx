import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardContent from "./DashboardContent";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Sync name from auth metadata if profile is missing it
  if (profile && !profile.full_name && user.user_metadata?.full_name) {
    await supabase
      .from("profiles")
      .update({ full_name: user.user_metadata.full_name })
      .eq("id", user.id);
    profile.full_name = user.user_metadata.full_name;
  }

  return <DashboardContent user={user} profile={profile} />;
}
