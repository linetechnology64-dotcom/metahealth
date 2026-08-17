import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AccountSettings from "./AccountSettings";

export default async function AccountPage() {
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

  // If profile doesn't have a name but auth metadata does, update it
  if (profile && !profile.full_name && user.user_metadata?.full_name) {
    await supabase
      .from("profiles")
      .update({ full_name: user.user_metadata.full_name })
      .eq("id", user.id);
    profile.full_name = user.user_metadata.full_name;
  }

  return <AccountSettings user={user} profile={profile} />;
}
