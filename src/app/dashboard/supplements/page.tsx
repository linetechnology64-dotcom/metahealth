import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PortalPage from "@/components/PortalPage";

export default async function SupplementsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <PortalPage
      titleCs="Doporučení doplňků"
      titleEn="Supplement Guidance"
      descCs="Doporučení doplňků stravy na základě vašich krevních testů a zdravotních markerů. Žádné hádání, pouze přesnost."
      descEn="Evidence-based supplement recommendations tailored to your blood work and health markers."
    />
  );
}
