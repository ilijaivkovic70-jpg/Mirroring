import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-10">
      <div className="flex flex-col gap-3 text-center sm:text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Dobrodošao/la u Mirroring
        </h1>
        <p className="text-muted-foreground">
          Svako od nas ima svoje &bdquo;ogledalo&ldquo; &mdash; iskren,
          anoniman fidbek od ljudi iz grupe o tome u čemu si dobar/dobra i šta
          možeš da unaprediš.
        </p>
      </div>

      <Card className="border-brand/30">
        <CardHeader>
          <CardTitle>Pravilo grupe</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-secondary-foreground">
            Fidbek mora biti konstruktivan i sa poštovanjem. Vređanje i
            omalovažavanje su strogo zabranjeni.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prijava / registracija</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Input type="email" placeholder="tvoj@email.com" disabled />
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto" disabled>
              Uloguj se
            </Button>
            <Button
              variant="secondary"
              className="w-full sm:w-auto"
              disabled
            >
              Napravi nalog
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Registracija i login stižu u sledećoj fazi.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
