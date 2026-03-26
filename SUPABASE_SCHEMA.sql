create extension if not exists pgcrypto;

create table if not exists public.initiatives (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  channels text[] not null default '{}',
  owner text not null,
  quarter text not null,
  status text not null,
  deadline date,
  start_date date,
  end_date date,
  description text not null default '',
  is_archived boolean not null default false,
  archived_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  requested_by text not null,
  quarter text not null,
  requested_date date not null,
  needed_by date,
  channels text[] not null default '{}',
  notes text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.app_content (
  key text primary key,
  html text not null default '',
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.initiatives enable row level security;
alter table public.requests enable row level security;
alter table public.app_content enable row level security;
