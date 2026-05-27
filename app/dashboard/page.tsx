import { LogoutButton } from "@/components/ui/logout-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/");
  }

  return (
    <div>
      Welcome {data.user.email}
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}
