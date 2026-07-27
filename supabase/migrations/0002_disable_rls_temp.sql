-- Privremeno iskljucujemo RLS (Supabase ga automatski ukljuci na novim tabelama).
-- Prava RLS pravila dolaze u Koraku 1.6 - do tada tabele moraju biti citljive/upisive
-- da bismo mogli da testiramo registraciju, login i slanje fidbeka.

alter table profiles disable row level security;
alter table feedback disable row level security;
