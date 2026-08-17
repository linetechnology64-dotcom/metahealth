import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PortalPage from "@/components/PortalPage";

export default async function GroupsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <PortalPage
      titleCs="Skupinové programy"
      titleEn="Group Programmes"
      descCs="Transformace v komunitě. Připojte se k malým skupinám pro vzájemnou motivaci, sdílené učení a odpovědnost."
      descEn="Community-driven transformation. Join small-group cohorts for accountability, shared learning, and collective motivation."
    />
  );
}
