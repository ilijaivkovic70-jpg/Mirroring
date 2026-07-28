import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { Card, CardContent } from "@/components/ui/card";

const ICON_BG: Record<string, string> = {
  "👍": "bg-secondary",
  "🌱": "bg-brand/20",
  "💬": "bg-accent",
};

function brojFidbekova(n: number) {
  const poslednja = n % 10;
  const poslednjeDve = n % 100;

  if (poslednja === 1 && poslednjeDve !== 11) return `${n} fidbek`;
  if ([2, 3, 4].includes(poslednja) && ![12, 13, 14].includes(poslednjeDve)) {
    return `${n} fidbeka`;
  }
  return `${n} fidbekova`;
}

function formatDatum(iso: string) {
  return new Date(iso).toLocaleDateString("sr-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function OgledaloPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: fidbekovi } = await supabase
    .from("feedback")
    .select("id, u_cemu_dobar, sta_unaprediti, slobodni_tekst, datum")
    .eq("primalac_id", user.id)
    .order("datum", { ascending: false });

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 rounded-2xl bg-secondary px-4 py-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-36 items-center justify-center rounded-full bg-gradient-to-br from-brand to-primary text-6xl shadow-lg ring-4 ring-white">
          💚
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Moje ogledalo
          </h1>
          <p className="text-sm text-muted-foreground">
            Fidbek koji si dobio/la od ljudi iz grupe. Anoniman je — ne zna se
            ko ga je poslao.
          </p>
        </div>
        {fidbekovi && fidbekovi.length > 0 && (
          <span className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-primary">
            Imaš {brojFidbekova(fidbekovi.length)}
          </span>
        )}
      </div>

      {!fidbekovi || fidbekovi.length === 0 ? (
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            Još nemaš fidbekova.
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {fidbekovi.map((f) => (
            <Card key={f.id} className="gap-5 rounded-3xl border-0 py-7 shadow-sm">
              <CardContent className="flex flex-col gap-5">
                <span className="w-fit rounded-full bg-secondary-foreground/10 px-3 py-1 text-xs font-medium text-primary">
                  {formatDatum(f.datum)}
                </span>
                {f.u_cemu_dobar && (
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-lg ${ICON_BG["👍"]}`}
                    >
                      👍
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        U čemu je dobar/dobra
                      </p>
                      <p className="text-sm leading-relaxed">{f.u_cemu_dobar}</p>
                    </div>
                  </div>
                )}
                {f.sta_unaprediti && (
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-lg ${ICON_BG["🌱"]}`}
                    >
                      🌱
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Šta može da unapredi
                      </p>
                      <p className="text-sm leading-relaxed">{f.sta_unaprediti}</p>
                    </div>
                  </div>
                )}
                {f.slobodni_tekst && (
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-lg ${ICON_BG["💬"]}`}
                    >
                      💬
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Poruka
                      </p>
                      <p className="text-sm leading-relaxed">{f.slobodni_tekst}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
