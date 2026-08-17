import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ConsultationsPage from "./ConsultationsPage";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("client_id", user.id)
    .order("date", { ascending: false });

  return <ConsultationsPage bookings={bookings || []} />;
}
