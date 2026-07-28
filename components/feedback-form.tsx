"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

type Profil = {
  id: string;
  ime: string;
  prezime: string | null;
};

function punoIme(clan: Profil) {
  return clan.prezime ? `${clan.ime} ${clan.prezime}` : clan.ime;
}

export function FeedbackForm({ clanovi }: { clanovi: Profil[] }) {
  const [izabranClan, setIzabranClan] = useState<Profil | null>(null);
  const [uCemuDobar, setUCemuDobar] = useState("");
  const [staUnaprediti, setStaUnaprediti] = useState("");
  const [slobodniTekst, setSlobodniTekst] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [poslato, setPoslato] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!izabranClan) {
      setError("Izaberi člana kome šalješ fidbek.");
      return;
    }

    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: insertError } = await supabase.from("feedback").insert({
      primalac_id: izabranClan.id,
      u_cemu_dobar: uCemuDobar || null,
      sta_unaprediti: staUnaprediti || null,
      slobodni_tekst: slobodniTekst || null,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setPoslato(true);
    setIzabranClan(null);
    setUCemuDobar("");
    setStaUnaprediti("");
    setSlobodniTekst("");
  }

  return (
    <Card className="gap-5 rounded-3xl border-0 py-8 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Pošalji fidbek</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start gap-2.5 rounded-xl bg-accent px-4 py-3 text-sm text-secondary-foreground">
          <span className="text-base">🤝</span>
          <span>
            Fidbek mora biti konstruktivan i sa poštovanjem. Vređanje i
            omalovažavanje su strogo zabranjeni.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Kome šalješ fidbek</label>
            <Combobox
              items={clanovi}
              value={izabranClan}
              onValueChange={setIzabranClan}
              itemToStringLabel={punoIme}
            >
              <ComboboxInput placeholder="Otkucaj ime člana..." />
              <ComboboxContent>
                <ComboboxEmpty>Nema člana sa tim imenom.</ComboboxEmpty>
                <ComboboxList>
                  {(clan: Profil) => (
                    <ComboboxItem key={clan.id} value={clan}>
                      {punoIme(clan)}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              U čemu je dobar/dobra{" "}
              <span className="font-normal text-muted-foreground">
                (opciono)
              </span>
            </label>
            <Textarea
              placeholder="Npr. Uvek je spreman/spremna da pomogne timu i drži rokove."
              value={uCemuDobar}
              onChange={(e) => setUCemuDobar(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              Šta može da unapredi{" "}
              <span className="font-normal text-muted-foreground">
                (opciono)
              </span>
            </label>
            <Textarea
              placeholder="Npr. Može bolje da komunicira kada kasni sa zadatkom."
              value={staUnaprediti}
              onChange={(e) => setStaUnaprediti(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Slobodan tekst</label>
            <Textarea
              placeholder="Npr. Drago mi je što radimo zajedno, nastavi ovako!"
              value={slobodniTekst}
              onChange={(e) => setSlobodniTekst(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {poslato && (
            <p className="text-sm text-secondary-foreground">
              Fidbek poslat.
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Šaljem..." : "Pošalji"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
