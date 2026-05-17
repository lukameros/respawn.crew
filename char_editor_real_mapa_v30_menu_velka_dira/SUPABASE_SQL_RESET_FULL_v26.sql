-- MADNESS RAIN / SUPABASE FULL RESET SETUP v26
-- POZOR: Tohle smaže celé staré tabulky hry a vytvoří je znovu.
-- Spusť celé v Supabase SQL Editoru.

create extension if not exists pgcrypto;

drop table if exists public.madness_player_stats cascade;
drop table if exists public.madness_lobby_missions cascade;
drop table if exists public.madness_lobby_players cascade;
drop table if exists public.madness_chat_messages cascade;
drop table if exists public.madness_servers cascade;

create table public.madness_servers (
  id text primary key,
  name text not null,
  host text not null,
  host_player_id text,
  players integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.madness_chat_messages (
  id uuid primary key default gen_random_uuid(),
  server_id text not null,
  nick text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.madness_lobby_players (
  server_id text not null,
  player_id text not null,
  nick text not null,
  x numeric not null default 0,
  y numeric not null default 0,
  face integer not null default 1,
  weapon_type text,
  avatar_src text,
  updated_at timestamptz not null default now(),
  primary key (server_id, player_id)
);

create table public.madness_lobby_missions (
  server_id text primary key,
  map text not null default 'real_mapa',
  host_player_id text not null,
  host_nick text not null,
  status text not null default 'waiting',
  ready_players jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.madness_player_stats (
  player_id text primary key,
  nick text not null,
  kills integer not null default 0,
  glory integer not null default 0,
  level integer not null default 1,
  missions integer not null default 0,
  best_wave integer not null default 0,
  achievements jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.madness_servers enable row level security;
alter table public.madness_chat_messages enable row level security;
alter table public.madness_lobby_players enable row level security;
alter table public.madness_lobby_missions enable row level security;
alter table public.madness_player_stats enable row level security;

create policy "madness servers read"
on public.madness_servers
for select
using (true);

create policy "madness servers insert"
on public.madness_servers
for insert
with check (true);

create policy "madness servers update"
on public.madness_servers
for update
using (true)
with check (true);

create policy "madness servers delete"
on public.madness_servers
for delete
using (true);

create policy "madness chat read"
on public.madness_chat_messages
for select
using (true);

create policy "madness chat insert"
on public.madness_chat_messages
for insert
with check (true);

create policy "madness chat delete"
on public.madness_chat_messages
for delete
using (true);

create policy "madness lobby players read"
on public.madness_lobby_players
for select
using (true);

create policy "madness lobby players insert"
on public.madness_lobby_players
for insert
with check (true);

create policy "madness lobby players update"
on public.madness_lobby_players
for update
using (true)
with check (true);

create policy "madness lobby players delete"
on public.madness_lobby_players
for delete
using (true);

create policy "madness lobby missions read"
on public.madness_lobby_missions
for select
using (true);

create policy "madness lobby missions insert"
on public.madness_lobby_missions
for insert
with check (true);

create policy "madness lobby missions update"
on public.madness_lobby_missions
for update
using (true)
with check (true);

create policy "madness lobby missions delete"
on public.madness_lobby_missions
for delete
using (true);

create policy "madness player stats read"
on public.madness_player_stats
for select
using (true);

create policy "madness player stats insert"
on public.madness_player_stats
for insert
with check (true);

create policy "madness player stats update"
on public.madness_player_stats
for update
using (true)
with check (true);

create policy "madness player stats delete"
on public.madness_player_stats
for delete
using (true);

do $$
begin
  begin
    alter publication supabase_realtime add table public.madness_servers;
  exception when duplicate_object then null;
  end;

  begin
    alter publication supabase_realtime add table public.madness_chat_messages;
  exception when duplicate_object then null;
  end;

  begin
    alter publication supabase_realtime add table public.madness_lobby_players;
  exception when duplicate_object then null;
  end;

  begin
    alter publication supabase_realtime add table public.madness_lobby_missions;
  exception when duplicate_object then null;
  end;

  begin
    alter publication supabase_realtime add table public.madness_player_stats;
  exception when duplicate_object then null;
  end;
end $$;

create index if not exists madness_servers_updated_idx
on public.madness_servers (updated_at desc);

create index if not exists madness_chat_server_time_idx
on public.madness_chat_messages (server_id, created_at desc);

create index if not exists madness_lobby_players_server_updated_idx
on public.madness_lobby_players (server_id, updated_at desc);

create index if not exists madness_player_stats_glory_idx
on public.madness_player_stats (glory desc, level desc, kills desc);
