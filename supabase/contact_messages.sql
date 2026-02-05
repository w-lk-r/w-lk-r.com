-- Create the contact_messages table
-- Run this in your Supabase SQL Editor

create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now(),
  read boolean default false
);

-- Enable Row Level Security
alter table contact_messages enable row level security;

-- Create a policy to allow inserts from anonymous users (for the contact form)
create policy "Allow anonymous inserts" on contact_messages
  for insert
  to anon
  with check (true);

-- Create a policy to allow authenticated users to read messages (for admin)
-- Uncomment if you want to build an admin interface later
-- create policy "Allow authenticated reads" on contact_messages
--   for select
--   to authenticated
--   using (true);

-- Optional: Create an index on created_at for faster sorting
create index if not exists contact_messages_created_at_idx on contact_messages(created_at desc);
