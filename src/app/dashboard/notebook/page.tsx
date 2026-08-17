import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PortalPage from "@/components/PortalPage";

export default async function NotebookPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <PortalPage
      titleCs="Zápisník"
      titleEn="Notebook"
      descCs="Vaše osobní poznámky, zápisky z konzultací a sledování pokroku."
      descEn="Your personal notes, consultation records, and progress tracking."
    />
  );
}
