"use client";

import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await createClient().auth.signOut();
        window.location.href = "/";
      }}
    >
      Logout
    </button>
  );
}
