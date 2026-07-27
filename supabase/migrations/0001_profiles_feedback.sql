-- Korak 1.1: tabele za clanove i fidbek.
-- feedback tabela namerno NEMA kolonu posiljaoca - to je srz anonimnosti (videti Korak 1.6 za RLS).

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  ime text not null,
  created_at timestamptz not null default now()
);

create table feedback (
  id uuid primary key default gen_random_uuid(),
  primalac_id uuid not null references profiles (id) on delete cascade,
  u_cemu_dobar text,
  sta_unaprediti text,
  slobodni_tekst text,
  datum timestamptz not null default now()
);

create index feedback_primalac_id_idx on feedback (primalac_id);
