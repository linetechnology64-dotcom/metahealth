-- Progress Logs
create table public.progress_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  date date not null default current_date,
  title text,
  notes text,
  photo_url text,
  weight numeric,
  body_fat_pct numeric,
  waist_cm numeric,
  bp_systolic integer,
  bp_diastolic integer,
  energy_level integer check (energy_level between 1 and 10),
  created_at timestamptz default now()
);

alter table public.progress_logs enable row level security;

create policy "Users can manage own logs"
  on public.progress_logs for all
  using (auth.uid() = user_id);

-- Bookings
create table public.bookings (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references auth.users on delete cascade not null,
  date date not null,
  time time not null,
  duration integer not null,
  type text check (type in ('online', 'in-person')) not null,
  service text not null,
  price integer not null,
  status text check (status in ('pending', 'confirmed', 'cancelled')) default 'pending',
  notes text,
  created_at timestamptz default now()
);

alter table public.bookings enable row level security;

create policy "Users can view own bookings"
  on public.bookings for select
  using (auth.uid() = client_id);

create policy "Users can create bookings"
  on public.bookings for insert
  with check (auth.uid() = client_id);

create policy "Coach can manage all bookings"
  on public.bookings for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'coach'
    )
  );

-- Create storage bucket for progress photos
insert into storage.buckets (id, name, public) values ('progress-photos', 'progress-photos', true);

create policy "Users can upload own photos"
  on storage.objects for insert
  with check (bucket_id = 'progress-photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can view own photos"
  on storage.objects for select
  using (bucket_id = 'progress-photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Public can view progress photos"
  on storage.objects for select
  using (bucket_id = 'progress-photos');
