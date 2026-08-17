import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PortalPage from "@/components/PortalPage";

export default async function NutritionPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <PortalPage
      titleCs="Nutriční plány"
      titleEn="Nutrition Plans"
      descCs="Jídelníček na míru podle vašeho metabolického typu, potravinových citlivostí a cílů buněčného zdraví."
      descEn="Custom meal frameworks designed around your metabolic type, food sensitivities, and cellular health goals."
    />
  );
}
