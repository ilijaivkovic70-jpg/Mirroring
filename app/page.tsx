import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    </div>
  );
}
