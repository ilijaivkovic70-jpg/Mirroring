import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-10">
      <div className="flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-primary px-6 py-12 text-center shadow-sm">
        <span className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white">
          Iskren fidbek unutar tvoje grupe
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Dobrodošao/la u
          <br />
          Mirroring 💚
        </h1>
        <p className="max-w-md text-sm text-white/85 sm:text-base">
          Svako od nas ima svoje &bdquo;ogledalo&ldquo; &mdash; iskren,
          anoniman fidbek od ljudi iz grupe o tome u čemu si dobar/dobra i šta
          možeš da unaprediš.
        </p>

        {user ? (
          <Button
            size="lg"
            className="mt-2 w-full bg-white text-primary hover:bg-white/90 sm:w-auto"
            render={<Link href="/dashboard" />}
          >
            Idi na Dashboard
          </Button>
        ) : (
          <div className="mt-2 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-white text-primary hover:bg-white/90 sm:w-auto"
              render={<Link href="/login" />}
            >
              Uloguj se
            </Button>
            <Button
              size="lg"
              className="w-full border border-white/40 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
              render={<Link href="/register" />}
            >
              Registruj se
            </Button>
          </div>
        )}
      </div>

      <Card className="gap-4 rounded-2xl border-brand/30 px-2 py-6">
        <CardHeader className="flex-row items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-xl">
            🤝
          </span>
          <CardTitle className="text-base">Pravilo grupe</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-secondary-foreground">
            Fidbek mora biti konstruktivan i sa poštovanjem. Vređanje i
            omalovažavanje su strogo zabranjeni.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
