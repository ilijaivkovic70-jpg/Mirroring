"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [sifra, setSifra] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [poruka, setPoruka] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPoruka(null);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password: sifra,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({ id: data.user.id, ime, prezime });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);

    if (data.session) {
      router.push("/");
      router.refresh();
    } else {
      setPoruka(
        "Nalog je napravljen. Proveri email da potvrdiš registraciju pre logina."
      );
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-4 py-10">
      <Card className="rounded-2xl">
        <CardHeader className="gap-2">
          <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-xl">
            🌱
          </span>
          <CardTitle className="text-xl">Napravi nalog</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Ime"
              required
              value={ime}
              onChange={(e) => setIme(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Prezime"
              required
              value={prezime}
              onChange={(e) => setPrezime(e.target.value)}
            />
            <Input
              type="email"
              placeholder="tvoj@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Šifra"
              required
              minLength={6}
              value={sifra}
              onChange={(e) => setSifra(e.target.value)}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            {poruka && (
              <p className="text-sm text-secondary-foreground">{poruka}</p>
            )}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Pravim nalog..." : "Registruj se"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Već imaš nalog?{" "}
              <Link href="/login" className="font-medium text-primary">
                Uloguj se
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
