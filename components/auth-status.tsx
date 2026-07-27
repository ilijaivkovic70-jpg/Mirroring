"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return null;

  if (!user) {
    return (
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="sm" render={<Link href="/login" />}>
          Uloguj se
        </Button>
        <Button size="sm" render={<Link href="/register" />}>
          Registruj se
        </Button>
      </div>
    );
  }

  return (
    <div className="ml-auto flex items-center gap-2">
      <span className="hidden text-sm text-muted-foreground sm:inline">
        {user.email}
      </span>
      <Button variant="ghost" size="sm" render={<Link href="/ogledalo" />}>
        Ogledalo
      </Button>
      <Button size="sm" render={<Link href="/dashboard" />}>
        Dashboard
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={async () => {
          const supabase = createClient();
          await supabase.auth.signOut();
        }}
      >
        Odjavi se
      </Button>
    </div>
  );
}
