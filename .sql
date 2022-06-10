CREATE TABLE IF NOT EXISTS urls
(
    id integer NOT NULL DEFAULT nextval('urls_id_seq'::regclass),
    url text COLLATE "default" NOT NULL,
    "shortUrl" text COLLATE "default" NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone NOT NULL DEFAULT now(),
    CONSTRAINT urls_pkey PRIMARY KEY (id),
    CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl"),
    CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

ALTER TABLE IF EXISTS urls;

CREATE TABLE IF NOT EXISTS users
(
    name text COLLATE "default" NOT NULL,
    email text COLLATE "default" NOT NULL,
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    password text COLLATE "default" NOT NULL,
    "createdAt" timestamp(6) with time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)


ALTER TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS visits
(
    id integer NOT NULL DEFAULT nextval('visits_id_seq'::regclass),
    date timestamp(6) with time zone NOT NULL DEFAULT now(),
    "urlId" integer NOT NULL,
    CONSTRAINT visits_pkey PRIMARY KEY (id),
    CONSTRAINT "visits_urlId_fkey" FOREIGN KEY ("urlId")
        REFERENCES urls (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

ALTER TABLE IF EXISTS visits;