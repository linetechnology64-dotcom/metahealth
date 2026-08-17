import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BookingPage from "./BookingPage";

export default async function CoachingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("client_id", user.id)
    .order("date", { ascending: true });

  return <BookingPage userId={user.id} initialBookings={bookings || []} />;
}
