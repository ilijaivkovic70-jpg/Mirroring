import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Moje ogledalo
        </h1>
        <p className="text-sm text-muted-foreground">
          Fidbek koji si dobio/la od ljudi iz grupe. Anoniman je — ne zna se
          ko ga je poslao.
        </p>
      </div>

      {!fidbekovi || fidbekovi.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            Još nemaš fidbekova.
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {fidbekovi.map((f) => (
            <Card key={f.id}>
              <CardHeader>
                <CardTitle className="text-sm font-normal text-muted-foreground">
                  {formatDatum(f.datum)}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {f.u_cemu_dobar && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      U čemu je dobar/dobra
                    </p>
                    <p className="text-sm">{f.u_cemu_dobar}</p>
                  </div>
                )}
                {f.sta_unaprediti && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Šta može da unapredi
                    </p>
                    <p className="text-sm">{f.sta_unaprediti}</p>
                  </div>
                )}
                {f.slobodni_tekst && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Poruka
                    </p>
                    <p className="text-sm">{f.slobodni_tekst}</p>
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
