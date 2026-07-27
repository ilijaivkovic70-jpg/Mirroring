import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { FeedbackForm } from "@/components/feedback-form";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: clanovi } = await supabase
    .from("profiles")
    .select("id, ime")
    .neq("id", user.id)
    .order("ime");

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <FeedbackForm clanovi={clanovi ?? []} />
    </div>
  );
}
