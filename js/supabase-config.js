// ================================================================
// SUPABASE CONFIG — LC Baterias
// Preencha com as credenciais do seu projeto em:
// https://supabase.com/dashboard → Project Settings → API
// ================================================================
const SUPABASE_URL  = 'https://sahbhaokyjrzbalddjta.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhaGJoYW9reWpyemJhbGRkanRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMDcyMjMsImV4cCI6MjA5NDc4MzIyM30.gXlmDPBtN6F8RDyEfTLJuh3SrbOzjtNxjt7LGZ9Pw0w';

// Inicializa o cliente (o script do Supabase deve ser carregado antes deste arquivo)
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ================================================================
// SQL PARA CRIAR AS TABELAS (execute no Supabase → SQL Editor)
// ================================================================
/*
-- PONTOS DE ASSISTÊNCIA
create table pontos_assistencia (
  id         uuid default gen_random_uuid() primary key,
  nome       text not null,
  cidade     text not null,
  estado     char(2) not null,
  endereco   text not null,
  telefone   text,
  whatsapp   text,
  lat        float8,
  lng        float8,
  horario    text default 'Seg-Sex 08h-18h | Sáb 08h-12h',
  sede       boolean default false,
  ativo      boolean default true,
  criado_em  timestamptz default now()
);

-- POSTS DO BLOG
create table posts (
  id            uuid default gen_random_uuid() primary key,
  titulo        text not null,
  slug          text not null unique,
  categoria     text not null,
  excerpt       text,
  conteudo      text,
  imagem_cor    text default 'linear-gradient(135deg,#003D82,#0057B8)',
  icone_fa      text default 'fa-bolt',
  autor         text default 'LC Baterias',
  tempo_leitura int default 3,
  publicado     boolean default false,
  criado_em     timestamptz default now(),
  atualizado_em timestamptz default now()
);

-- BANNERS DA HOME
create table banners (
  id               uuid default gen_random_uuid() primary key,
  tag              text,
  tag_icon         text default 'fa-bolt',
  titulo           text not null,
  titulo_destaque  text,
  subtitulo        text,
  btn1_texto       text,
  btn1_link        text,
  btn1_target      text default '_self',
  btn2_texto       text,
  btn2_link        text,
  btn2_target      text default '_self',
  ativo            boolean default true,
  ordem            int default 0,
  criado_em        timestamptz default now()
);

-- RLS: leitura pública, escrita só autenticado
alter table pontos_assistencia enable row level security;
alter table posts               enable row level security;
alter table banners             enable row level security;

create policy "leitura publica pontos"  on pontos_assistencia for select using (true);
create policy "leitura publica posts"   on posts               for select using (true);
create policy "leitura publica banners" on banners             for select using (true);

create policy "escrita autenticada pontos"  on pontos_assistencia for all using (auth.role() = 'authenticated');
create policy "escrita autenticada posts"   on posts               for all using (auth.role() = 'authenticated');
create policy "escrita autenticada banners" on banners             for all using (auth.role() = 'authenticated');
*/
