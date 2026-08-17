import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProgressPage from "./ProgressPage";

export default async function AssessmentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: logs } = await supabase
    .from("progress_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  return <ProgressPage userId={user.id} initialLogs={logs || []} />;
}
