-- Korak 1.6: prava RLS pravila. Zamenjuje privremeno iskljucivanje iz 0002.

alter table profiles enable row level security;
alter table feedback enable row level security;

-- profiles: svi ulogovani vide listu clanova (potrebno za izbor u combobox-u),
-- ali svako sme da upise/izmeni samo svoj sopstveni red.
create policy "clanovi vide sve profile"
  on profiles for select
  to authenticated
  using (true);

create policy "clan upisuje samo svoj profil"
  on profiles for insert
  to authenticated
  with check (id = auth.uid());

create policy "clan menja samo svoj profil"
  on profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- feedback: svako ulogovan sme da POSALJE fidbek bilo kome,
-- ali sme da CITA samo fidbek koji je on primio (nikad tudji, nikad ko ga je poslao).
create policy "clan salje fidbek bilo kome"
  on feedback for insert
  to authenticated
  with check (true);

create policy "clan cita samo svoj primljeni fidbek"
  on feedback for select
  to authenticated
  using (primalac_id = auth.uid());
