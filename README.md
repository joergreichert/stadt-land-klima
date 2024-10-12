# Stadt.Land.Klima!

## Wichtige Dokumente

Figma Click Dummy Desktop 1280:
https://www.figma.com/file/hfLAnnvP4Qj2h9ALUtPUMl/Klima2035-Desktop?type=design&node-id=1%3A2001&mode=design&t=HKdvCQFJntTMq0EZ-1

Figma Click Dummy Mobile:
https://www.figma.com/file/xOUA8jmhBBreYvmZRdlFSn/Klima2035-mobile?type=design&node-id=3%3A2&mode=design&t=sY2zf5p8UTfrLm1e-1


## Preparations
0. On Windows install Ubunut on Virtual Machine:
1. Install Docker for your machine (https://docs.docker.com/engine/install/, https://docs.docker.com/desktop/)
2. Clone this repo into your desired folder
3. Copy example env-files and adjust to your needs:
```
cd stadt-land-klima/
cp docker/db/.env.example docker/db/.env
cp src/directus/.env.example src/directus/.env
cp src/frontend/.env.example src/frontend/.env
```

## Installation: 
Docker needs to be running  
Give Permission to folder to write files and also subfolder: This is not optimal! 
```
$ cd stadt-land-klima/
$ cd bin
$ ./start_development.sh
```
This may take some time.
When finished and started check http://localhost:8081 if directus started correctly. 

Import SQL
```
CREATE TABLE public.editors (
    id uuid NOT NULL,
    user_created uuid,
    user_updated uuid,
    localteam_id uuid NOT NULL,
    date_created timestamp with time zone,
    date_updated timestamp with time zone,
    email character varying(255) DEFAULT NULL::character varying NOT NULL,
    internal_comment text,
    organisation character varying(255) DEFAULT NULL::character varying
);

ALTER TABLE public.editors OWNER TO directus;

CREATE TABLE public.junction_directus_users_localteams (
    id uuid NOT NULL,
    directus_users_id uuid,
    localteam_id uuid
);

ALTER TABLE public.junction_directus_users_localteams OWNER TO directus;

CREATE TABLE public.localteams (
    id uuid NOT NULL,
    user_created uuid,
    user_updated uuid,
    admin_id uuid,
    date_created timestamp with time zone,
    date_updated timestamp with time zone,
    internal_comment text,
    municipality_name character varying(255) DEFAULT NULL::character varying,
    name character varying(255) DEFAULT NULL::character varying NOT NULL,
    slug character varying(255) DEFAULT NULL::character varying,
    status character varying(255) DEFAULT 'draft'::character varying NOT NULL
);

ALTER TABLE public.localteams OWNER TO directus;

CREATE TABLE public.measures (
    id uuid NOT NULL,
    user_created uuid,
    user_updated uuid,
    choices_rating character varying(255) DEFAULT NULL::character varying NOT NULL,
    date_created timestamp with time zone,
    date_updated timestamp with time zone,
    description text,
    description_about text,
    description_benefit text,
    description_contribution text,
    description_evaluation_criteria text,
    description_funding text,
    description_implementation text,
    description_legal text,
    description_tutorial text,
    description_verification text,
    feasibility_economical character varying(255) DEFAULT NULL::character varying,
    feasibility_political character varying(255) DEFAULT NULL::character varying,
    impact integer,
    measure_id character varying(255) DEFAULT NULL::character varying,
    name character varying(255) DEFAULT NULL::character varying NOT NULL,
    notes text,
    sector character varying(255) DEFAULT NULL::character varying,
    slug character varying(255) DEFAULT NULL::character varying,
    status character varying(255) DEFAULT 'draft'::character varying,
    verification_description text,
    weight integer
);

ALTER TABLE public.measures OWNER TO directus;

CREATE TABLE public.municipalities (
    id uuid NOT NULL,
    user_created uuid,
    user_updated uuid,
    localteam_id uuid NOT NULL,
    date_created timestamp with time zone,
    date_updated timestamp with time zone,
    description text,
    geolocation public.geometry(Point,4326) DEFAULT NULL::public.geometry,
    mayor character varying(255) DEFAULT NULL::character varying,
    municipality_type character varying(255) DEFAULT NULL::character varying,
    name character varying(255) DEFAULT NULL::character varying NOT NULL,
    party_mayor character varying(255) DEFAULT NULL::character varying,
    percantage_rated numeric(10,2) DEFAULT NULL::numeric,
    place integer,
    population integer,
    score_ann numeric(10,5) DEFAULT NULL::numeric,
    score_bh numeric(10,5) DEFAULT NULL::numeric,
    score_cpma numeric(10,5) DEFAULT NULL::numeric,
    score_energy numeric(10,5) DEFAULT NULL::numeric,
    score_iec numeric(10,5) DEFAULT NULL::numeric,
    score_total numeric(10,5) DEFAULT NULL::numeric,
    score_transport numeric(10,5) DEFAULT NULL::numeric,
    slug character varying(255) DEFAULT NULL::character varying,
    state character varying(255) DEFAULT NULL::character varying,
    status character varying(255) DEFAULT 'draft'::character varying NOT NULL
);

ALTER TABLE public.municipalities OWNER TO directus;

CREATE TABLE public.pages (
    id uuid NOT NULL,
    user_created uuid,
    user_updated uuid,
    contents text,
    date_created timestamp with time zone,
    date_updated timestamp with time zone,
    menus text,
    name text,
    slug character varying(255) DEFAULT NULL::character varying,
    status character varying(255) DEFAULT 'draft'::character varying NOT NULL
);

ALTER TABLE public.pages OWNER TO directus;

CREATE TABLE public.ratings_measures (
    id uuid NOT NULL,
    user_created uuid,
    user_updated uuid,
    measure_id uuid,
    localteam_id uuid,
    achievement text,
    applicable boolean DEFAULT true,
    approved boolean DEFAULT true,
    choices character varying(255) DEFAULT NULL::character varying,
    date_created timestamp with time zone,
    date_updated timestamp with time zone,
    measure_published boolean DEFAULT true,
    rating character varying(255) DEFAULT NULL::character varying,
    source text,
    status character varying(255) DEFAULT 'draft'::character varying NOT NULL
);

ALTER TABLE public.ratings_measures OWNER TO directus;

ALTER TABLE ONLY public.junction_directus_users_localteams ALTER COLUMN id SET DEFAULT nextval('public.junction_directus_users_localteams_id_seq'::regclass);

ALTER TABLE ONLY public.municipalities ALTER COLUMN id SET DEFAULT nextval('public.municipalities_id_seq'::regclass);

ALTER TABLE ONLY public.pages ALTER COLUMN id SET DEFAULT nextval('public.pages_id_seq'::regclass);

ALTER TABLE ONLY public.ratings_measures ALTER COLUMN id SET DEFAULT nextval('public.ratings_measures_id_seq'::regclass);

SELECT pg_catalog.setval('public.junction_directus_users_localteams_id_seq', 1, false);

SELECT pg_catalog.setval('public.municipalities_id_seq', 1, false);

SELECT pg_catalog.setval('public.pages_id_seq', 1, false);

SELECT pg_catalog.setval('public.ratings_measures_id_seq', 1, false);

ALTER TABLE ONLY public.editors
    ADD CONSTRAINT editors_email_unique UNIQUE (email);

ALTER TABLE ONLY public.editors
    ADD CONSTRAINT editors_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.junction_directus_users_localteams
    ADD CONSTRAINT junction_directus_users_localteams_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.localteams
    ADD CONSTRAINT localteams_admin_id_unique UNIQUE (admin_id);

ALTER TABLE ONLY public.localteams
    ADD CONSTRAINT localteams_name_unique UNIQUE (name);

ALTER TABLE ONLY public.localteams
    ADD CONSTRAINT localteams_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.localteams
    ADD CONSTRAINT localteams_slug_unique UNIQUE (slug);

ALTER TABLE ONLY public.measures
    ADD CONSTRAINT measures_name_unique UNIQUE (name);

ALTER TABLE ONLY public.measures
    ADD CONSTRAINT measures_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.measures
    ADD CONSTRAINT measures_slug_unique UNIQUE (slug);

ALTER TABLE ONLY public.municipalities
    ADD CONSTRAINT municipalities_localteam_id_unique UNIQUE (localteam_id);

ALTER TABLE ONLY public.municipalities
    ADD CONSTRAINT municipalities_name_unique UNIQUE (name);

ALTER TABLE ONLY public.municipalities
    ADD CONSTRAINT municipalities_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.municipalities
    ADD CONSTRAINT municipalities_slug_unique UNIQUE (slug);

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.ratings_measures
    ADD CONSTRAINT ratings_measures_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.editors
    ADD CONSTRAINT editors_localteam_id_foreign FOREIGN KEY (localteam_id) REFERENCES public.localteams(id);

ALTER TABLE ONLY public.editors
    ADD CONSTRAINT editors_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.editors
    ADD CONSTRAINT editors_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.junction_directus_users_localteams
    ADD CONSTRAINT junction_directus_users_localteams_directus_users_id_foreign FOREIGN KEY (directus_users_id) REFERENCES public.directus_users(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.junction_directus_users_localteams
    ADD CONSTRAINT junction_directus_users_localteams_localteam_id_foreign FOREIGN KEY (localteam_id) REFERENCES public.localteams(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.localteams
    ADD CONSTRAINT localteams_admin_id_foreign FOREIGN KEY (admin_id) REFERENCES public.directus_users(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.localteams
    ADD CONSTRAINT localteams_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.localteams
    ADD CONSTRAINT localteams_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.measures
    ADD CONSTRAINT measures_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.measures
    ADD CONSTRAINT measures_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.municipalities
    ADD CONSTRAINT municipalities_localteam_id_foreign FOREIGN KEY (localteam_id) REFERENCES public.localteams(id);

ALTER TABLE ONLY public.municipalities
    ADD CONSTRAINT municipalities_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.municipalities
    ADD CONSTRAINT municipalities_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.ratings_measures
    ADD CONSTRAINT ratings_measures_localteam_id_foreign FOREIGN KEY (localteam_id) REFERENCES public.localteams(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.ratings_measures
    ADD CONSTRAINT ratings_measures_measure_id_foreign FOREIGN KEY (measure_id) REFERENCES public.measures(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.ratings_measures
    ADD CONSTRAINT ratings_measures_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.ratings_measures
    ADD CONSTRAINT ratings_measures_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id) ON DELETE SET NULL;

```

Insert directus users:
```
INSERT INTO public.directus_users (id, first_name, last_name, email, password, location, title, description, tags, avatar, language, tfa_secret, status, role, token, last_access, last_page, provider, external_identifier, auth_data, email_notifications, appearance, theme_dark, theme_light, theme_light_overrides, theme_dark_overrides) VALUES ('5e2399d0-e73f-4f01-b4c0-456d6ce949e1', 'Frontend', NULL, 'frontend@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'active', '657bd412-cc85-4c3d-9f78-a8a3114e178f', '1182a82130b5024656e50223e9200e87', NULL, NULL, 'default', NULL, NULL, true, NULL, NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
```

Inserts local teams:
```
INSERT INTO public.localteams (id, user_created, user_updated, admin_id, date_created, date_updated, internal_comment, municipality_name, name, slug, status) VALUES ('7d727861-528f-428b-96ed-db507ea115c0', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '5e2399d0-e73f-4f01-b4c0-456d6ce949e1', '2024-10-12 17:29:05.574+00', NULL, NULL, 'Leipzig', 'Code for Leipzig', NULL, 'draft') ON CONFLICT DO NOTHING;
```

Inserts municipal:
```
INSERT INTO public.municipalities (user_created, user_updated, localteam_id, date_created, date_updated, description, geolocation, mayor, municipality_type, name, party_mayor, percantage_rated, place, population, score_ann, score_bh, score_cpma, score_energy, score_iec, score_total, score_transport, slug, state, status, id) VALUES ((SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), '2024-10-12 17:52:33.289+00', '2024-10-12 18:19:25.95+00', NULL, '0101000020E6100000807B62BFCBBF2840C8FF7DBF96AB4940', 'Burkhard Jung', 'big_city', 'Leipzig', 'SPD', 0.00, -1, 628718, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 'leipzig', 'Sachsen', 'draft', '4a2c2de3-0a7d-46ea-a36e-bd7544413a86') ON CONFLICT DO NOTHING;
```

Inserts measures:
```
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('3436b481-c6d6-4e86-9869-511c80b7461b', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.829+00', '2024-10-12 18:19:25.132+00', NULL, '<p class="p1">Die Kommune bietet (kostenlose) Beratungsangebote f&uuml;r Landwirt*innen zur Umstellung auf &ouml;kologische/regenerative Landwirtschaft und Unterst&uuml;tzung bei Suche/Beantragung von F&ouml;derung(en) an.</p>', NULL, NULL, '<p>Folgende Formen der Beratung:&nbsp;</p>
<ul>
<li>Beratungsangebote auf der Website der Kommune &nbsp;</li>
<li>Beratungsangebote/Events werden durch Stadt veranstaltet oder finden in R&auml;umen der Stadt statt. Das Angebot selbst kann auch von externen Anbietern sein. &nbsp;</li>
<li>Die Stadt bewirbt &ouml;kologisch wirtschaftende Landwirte, z. B. indem sie aufzeigt, wo man deren Produkte kaufen kann &nbsp; &nbsp;</li>
</ul>
<p><strong>Gelb</strong> &ndash; 1 von den obigen 3 werden umgesetzt</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; 2 von den obigen 3 werden umgesetzt</p>
<p><strong>Gr&uuml;n</strong> &ndash; 3 von den obigen 3 werden umgesetzt</p>', NULL, NULL, NULL, NULL, '<p>Die Beratungsangebote sind auf der Website der Kommune auffindbar. Der Hinweis zum Kauf regionaler, &ouml;kologischer landwirtschaftlicher Produkte ist auf der kommunalen Website zu finden, z. B. unter der Rubrik Bio-/&Ouml;ko-H&ouml;fe oder &auml;hnliches.</p>', '2', '3', 2, NULL, 'Beratungsangebote zur Umstellung auf ökologische Landwirtschaft', NULL, 'ann', 'beratungsangebote-zur-umstellung-auf-oekologische-landwirtschaft', 'published', NULL, 7) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('c7a49e41-23fb-4d32-b70d-a86921927fc5', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.881+00', '2024-10-12 18:19:25.196+00', '<p class="p1">Es wird die Nennleistung (kWh) aller WKA auf dem Gebiet der Kommune zusammengerechnet. Sollte die Kommune au&szlig;erhalb ihres Stadtgebiets noch weitere WKA besitzen (zB bei gr&ouml;&szlig;eren St&auml;dten der Fall), dann werden diese dazugez&auml;hlt. Wenn nicht auffindbar, werden nur die WKA auf dem Gebiet der Kommune gez&auml;hlt.</p>', '<p class="p1">Es geht um die Summe aller WKA die im Stadtgebiet sind, sowie zus&auml;tzlich alle WKA im Besitz der Stadt.</p>', NULL, NULL, '<p><strong>Rot</strong> &ndash; Keine WKA oder insgesamt &lt; 350 Watt pro EW &nbsp; &nbsp;</p>
<p><strong>Gelb</strong> &ndash; Gesamte Nennleistung &gt; 350 Watt pro EW &nbsp; &nbsp;</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Gesamte Nennleistung &gt; 900 Watt pro EW &nbsp; &nbsp;</p>
<p><strong>Gr&uuml;n</strong> &ndash; Gesamte Nennleistung &gt; 1500 Watt pro EW</p>', NULL, NULL, NULL, NULL, '<p>Auf diese Karte gehen und die kWh der WKA im Gebiet der Kommune zusammenrechnen: <a href="https://wind-turbine.com/tools/wkamap" target="_blank" rel="noopener">https://wind-turbine.com/tools/wkamap</a></p>
<p>Die Grenzen der Kommune sind dort leider nicht angezeigt, ggf. auf Google Maps die Grenzen nachschauen und danebenlegen. Wir arbeiten an besseren Datenquellen</p>', '3', '5', 5, NULL, 'Windkraftanlagen und Windparks der Kommune', NULL, 'energy', 'windkraftanlagen-und-windparks-der-kommune', 'published', NULL, 100) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('0d8f5cb3-70b0-4588-98fd-e6d84e2e30b6', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.79+00', '2024-10-12 18:19:25.093+00', NULL, '<p>Aktivierung und Motivation von Unternehmer*innen, Energiewende und Klimaneutralit&auml;t im Unternehmen zu verankern&nbsp;</p>', NULL, NULL, '<p><strong>Rot</strong> &ndash; keine Beratungsangebote &nbsp; &nbsp;</p>
<p><strong>Gelb</strong> &ndash; Die Kommune verlinkt auf ihrer Webseite aktiv Beratungsangebote zur Klimaneutralit&auml;t &nbsp; &nbsp;</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Die Kommune bewirbt UND bezuschusst Beratungsangebote zur Klimaneutralit&auml;t &nbsp; &nbsp;</p>
<p><strong>Gr&uuml;n</strong> &ndash; Die Kommune organisiert eigene Beratungsangebote &nbsp;im Rathaus oder an anderen leicht zug&auml;nglichen Orten in der Kommune. Das Angebot kann auch von externen Anbietern sein (z. B. IHK, Handwerkskammer, Netzagentur &hellip;) oder von der Wirtschaftsf&ouml;rderung der Stadt.</p>', NULL, NULL, NULL, NULL, '<p>Website der Stadt und Stadtwerke bietet Hinweise zu Energieberater*innern und Energieberatungsagenturen und Unterst&uuml;tzung bei Veranstaltungen zur Energiewende/Klimaneutralit&auml;t oder die Stadt f&uuml;hrt selbst solche Veranstaltungen durch</p>', '2', '2', 2, NULL, 'Beratungsangebote zur Energiewende', NULL, 'energy', 'beratungsangebote-zur-energiewende', 'published', NULL, 5) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('1075a098-8e3e-4fd6-adc0-59e71b1de5c4', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.795+00', '2024-10-12 18:19:25.105+00', NULL, '<p>Job-Ticket &amp; Dienstr&auml;der mindestens subventioniert f&uuml;r alle hauptamtlichen Mitglieder der Verwaltung &ndash; private Nutzung explizit erlaubt. Statt Dienstr&auml;dern k&ouml;nnen auch Abos f&uuml;r Leihr&auml;der angeboten werden.</p>', NULL, NULL, '<p><strong>Gelb</strong> &ndash; Es gibt einen Beschluss zum Angebot von einem kostenlosen Dienstrad, Deutschlandticket oder Bundesland-Ticket (z.B. NRW-Ticket), aber dieser wurde noch nicht umgesetzt bzw. nur ein Teil der Hauptamtlichen hat diese M&ouml;glichkeit.</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Es gibt f&uuml;r alle Hauptamtlichen Mitglieder der Verwaltung die M&ouml;glichkeit auf ein kostenloses Deutschlandticket oder Bundesland-Ticket (z.B. NRW-Ticket)<br>ODER<br>Es gibt f&uuml;r alle Hauptamtlichen Mitglieder der Verwaltung die M&ouml;glichkeit auf ein kostenloses Dienstrad/Leihrad-Abo&nbsp;</p>
<p><strong>Gr&uuml;n</strong> &ndash; Es gibt f&uuml;r alle Hauptamtlichen Mitglieder der Verwaltung die M&ouml;glichkeit auf ein kostenloses Deutschlandticket UND ein kostenloses Dienstrad/Leihrad-Abo. Ein Bundesland-Ticket (wie z.B. NRW-Ticket) reicht f&uuml;r diese Stufe nicht aus.</p>', NULL, NULL, NULL, NULL, '<p>Website der Kommune. Wenn auf der Website nichts dazu &ouml;ffentlich aufzufinden ist, gibt es auch keine Punkte.</p>', '3', '1', 1, NULL, 'Mobilitätsangebote für die Verwaltung', NULL, 'cpma', 'mobilitaetsangebote-fuer-die-verwaltung', 'published', NULL, 5) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('34d61bee-063c-4b38-af88-ffe047b4d080', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.834+00', '2024-10-12 18:19:25.133+00', NULL, '<p class="p1">F&uuml;r eine gesunde und klimafreundliche Ern&auml;hrung erfolgt eine Umstellung auf &ouml;kologisch angebaute vegetarisch Ern&auml;hrung in der &ouml;ffentlichen Verpflegung: Kantinen, Mensen, Schulen, Kitas, kommunale Krankenh&auml;user.<br>Es gibt eine finanzielle Unterst&uuml;tzung von sozial benachteiligten Personengruppen durch die Kommune.</p>', NULL, NULL, '<p><strong>Gelb</strong>:&nbsp;Es existiert ein vegetarisches Angebot in 75 % der &ouml;ffentlichen Versorgung, dies ist aber entweder keine vollwertige Mahlzeit (sondern nur ein Snack o.&auml;.)&nbsp;<strong>ODER</strong> das vegetarische Angebot ist vollwertig, aber teurer als vergleichbare nicht-vegetarische Angebote</p>
<p><strong>Hellgr&uuml;n</strong>:&nbsp;Es existiert bei allen &ouml;ffentlichen Veranstaltungen / Kantinen eine vollwertige, preisgleiche vegetarische Option. Es gibt eine finanzielle Unterst&uuml;tzung von sozial benachteiligten Personengruppen durch die Kommune.</p>
<p><strong>Gr&uuml;n</strong>:&nbsp;Wie Hellgr&uuml;n, aber das Essen ist zus&auml;tzlich gr&ouml;&szlig;tenteils Bio / &ouml;kologisch angebaut und von lokalen/regionalen Lieferanten <strong>ODER</strong> es gibt ausschlie&szlig;lich vegetarische Angebote. Es gibt eine finanzielle Unterst&uuml;tzung von sozial benachteiligten Personengruppen durch die Kommune.</p>', NULL, NULL, NULL, NULL, '<p class="p1">Stadtratsbeschluss und Website der Stadt bzw. Schulen&nbsp;und Kantinen selbst. F&uuml;r gr&ouml;&szlig;ere Kommunen kann durch die Vielzahl der Einrichtungen die &Uuml;berpr&uuml;fung sehr komplex sein, deshalb sollte dort auf die Stadtratsbeschl&uuml;sse zur&uuml;ckgegriffen werden. Bei kleineren Kommunen k&ouml;nnen auch manuell alle Kantinen der Kommune &uuml;berpr&uuml;ft werden, falls kein Beschluss o.&auml;. auffindbar ist. Wenn keine Kantinen existieren, z&auml;hlen auch Veranstaltungen der Kommune, bei denen Essen angeboten wird.</p>', '2', '4', 3, NULL, 'Umstellung auf ökologisch angebaute vegetarisch Ernährung in öffentlicher Verpflegung', 'Metrik (Rot) - 0% des Scores:

Metrik (Gelb) - 33% des Scores: Es existiert ein vegetarisches Angebot, dies ist aber entweder keine vollwertige Mahlzeit (sondern nur ein Snack o.ä.) ODER das vegetarische Angebot ist vollwertig, aber teurer als vergleichbare nicht-vegetarische Angebote

Metrik (Hellgrün) - 67% des Scores: Es existiert bei allen öffentlichen Veranstaltungen / Kantinen eine vollwertige, preisgleiche vegetarische Option

Metrik (Grün) - 100% des Scores: Wie Hellgrün, aber das Essen ist zusätzlich größtenteils Bio / ökologisch angebaut ODER ausschließlich vegetarisches Angebot', 'ann', 'umstellung-auf-oekologisch-angebaute-vegetarisch-ernaehrung-in-oeffentlicher-verpflegung', 'published', '<p><span style="font-size: 11pt; font-family: Fira Sans,Arial; font-style: normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Stadtratsbeschluss und Website der Stadt bzw. Schulen  und Kantinen selbst&quot;}" data-sheets-userformat="{&quot;2&quot;:10753,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0},&quot;16&quot;:11}">Stadtratsbeschluss und Website der Stadt bzw. Schulen und Kantinen selbst;&nbsp;<span style="font-size: 15px; color: #000000; font-weight: normal; text-decoration: none; font-family: ''docs-Calibri''; font-style: normal; text-decoration-skip-ink: none;"> Verpflegungs-/ Kantinenpl&auml;ne der entsprechenden Einrichtungen &uuml;berpr&uuml;fen</span><br></span></p>', 20) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('65d2a510-a60e-4991-9d06-889d12665b6e', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.844+00', '2024-10-12 18:19:25.144+00', NULL, '<p>Umstellung aller Linienbusse auf Elektro</p>', NULL, NULL, '<p><strong>Rot</strong> &ndash; keine &ouml;ffentliche Information dazu</p>
<p><strong>Gelb</strong> &ndash; Beschluss vollst&auml;ndige Elektrifizierung bis sp&auml;testens 2035</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Beschluss vollst&auml;ndige Elektrifizierung bis sp&auml;testens 2030 und Umsetzung begonnen</p>
<p><strong>Gr&uuml;n</strong> &ndash; Alle Linienbusse sind elektrisch. Sollte es alternative klimaneutrale Antriebe (z.B. Wasserstoff) geben, werden diese ebenfalls gez&auml;hlt, auch wenn sie im Vergleich zu Elektromobilit&auml;t suboptimal sind.</p>', NULL, NULL, NULL, NULL, '<p>Website der Verkehrsgesellschaft. Sollte es mehrere &auml;hnlich gro&szlig;e Verkehrsgesellschaften geben, m&uuml;ssen alle die Metriken erf&uuml;llen. Wenn eine Verkehrsgesellschaft (fast) alle Linienbusse auf dem Gebiet der Kommune bereitstellt, muss nur diese bewertet werden.</p>', '4', '2', 3, NULL, 'Elektrifizierung ÖPNV', NULL, 'transport', 'elektrifizierung-oepnv', 'published', NULL, 30) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('6df90561-21ae-4245-b87b-630752ddb4f3', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.85+00', '2024-10-12 18:19:25.164+00', NULL, '<p>Es soll in der Kommune eine B&uuml;rgerenergiegenosschenschaft geben, welche sich an Projekten beteiligen kann und auch eigenst&auml;ndig Projekte starten k&ouml;nnte.</p>', NULL, NULL, '<p><strong>Gelb</strong> &ndash; Es gibt zwar noch keine B&uuml;rgerenergiegenossenschaft, aber die Kommune bietet Beratungsangebote und/oder finanzielle/rechtliche Unterst&uuml;tzung f&uuml;r die Gr&uuml;ndung an &nbsp; &nbsp;</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Es gibt eine B&uuml;rgerenergiegenossenschaft, die allerdings noch kein Projekt umgesetzt hat&nbsp;</p>
<p><strong>Gr&uuml;n</strong> &ndash; Es gibt eine B&uuml;rgerenergiegenosschenschaft mit mindestens einem umgesetzten Projekt</p>', NULL, NULL, NULL, NULL, '<p>Website der Stadt f&uuml;r Beratungsangebote; Falls es eine B&uuml;rgerenergiegenossenschaft schon gibt, sollte sie leicht &uuml;ber zB Google aufzufinden sein oder hier: <a href="https://www.energiegenossenschaften-gruenden.de/energiegenossenschaften-und-projektentwickler-suchen.html" target="_blank" rel="noopener">https://www.energiegenossenschaften-gruenden.de/energiegenossenschaften-und-projektentwickler-suchen.html</a></p>', '2', '2', 5, NULL, 'Bürgerenergiegenossenschaften', NULL, 'energy', 'buergerenergiegenossenschaften', 'published', NULL, 20) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('aa71c8c2-221e-40fb-805e-4e9775be7db4', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.867+00', '2024-10-12 18:19:25.188+00', NULL, '<p class="p1">Stadtwerke oder Abwasser-Zweckverb&auml;nde sollen ihre Kl&auml;ranlagen energieautark betreiben.</p>', '<p>Die Kl&auml;ranlage ist meist der gr&ouml;&szlig;te kommunale Stromverbraucher. SEIBERT-ERLING, 2007 nennt als typischen Anteil 31 % am Stromverbrauch einer Kommune, also mehr noch als Stra&szlig;enbeleuchtung (25 %) und Schulen (24 %). Durch entsprechende Optimierung lassen sich 40 bis 60 % des Strombezugs einer Kl&auml;ranlage einsparen MITSDOERFFER &amp; CHRIST, 2008.&nbsp;<a href="https://www.sieker.de/fachinformationen/abwasserbehandlung/article/beispiele-225.html" target="_blank" rel="noopener">https://www.sieker.de/fachinformationen/abwasserbehandlung/article/beispiele-225.html</a> (abgerufen 8.4.2024, 13 Uhr)</p>', NULL, '<p><strong>Rot</strong> &ndash; kein Beschluss zum energieautarken Betrieb der Kl&auml;ranlagen</p>
<p><strong>Gelb</strong> &ndash; Beschluss zum Umbau der Energieversorgung (komplett oder in Teilen) des Kl&auml;rwerkes ist aufgrund einer Wirtschaftlichkeitsberechnung gef&auml;llt. Die entsprechenden&nbsp;Mittel sind im Haushalt eingestellt.</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; F&ouml;rdermittel sind beantragt, bewilligt, Leistungen ausgeschrieben.</p>
<p><strong>Gr&uuml;n</strong> &ndash; Investitionen haben zu einem (rechnerisch) autarken Betrieb der Kl&auml;ranlage gef&uuml;hrt.</p>', NULL, NULL, NULL, NULL, '<ul>
<li><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Ank&uuml;ndigung auf Website der Stadt oder der Webseite der Kl&auml;rwerke /  kommunale Beschl&uuml;sse im Ratsinformationssystem nachlesen&quot;}" data-sheets-userformat="{&quot;2&quot;:2561,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}}">Ank&uuml;ndigung auf Website der Stadt oder der Webseite der Kl&auml;rwerke, Abwasser-Zweckverb&auml;nde</span></li>
<li><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Ank&uuml;ndigung auf Website der Stadt oder der Webseite der Kl&auml;rwerke /  kommunale Beschl&uuml;sse im Ratsinformationssystem nachlesen&quot;}" data-sheets-userformat="{&quot;2&quot;:2561,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}}">kommunale Beschl&uuml;sse im Ratsinformationssystem nachlesen</span></li>
</ul>', '3', '2', 5, NULL, 'Energieautarker Betrieb von Kläranlagen ', NULL, 'iec', 'energieautarker-betrieb-von-klaeranlagen', 'published', '<p>Ank&uuml;ndigung auf Website der Stadt oder der Webseite der Kl&auml;rwerke oder kommunale Beschl&uuml;sse im Ratsinformationssystem nachlesen, bzw. beim Abwasser(-zweck)verband nachschauen</p>', 50) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('285b87a3-bf02-4898-a890-b2c68ec0c10c', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.825+00', '2024-10-12 18:19:25.124+00', NULL, '<p>Kostenlose Fahrradabstellm&ouml;glichkeiten an Bahnh&ouml;fen, Busbahnh&ouml;fen und weiteren gro&szlig;en &Ouml;PNV-Knotenpunkten</p>', NULL, NULL, '<p><strong>Rot</strong> &ndash; Es gibt keinen Plan und keine Fahrradabstellanlagen &nbsp; &nbsp;</p>
<p><strong>Gelb</strong> &ndash; Es wurde ein Beschluss gefasst, an den meisten oder allen (Bus-)bahnh&ouml;fen und &Ouml;PNV-Knotenpunkten witterungsgesch&uuml;tzte Fahrradabstellanlagen zu installieren. Bei kleinen Kommunen gibt es meistens nur ein oder zwei Knotenpunkte.</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Es gibt witterungsgesch&uuml;tzte und abschlie&szlig;bare Radabstellanlagen an den meisten oder allen wichtigen (Bus-)bahnh&ouml;fen und &Ouml;PNV-Knotenpunkten. Diese m&uuml;ssen aber bezahlt werden.</p>
<p><strong>Gr&uuml;n</strong> &ndash; Es gibt an allen wichtigen (Bus-)bahnh&ouml;fen und &Ouml;PNV-Knotenpunkten kostenlose (!), witterungsgesch&uuml;tzte und abschlie&szlig;bare Fahrradabstellanlagen. Sie enthalten auch Pl&auml;tze f&uuml;r Lastenr&auml;der/Anh&auml;nger und die M&ouml;glichkeit, Akkus aufzuladen.</p>', NULL, NULL, NULL, NULL, '<p>Stadtratsbeschluss, Website der Stadt, Website der DB und/oder lokalen ADFC fragen. In kleineren Kommunen gibt es oftmals nur ein oder zwei &Ouml;PNV-Knotenpunkte und die Umsetzung l&auml;sst sich dort besonders leicht &uuml;berpr&uuml;fen.</p>', '3', '2', 1, NULL, 'Bike and Ride', NULL, 'transport', 'bike-and-ride', 'published', NULL, 7) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('207d67d2-6f13-4b68-9c2a-657bb3092934', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.809+00', '2024-10-12 18:19:25.119+00', NULL, '<p>Die Kommune richtet selbst oder unterst&uuml;tzt die Einrichtung eines lokalen, kommunalen Klimafonds. Kommunale Akteure, wie B&uuml;rger:innen, Vereine, Unternehmen, Stiftungen usw. k&ouml;nnen sich an der Finanzierung des Fonds beteiligen und sich gleichzeitig auch um eine F&ouml;rderung aus dem Klimafonds f&uuml;r lokale Klimaschutzma&szlig;nahmen bewerben. Der Klimafonds f&ouml;rdert ausschlie&szlig;lich regionale Klimaschutzma&szlig;nahmen und ist einfach zu beantragen und abzurechnen.</p>', NULL, NULL, '<p><strong>Rot</strong> &ndash; kein lokaler Klimafonds &nbsp; &nbsp;</p>
<p><strong>Gelb</strong> &ndash; Lokaler Klimafonds ist vorhanden (egal wie gut) &nbsp; &nbsp;</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Lokaler Klimafonds ist vorhanden und aktiv bei der F&ouml;rderung regionale Klimaschutzma&szlig;nahmen. Mindestens ein Projekt befindet sich in der Realisierung. &nbsp; &nbsp;</p>
<p><strong>Gr&uuml;n</strong> &ndash; Lokaler Klimafonds ist vorhanden und mindestens zwei Projekte wurden bereits umgesetzt, F&ouml;rderungen werden weiter aktiv f&uuml;r regionale Klimaschutzma&szlig;nahmen vergeben. F&ouml;rderrichtlinien sind transparent und zug&auml;nglich.&nbsp;</p>', NULL, NULL, NULL, NULL, '<p>Website der Stadt, hier sollte der Klimafond, egal ob von der Kommune selbst oder von anderen Organisationen aufgelegt, pr&auml;sent sein. Die F&ouml;rderbestimmungen m&uuml;ssen transparent sein und lokale Klimaschutzma&szlig;nahmen f&ouml;rdern (sollten zus&auml;tzlich zu lokalen/regionalen Ma&szlig;nahmen auch weitere Ma&szlig;nahmen gef&ouml;rdert werden, betrachten wir nur den Teil des Fonds, der sich auf regionales bezieht) Das Fondmanagement muss transparent und sollte &ouml;ffentlich sein. Die vergebene F&ouml;rderungen werden offen gelegt und kontrolliert.</p>', '4', '3', 5, NULL, 'Lokaler kommunaler Klimaschutzfonds/Klimafonds', NULL, 'cpma', 'lokaler-kommunaler-klimaschutzfondsklimafonds', 'published', '<p>Ein Beispiel: <a href="https://www.stuttgart.de/leben/umwelt/klima/klimastrategie/klima-aktionsprogramm/stuttgarter-klima-innovationsfonds/" target="_blank" rel="noopener">https://www.stuttgart.de/leben/umwelt/klima/klimastrategie/klima-aktionsprogramm/stuttgarter-klima-innovationsfonds/</a></p>', 35) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('0534ae9d-f762-41a7-b7e2-ca124cd80e7f', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.773+00', '2024-10-12 18:19:25.099+00', '<p><span style="font-size: 11pt; font-family: Calibri,Arial; font-weight: normal; font-style: normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;F&uuml;r das Nicht-&Uuml;berschreiten der Klimaschutzziele und die darausfolgenden Klimaschutzma&szlig;nahmen ist es essentiell, dass in einem jeweiligen Klimaschutzkonzept berechnet wird, wie viel zus&auml;tzliches Personal ben&ouml;tigt wird um dieses umzusetzen. Es macht wenig Sinn Klimaschutzma&szlig;nahmen zu beschlie&szlig;en, wenn nur 1-2 Personen diese f&uuml;r eine gesamte Kommune umsetzen sollen. &quot;}" data-sheets-userformat="{&quot;2&quot;:15233,&quot;3&quot;:{&quot;1&quot;:0},&quot;10&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0},&quot;15&quot;:&quot;Calibri&quot;,&quot;16&quot;:11}">F&uuml;r das Nicht-&Uuml;berschreiten der Klimaschutzziele und die darausfolgenden Klimaschutzma&szlig;nahmen ist es essentiell, dass in einem jeweiligen Klimaschutzkonzept berechnet wird, wie viel zus&auml;tzliches Personal ben&ouml;tigt wird um dieses umzusetzen. Es macht wenig Sinn Klimaschutzma&szlig;nahmen zu beschlie&szlig;en, wenn nur 1-2 Personen diese f&uuml;r eine gesamte Kommune umsetzen sollen. </span></p>', '<p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;F&uuml;r das Nicht-&Uuml;berschreiten der Klimaschutzziele und die darausfolgenden Klimaschutzma&szlig;nahmen ist es essentiell, dass in einem jeweiligen Klimaschutzkonzept berechnet wird, wie viel zus&auml;tzliches Personal ben&ouml;tigt wird um dieses umzusetzen. Es macht wenig Sinn Klimaschutzma&szlig;nahmen zu beschlie&szlig;en, wenn nur 1-2 Personen diese f&uuml;r eine gesamte Kommune umsetzen sollen. &quot;}" data-sheets-userformat="{&quot;2&quot;:15233,&quot;3&quot;:{&quot;1&quot;:0},&quot;10&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0},&quot;15&quot;:&quot;Calibri&quot;,&quot;16&quot;:11}">Die Stadt soll ausreichend Personal f&uuml;r Klimaschutzmanagement anstellen und das Klimaschutzmanagement m&ouml;glichst hoch in der Hierarchie der Stadtverwaltung ansiedeln.</span></p>', NULL, NULL, '<p><strong>Gelb</strong> &ndash; Bei Kommunen</p>
<ul>
<li>bis 20.000 Einwohner - Es gibt &uuml;berhaupt eine Ansprechperson f&uuml;r Klimaschutz in der Kommune (auch wenn diese Person kein dedizierter Klimaschutzmanager ist)</li>
<li>ab 20.000 Einwohner - Es gibt einen dedizierten Klimaschutzmanager in der Kommune &nbsp; &nbsp;</li>
</ul>
<p><strong>Hellgr&uuml;n</strong> &ndash; Bei Kommunen</p>
<ul>
<li>bis 20.000 Einwohner - Es gibt einen dedizierten Klimaschutzmanager&nbsp;</li>
<li>ab 20.000 Einwohner - Es gibt einen Fachbereich, der haupts&auml;chlich f&uuml;r Klimaschutzthemen zust&auml;ndig ist &nbsp; &nbsp;</li>
</ul>
<p><strong>Gr&uuml;n</strong> &ndash; (Unabh&auml;ngig von der Gr&ouml;&szlig;e der Kommune): Es gibt ein Dezernat/Gesch&auml;ftsbereich o.&auml;. prim&auml;r f&uuml;r Klimaschutz, die im Organigramm der Kommune mindestens gleichwertig mit der Baubeh&ouml;rde oder direkt unterm (Ober-)b&uuml;rgermeister sind</p>', NULL, NULL, NULL, NULL, '<p class="p1">Informationen zu Personal und Ansprechpersonen f&uuml;r Klimaschutz finden sich auf Website der Kommune.</p>
<p class="p1">Zur Hierarchie der Verwaltung gibt es ein Organigramm auf der Website der Kommune, wo relevante Fachbereiche/Stabsstellen/Dezernate/etc. aufzufinden sind. Falls (z.B. in sehr gro&szlig;en St&auml;dten) einzelne Fachbereiche nicht im Organigramm aufgez&auml;hlt sind, k&ouml;nnt ihr schauen, ob es ein Umweltamt mit einem Fachbereich Klimaschutz gibt oder &uuml;ber eine Suchmaschine nach dem Klimaschutzmanager und dessen Abteilung suchen. Was &uuml;ber diese Methoden nicht gefunden werden kann, gibt keine Punkte.</p>', '5', '3', 5, NULL, 'Klimaschutzmanagement der Kommune', 'Wenn die Kommune kein Organigramm zur Verfügung stellt, kann sie maximal die Stufe "Hellgrün" erreichen.

Der Mehraufwand in einem Klimaschutzkonzept soll transparent veröffentlicht werden und mit den bestehenden Stellen abgeglichen werden können. Wenn dies nicht transparent kommuniziert wird, gilt diese Maßnahme als nicht erfüllt. Das Personal sollte auf der Webseite der Stadt erkennbar sein', 'cpma', 'klimaschutzmanagement-der-kommune', 'published', '<p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Ank&uuml;ndigung auf Website der Stadt oder der Webseite der Kl&auml;rwerke /  kommunale Beschl&uuml;sse im Ratsinformationssystem nachlesen&quot;}" data-sheets-userformat="{&quot;2&quot;:2561,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}}">Ank&uuml;ndigung auf Website der Stadt oder der Webseite der Kl&auml;rwerke / kommunale Beschl&uuml;sse im Ratsinformationssystem nachlesen.</span></p>
<p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Ank&uuml;ndigung auf Website der Stadt oder der Webseite der Kl&auml;rwerke /  kommunale Beschl&uuml;sse im Ratsinformationssystem nachlesen&quot;}" data-sheets-userformat="{&quot;2&quot;:2561,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}}">Der Mehraufwand in einem Klimaschutzkonzept soll transparent ver&ouml;ffentlicht werden und mit den bestehenden Stellen abgeglichen werden k&ouml;nnen. Wenn dies nicht transparent kommuniziert wird, gilt diese Ma&szlig;nahme als nicht erf&uuml;llt. Das Personal sollte auf der Webseite der Stadt erkennbar sein.</span></p>', 35) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('2707ae73-8928-4c60-822f-1c1aa6bd1575', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.82+00', '2024-10-12 18:19:25.121+00', NULL, '<p>Die Kommune soll den Menschen vor Ort strukturierte M&ouml;glichkeiten der Mitbestimmung anbieten. Das k&ouml;nnte zum Beispiel ein Klima-(bei-)rat oder ein B&uuml;rgerlenkungsausschuss sein.</p>', NULL, NULL, '<p><strong>Rot</strong> &ndash; keine Formen von B&uuml;rgerbeteiligungen oder nichts auffindbar &nbsp;</p>
<p><strong>Gelb</strong> &ndash;&nbsp; Es gibt zwar grundlegende M&ouml;glichkeiten zu B&uuml;rgerbeteiligung, aber ohne wirkliche Mitbestimmung. Das k&ouml;nnten zum Beispiel Umfragen, Online-Beteiligung o.&auml;. sein, wo die Kommune Feedback bekommt, aber es weder umsetzen noch dar&uuml;ber abstimmen muss &nbsp; &nbsp;</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Es gibt eine M&ouml;glichkeit zur B&uuml;rgerbeteiligung, die Initiativrecht/Antragsrecht haben und Empfehlungen zu Beschl&uuml;ssen aussprechen k&ouml;nnen. Das k&ouml;nnten zum Beispiel Lenkungsgruppen oder manche Varianten eines Klima(bei)rats sein. &nbsp; &nbsp;</p>
<p><strong>Gr&uuml;n</strong> &ndash; Es gibt eine M&ouml;glichkeit zur B&uuml;rgerbeteiligung mit direktem Mitbestimmungsrecht UND Initiativrecht (z.B. Klimarat mit Beschlussrecht).</p>', NULL, NULL, NULL, NULL, '<p>M&ouml;glichkeiten zur B&uuml;rgerbeteiligung sollten auf Website der Stadt aufzufinden sein oder Presseartikel zu Beschl&uuml;ssen auffindbar. B&uuml;rgerbeteiligungen leben von Transparenz und Kommunikation, also wenn nichts auffindbar ist, gibt es auch keine Punkte.</p>', '1', '4', 3, NULL, 'Bürgerbeteiligung beim Klimaschutz', NULL, 'cpma', 'buergerbeteiligung-beim-klimaschutz', 'published', NULL, 75) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('8ab0700c-dd72-4d28-8eb5-923818487c82', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.857+00', '2024-10-12 18:19:25.181+00', NULL, '<p class="p1">Die Liegenschaften der Kommune sollen einen m&ouml;glichst hohen Anteil an &Ouml;kostrom haben. Die Stadt MUSS ein Monitoring bzw. zumindest Statistiken daf&uuml;r ver&ouml;ffentlichen</p>', NULL, NULL, '<p><strong>Rot</strong> &ndash; es wird kein Energiemonitoring von der Kommune ver&ouml;ffentlicht. &nbsp; &nbsp;</p>
<p><strong>Gelb</strong> &ndash; 33 % an Liegenschaften mit qualifiziertem &Ouml;kostrom &nbsp; &nbsp;</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; 70 % der kommunalen Liegenschaften mit qualifiziertem &Ouml;kostrom &nbsp; &nbsp;</p>
<p><strong>Gr&uuml;n</strong> &ndash; Alle Liegenschaften mit qualiifiziertem &Ouml;kostrom</p>', NULL, NULL, NULL, NULL, '<p class="p1">Webseite der Stadt oder Stadtwerke muss ein Energiemonitoring zu den eigenen Liegenschaften haben und dazu Zahlen ver&ouml;ffentlichen. Wenn nichts auffindbar ist, m&uuml;ssen auch keine Punkte f&uuml;r diese Ma&szlig;nahme vergeben werden.</p>', '2', '2', 3, NULL, 'Ökostrom für kommunale Liegenschaften', NULL, 'energy', 'oekostrom-fuer-kommunale-liegenschaften', 'published', NULL, 10) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('5422470a-127a-4fd9-98fe-7981894b4ce4', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.841+00', '2024-10-12 18:19:25.142+00', '<p>Ein von der Stadt in Auftrag gegebener Plan, mit dem Ziel die Mobilit&auml;t des zu Fu&szlig; gehens und des Fahrens mit dem Fahrrad sowie dem &Ouml;P(N)V zu st&auml;rken.</p>', '<p>Erstellung eines Mobilit&auml;tskonzeptes mit Fokus auf alternativen Verkehrsmitteln</p>', NULL, NULL, '<p><strong>Gelb</strong> &ndash; Die Erstellung eines Mobilit&auml;tsplans, bei dem Rad/Fu&szlig;/&Ouml;PNV mit dem Autoverkehr mindestens gleichgestellt werden, wurde in Auftrag gegeben</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Mobilit&auml;tskonzept mit Fokus auf Rad/Fu&szlig;/&Ouml;PNV wurde erstellt</p>
<p><strong>Gr&uuml;n</strong> &ndash; ein Mobilit&auml;tskonzept mit dem genannten Ziel beschlossen und &ouml;ffentlich gemacht worden ist</p>', NULL, NULL, NULL, NULL, '<p>Mobilit&auml;tsplan auf Website der Kommune</p>', '1', '5', 5, NULL, 'Mobilitätskonzept', 'Metrik (Rot) - 0% des Scores: –

Metrik (Gelb) - 33% des Scores: Auftrag zur Erstellung eines Mobilitätsplans mit dem genannten Ziel in Auftrag gegeben wurde

Metrik (Hellgrün) - 67% des Scores: –

Metrik (Grün) - 100% des Scores: ein Mobilitätsplan mit dem genannten Ziel beschlossen und öffentlich gemacht worden ist', 'transport', 'mobilitaetskonzept', 'published', '<p>Mobilit&auml;tsplan auf Website</p>', 15) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('24f3ea69-f461-451f-abe5-e1319428ec94', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.815+00', '2024-10-12 18:19:25.121+00', NULL, '<p>Energetische Sanierung, Umbau, Modernisierung bestehender Anlagen, sowie Neubauvorhaben. Kommunale Liegenschaften beinhalten auch kommunale Wohnungsbaugesellschaften.</p>
<p>Mehr Infos zu Sanierungsquoten hier:<a href="https://www.umweltbundesamt.de/publikationen/finanzierung-von-energetischen-gebaeudesanierungen" target="_blank" rel="noopener">https://www.umweltbundesamt.de/publikationen/finanzierung-von-energetischen-gebaeudesanierungen</a></p>', NULL, NULL, '<p><strong>Gelb</strong> &ndash; Beschluss der Stadt zur Sanierung / Modernisierung ihrer Liegenschaften bei einer Sanierungsrate von mindestens 2 % &nbsp; &nbsp;</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Beschluss der Stadt zur Sanierung / Modernisierung ihrer Liegenschaften bei einer Sanierungsrate von mindestens 3.5 % &nbsp; &nbsp;</p>
<p><strong>Gr&uuml;n</strong> &ndash; Beschluss der Stadt zur Sanierung / Modernisierung ihrer Liegenschaften bei einer Sanierungsrate von mindestens 5 % UND Ver&ouml;ffentlichung eines konkreten Sanierungsplans f&uuml;r die n&auml;chsten 5 Jahre</p>', NULL, NULL, NULL, NULL, NULL, '5', '3', 5, NULL, 'Sanierung und Modernisierung kommunaler Liegenschaften ', NULL, 'bh', 'sanierung-und-modernisierung-kommunaler-liegenschaften', 'published', NULL, 50) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('1be7f2ff-5b4d-44f3-b1a9-7e93da294ce4', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.805+00', '2024-10-12 18:19:25.118+00', '<p class="p1">F&uuml;r die &Ouml;kostrom-Zeritifizierung empfehlen die Verbraucherzentrale und Umweltverb&auml;nde das &bdquo;ok-power&ldquo;-Siegel und das &bdquo;Gr&uuml;ner Strom&ldquo;-Label f&uuml;r &Ouml;kostromtarife. Beide garantieren, dass der Strom vollst&auml;ndig aus erneuerbaren Quellen stammt. Das &bdquo;Gr&uuml;ner Strom&ldquo;-Label verlangt, dass Herkunftsnachweise f&uuml;r &Ouml;kostrom aus Kraftwerken stammen, mit denen der Energieversorger auch Stromliefervertr&auml;ge abgeschlossen hat. Das verhindert das bereits beschriebene Umetikettieren von Graustrom. Beide Siegel erlauben keine Beteiligung an Atom- oder Kohlekraftwerken und stellen sicher, dass der Stromanbieter in den Ausbau erneuerbarer Energien investiert. Dazu garantieren beide Siegel, dass die Anbieter einen Beitrag zur Energiewende leisten, der &uuml;ber die gesetzliche F&ouml;rderung hinausgeht: das ok-Power-Label etwa durch den Bau neuer Anlagen, beim &bdquo;Gr&uuml;ner Strom&ldquo;-Label erfolgt das &uuml;ber festgelegte Beitr&auml;ge pro verkaufter Kilowattstunde.</p>
<p class="p2">&nbsp;</p>', '<p class="p1">Der Strommix der Stadtwerke soll einen m&ouml;glichst hohen &Ouml;kostromanteil haben. Dies muss durch eine vertrauensw&uuml;rdige Zertifizierung best&auml;tigt sein.</p>', NULL, NULL, '<p><strong>Rot</strong> &ndash; unter 25 % &nbsp; &nbsp;</p>
<p><strong>Gelb</strong> &ndash; Mindestens 25 % Erneuerbare Energien, nachdem der Anteil "Erneuerbare Energien, gef&ouml;rdert durch EEG-Umlage" rausgerechnet wurde &nbsp; &nbsp;</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Mindestens 50 % Erneuerbare Energien, nachdem der Anteil "Erneuerbare Energien, gef&ouml;rdert durch EEG-Umlage" rausgerechnet wurde &nbsp; &nbsp;</p>
<p><strong>Gr&uuml;n</strong> &ndash; Mindestens 75 % Erneuerbare Energien, nachdem der Anteil "Erneuerbare Energien, gef&ouml;rdert durch EEG-Umlage" rausgerechnet wurde</p>', NULL, NULL, NULL, NULL, '<p class="p1">Auf der Website der Stadtwerke MUSS eine "Stromkennzeichnung" vorhanden sein (gesetzlich verpflichtend). Dort steht dann ein simples Diagramm &uuml;ber die Herkunft des Stroms im Strommix.</p>
<p class="p1">Die &Ouml;kostromzertifizierung wird auch auf der Website der Stadtwerke aufzufinden sein (wenn sie eine haben).</p>
<p class="p1"><strong>Hinweis:&nbsp;</strong>Bitte die Quelle/Link der Zertifizierung mit angeben.</p>
<p class="p1">WICHTIG: Die Kategorie "Erneuerbare Energien, gef&ouml;rdert durch EEG-Umlage" beschreibt NICHT tats&auml;chliche erneuerbare Energien im Strommix und muss bei der Bewertung rausgerechnet werden! Mehr Details und Erkl&auml;rungen dazu finden sich hier: https://www.klimawende.org/themen/klimapolitik-mit-stadtwerken/</p>', '3', '5', 5, NULL, 'Ökostromanteil der Stadtwerke', 'Bitte die Quelle/Link der Zertifizierung mit angeben.', 'energy', 'oekostromanteil-der-stadtwerke', 'published', '<p class="p1">Wenn die Kommune kein eigenes Stadtwerk hat, wird das beliefernde Stadtwerk (z.B. des Kreises oder der anliegenden Gro&szlig;stadt) gez&auml;hlt. Sollte eine Kommune von mehreren Stadtwerken in &auml;hnlichem Umfang beliefert werden, dann ist der Durchschnitt der beiden Stromkennzeichnungen zu nutzen, sonst einfach das Stadtwerk, was die Kommune gr&ouml;&szlig;tenteils beliefert.</p>', 200) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('174a0533-d624-4c87-9489-59921f3659d7', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.8+00', '2024-10-12 18:19:25.102+00', NULL, '<p>Es existiert ein runder Tisch zwischen Kommune und Vertretung von lokaler Industrie, Handwerk und Wirtschaft. Bei diesem runden Tisch m&uuml;ssen</p>
<ul>
<li>die Themenkomplexe Energiewende, Klimaschutz &amp; Nachhaltigkeit vorkommen und&nbsp;</li>
<li>Berichte &uuml;ber Ergebnisse ver&ouml;ffentlicht werden.&nbsp;</li>
</ul>
<p>Bei sehr kleinen Kommunen (&lt;5000 EW) sollte diese Ma&szlig;nahme sehr gro&szlig;z&uuml;gig bewertet werden.</p>', NULL, NULL, '<p><strong>Gelb</strong> &ndash; Findet mindestens j&auml;hrlich statt und zumindest kleine Ma&szlig;nahmen/Projekte zu Nachhaltigkeitsthemen sind in den Berichten dokumentiert</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Mindestens halbj&auml;hrliche Berichte, konkrete relevante Ma&szlig;nahmen zu Nachhaltigkeit sind dem Bericht zu entnehmen und werden auch umgesetzt. Der Umbau zur Klimaneutralit&auml;t von lokaler Industrie, Handwerk und Wirtschaft wird als Ziel genannt und plausible Ma&szlig;nahmen zur Erreichung davon festgelegt. Der Gro&szlig;teil der Betriebe hat Selbstverpflichtungen zur Klimaneutralit&auml;t mit Jahreszahlen von 2045 oder fr&uuml;her</p>
<p><strong>Gr&uuml;n</strong> &ndash; Mindestens halbj&auml;hrliche Berichte, mehrere konkrete Projekte daraus befinden sich in der Umsetzung. Der Umbau zur Klimaneutralit&auml;t von lokaler Industrie, Handwerk und Wirtschaft wird als &uuml;bergeordnetes Ziel angestrebt und plausible Ma&szlig;nahmen zur Erreichung davon festgelegt. Der Gro&szlig;teil der Betriebe hat Selbstverpflichtungen zur Klimaneutralit&auml;t mit Jahreszahlen von 2035 oder fr&uuml;her</p>', NULL, NULL, NULL, NULL, '<p class="p1">Website der IHK oder Kommune und Einladung zu den Runden Tischen ansehen, ob die Kriterien erf&uuml;llt werden, d.h. die Themenkomplexe Energiewende, Klimaschutz &amp; Nachhaltigkeit vorkommen</p>
<p class="p1">Weiterhin sollten die Ergebnisse ver&ouml;ffentlich werden.</p>', '1', '4', 3, NULL, 'Runde Tische der Kommune mit lokaler Industrie, Handwerk und Wirtschaft zu Nachhaltigkeitsthemen', NULL, 'iec', 'runde-tische-der-kommune-mit-lokaler-industrie-handwerk-und-wirtschaft-zu-nachhaltigkeitsthemen', 'published', NULL, 15) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('3502aa6e-1bc3-48c5-b281-d6d9ec7577ae', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.838+00', '2024-10-12 18:19:25.142+00', NULL, '<p>Die Kommune hat einen konkreten Plan mit Zielen, Jahreszahlen und Ma&szlig;nahmen aufgestellt, um ihre Fernw&auml;rmenetze zu Dekarbonisieren. Dies k&ouml;nnte z.B. im Rahmen der kommunalen W&auml;rmeplanung geschehen. Wenn die Kommune kein Fernw&auml;rmenetz besitzt, wird diese Ma&szlig;nahme nicht bewertet.</p>', NULL, NULL, '<p><strong>Gelb</strong>&nbsp;&ndash; Plan mit Ma&szlig;nahmen und Ziel der 100%igen Dekarbonisierung, aber ohne Jahreszahl oder mit Ziel nach 2045</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Konkreter Plan mit Ma&szlig;nahmen zu 100 % Dekarbonisierung bis 2045 und Meilensteinen/Zwischenzielen &nbsp; &nbsp;</p>
<p><strong>Gr&uuml;n</strong>&nbsp;&ndash; Konkreter Plan mit Ma&szlig;nahmen zu 100 % Dekarbonisierung bis 2035 und Meilensteinen/Zwischenzielen</p>', NULL, NULL, NULL, NULL, '<p>Ank&uuml;ndigung auf Website der Stadt oder: kommunale Beschl&uuml;sse im Ratsinformationssystem nachlesen / lokale Presse</p>', '1', '5', 4, NULL, 'Transformationsplan zur Dekarbonisierung vorhandener Fernwärmenetze', NULL, 'bh', 'transformationsplan-zur-dekarbonisierung-vorhandener-fernwaermenetze', 'published', NULL, 20) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('6dc2432e-efd0-4e5a-9ac5-2480661bc11b', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.847+00', '2024-10-12 18:19:25.162+00', '<p>Durch die Entwicklung eines geeigneten Indikatorensets f&uuml;r die Umsetzung der Ma&szlig;nahmen wird regelm&auml;&szlig;ig &uuml;berpr&uuml;ft, ob die Stadt ihre Zwischenziele erreicht. Sollten einzelne Zwischenziele nicht erreicht werden, erarbeitet die Stadt Nachbesserungen, um sicherzustellen, dass ihr Gesamt THG-Budget nicht &uuml;berschritten wird, und um sp&auml;testens die n&auml;chsten Ziele wieder einzuhalten. Falls das THG-Budget in bestimmten Sektoren voraussichtlich &uuml;berschritten wird, muss dies in anderen Sektoren kompensiert und die Strategie&auml;nderung &ouml;ffentlich kommuniziert werden. Alle Vorg&auml;nge zum Klimaschutz werden regelm&auml;&szlig;ig, transparent und &uuml;bersichtlich auf der Webseite der Stadt zusammengefasst und dem Rat kommuniziert.</p>', '<p>Monitoring der beschlossenen Ma&szlig;nahmen, mit &ouml;ffentlichem Ist-Bericht der aktuellen Umsetzung Nachsteuerung meint, dass die Stadt verbindlich weitere Ma&szlig;nahmen umsetzt, sollte die Evaluation der bestehenden Ma&szlig;nahmen ergeben, dass diese f&uuml;r die Erf&uuml;llung der Klimaziele nicht ausreichen. M&ouml;gliche Sektoren zur Orientierung: Verkehr/Mobilit&auml;t, Ern&auml;hrung/Landwirtschaft/Natur, Industrie, Energie, Geb&auml;ude/W&auml;rme</p>', NULL, NULL, '<p><strong>Rot</strong> &ndash; kein Monitoring &nbsp; &nbsp;</p>
<p><strong>Gelb</strong> &ndash; unabh&auml;ngiges Monitoring nach Sektoren, Bericht unregelm&auml;&szlig;ig oder in zu gro&szlig;en Abst&auml;nden (&gt;12 Monate) &nbsp; &nbsp;</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; unabh&auml;ngiges Monitoring nach Sektoren, regelm&auml;&szlig;iger Bericht (mindestens j&auml;hrlich), aber ohne Nachsteuerungsmechanismen &nbsp; &nbsp;</p>
<p><strong>Gr&uuml;n</strong> &ndash; &Ouml;ffentlicher Ist-Bericht mindestens j&auml;hrlich mit verbindlichen Nachsteuerungsmechanismen durch unabh&auml;ngiges Monitoring nach Sektoren</p>', NULL, NULL, NULL, NULL, '<p><span style="font-size: 5pt; font-family: docs-Fira Sans,Arial; font-weight: normal; font-style: normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot; Sollte leicht auf der Website der Stadt oder via Google auffindbar sein. Datum der Ver&ouml;ffentlichung &uuml;berpr&uuml;fen!&quot;}" data-sheets-userformat="{&quot;2&quot;:14915,&quot;3&quot;:{&quot;1&quot;:0},&quot;4&quot;:{&quot;1&quot;:2,&quot;2&quot;:16777215},&quot;9&quot;:0,&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0},&quot;15&quot;:&quot;\&quot;docs-Fira Sans\&quot;&quot;,&quot;16&quot;:5}" data-sheets-textstyleruns="{&quot;1&quot;:0,&quot;2&quot;:{&quot;3&quot;:&quot;Fira Sans&quot;,&quot;4&quot;:12}}{&quot;1&quot;:111,&quot;2&quot;:{&quot;3&quot;:&quot;Fira Sans&quot;}}"><span style="font-size: 12pt; font-family: Fira Sans,Arial; font-style: normal;">&nbsp;Sollte leicht auf der Website der Stadt oder via Google auffindbar sein. Datum der Ver&ouml;ffentlichung ist zu &uuml;berpr&uuml;fen</span><span style="font-size: 5pt; font-family: Fira Sans,Arial; font-style: normal;">..</span></span></p>', '3', '3', 3, NULL, 'Monitoring der Klimaschutzmaßnahmen', 'Metrik (Rot) - 0% des Scores: –

Metrik (Hellgrün) - 67% des Scores: Öffentlicher Ist-Bericht alle 2 Jahre

Metrik (Grün) - 100% des Scores: Öffentlicher Ist-Bericht alle 12  Monate (oder öfter)', 'cpma', 'monitoring-der-klimaschutzmassnahmen', 'published', '<p><span style="font-size: 5pt; font-family: docs-Fira Sans,Arial; font-weight: normal; font-style: normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot; Sollte leicht auf der Website der Stadt oder via Google auffindbar sein. Datum der Ver&ouml;ffentlichung &uuml;berpr&uuml;fen!&quot;}" data-sheets-userformat="{&quot;2&quot;:14915,&quot;3&quot;:{&quot;1&quot;:0},&quot;4&quot;:{&quot;1&quot;:2,&quot;2&quot;:16777215},&quot;9&quot;:0,&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0},&quot;15&quot;:&quot;\&quot;docs-Fira Sans\&quot;&quot;,&quot;16&quot;:5}" data-sheets-textstyleruns="{&quot;1&quot;:0,&quot;2&quot;:{&quot;3&quot;:&quot;Fira Sans&quot;,&quot;4&quot;:12}}{&quot;1&quot;:111,&quot;2&quot;:{&quot;3&quot;:&quot;Fira Sans&quot;}}"><span style="font-size: 12pt; font-family: Fira Sans,Arial; font-style: normal;"> Sollte leicht auf der Website der Stadt oder via Google auffindbar sein. Datum der Ver&ouml;ffentlichung &uuml;berpr&uuml;fen</span><span style="font-size: 5pt; font-family: Fira Sans,Arial; font-style: normal;">.</span></span></p>', 7) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('a01b3e7d-1b26-4913-964e-fc1727539d72', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.86+00', '2024-10-12 18:19:25.182+00', NULL, NULL, NULL, NULL, '<p><strong>Rot</strong> &ndash;&nbsp; Mitglied bei Zukunft Gas</p>
<p><strong>Gelb</strong> &ndash;&nbsp; In keinem (oder beiden) der Vereine Mitglied</p>
<p><strong>Gr&uuml;n</strong> &ndash; Mitglied beim Bundesverband erneuerbare Energie und <strong>NICHT</strong> bei Zukunft Gas</p>', NULL, NULL, NULL, NULL, '<p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Mitgliederlisten durchschauen: Zukunft Gas -&gt; https://gas.info/verband-zukunft-gas/mitglieder; Bundesverband erneuerbare Energie -&gt; https://www.bee-ev.de/verband/mitglieder &quot;}" data-sheets-userformat="{&quot;2&quot;:1051137,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0},&quot;23&quot;:1}">Mitgliederlisten durchschauen: </span></p>
<ul>
<li><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Mitgliederlisten durchschauen: Zukunft Gas -&gt; https://gas.info/verband-zukunft-gas/mitglieder; Bundesverband erneuerbare Energie -&gt; https://www.bee-ev.de/verband/mitglieder &quot;}" data-sheets-userformat="{&quot;2&quot;:1051137,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0},&quot;23&quot;:1}">Zukunft Gas -&gt;&nbsp;<a href="https://gas.info/verband-zukunft-gas/mitglieder" target="_blank" rel="noopener">https://gas.info/verband-zukunft-gas/mitglieder</a>; </span></li>
<li><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Mitgliederlisten durchschauen: Zukunft Gas -&gt; https://gas.info/verband-zukunft-gas/mitglieder; Bundesverband erneuerbare Energie -&gt; https://www.bee-ev.de/verband/mitglieder &quot;}" data-sheets-userformat="{&quot;2&quot;:1051137,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0},&quot;23&quot;:1}">Bundesverband erneuerbare Energie -&gt; <a href="https://www.bee-ev.de/verband/mitglieder" target="_blank" rel="noopener">https://www.bee-ev.de/verband/mitglieder</a></span></li>
</ul>', '1', '3', 3, NULL, 'Mitglied beim Bundesverband erneuerbare Energie e.V. (anstatt Zukunft Gas)', 'Metrik (Rot) - 0% des Scores: Mitglied bei Zukunft Gas

Metrik (Gelb) - 33% des Scores: In keinem (oder beiden) der Vereine Mitglied

Metrik (Grün) - 100% des Scores: Mitglied beim Bundesverband erneuerbare Energie und NICHT bei Zukunft Gas', 'energy', 'mitglied-beim-bundesverband-erneuerbare-energie-ev-anstatt-zukunft-gas', 'published', '<p><span style="font-size: 10pt; font-family: Fira Sans,Arial; font-style: normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Mitgliederlisten durchschauen: Zukunft Gas -&gt; https://gas.info/verband-zukunft-gas/mitglieder; Bundesverband erneuerbare Energie -&gt; https://www.bee-ev.de/verband/mitglieder &quot;}" data-sheets-userformat="{&quot;2&quot;:1051137,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0},&quot;23&quot;:1}">Mitgliederlisten durchschauen: </span></p>
<p><span style="font-size: 10pt; font-family: Fira Sans,Arial; font-style: normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Mitgliederlisten durchschauen: Zukunft Gas -&gt; https://gas.info/verband-zukunft-gas/mitglieder; Bundesverband erneuerbare Energie -&gt; https://www.bee-ev.de/verband/mitglieder &quot;}" data-sheets-userformat="{&quot;2&quot;:1051137,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0},&quot;23&quot;:1}">Zukunft Gas -&gt;&nbsp;<a href="https://gas.info/verband-zukunft-gas/mitglieder" target="_blank" rel="noopener">https://gas.info/verband-zukunft-gas/mitglieder</a>; </span></p>
<p><span style="font-size: 10pt; font-family: Fira Sans,Arial; font-style: normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Mitgliederlisten durchschauen: Zukunft Gas -&gt; https://gas.info/verband-zukunft-gas/mitglieder; Bundesverband erneuerbare Energie -&gt; https://www.bee-ev.de/verband/mitglieder &quot;}" data-sheets-userformat="{&quot;2&quot;:1051137,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0},&quot;23&quot;:1}">Bundesverband erneuerbare Energie -&gt; <a href="https://www.bee-ev.de/verband/mitglieder&nbsp;" target="_blank" rel="noopener">https://www.bee-ev.de/verband/mitglieder&nbsp;</a></span></p>', 7) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('7847d74b-1e62-47d3-9a9b-f1e59222a199', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.854+00', '2024-10-12 18:19:25.178+00', '<p>Die Stadt &uuml;bernimmt einen Teil der Kosten beim Neubau von Balkonsolar-Anlagen. Dieses Angebot wird von der Stadt pr&auml;sent beworben.</p>', '<p>Die Stadt &uuml;bernimmt einen Teil der Kosten beim Neubau von Balkonsolar-Anlagen. Dieses Angebot wird von der Stadt pr&auml;sent beworben.</p>', NULL, NULL, '<p><strong>Rot</strong> &ndash; keine F&ouml;rderung &nbsp; &nbsp;</p>
<p><strong>Gelb</strong> &ndash; Beschluss und Ank&uuml;ndigung von Balkonsolarf&ouml;rderung &nbsp; &nbsp;</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; F&ouml;rderung wird bevorzugt oder ausschlie&szlig;lich an Mieter*innen vergeben &nbsp; &nbsp;</p>
<p><strong>Gr&uuml;n</strong> &ndash; F&ouml;rderung existiert, F&ouml;rdersumme ist mindestens 2&euro; pro EW (also 100k&euro; f&uuml;r eine Kommune mit 50k EW)</p>
<menu id="fcltHTML5Menu1" type="context"></menu>', NULL, NULL, NULL, NULL, '<p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Website der Stadt - da m&uuml;ssen F&ouml;rderangebote und auch Ank&uuml;ndigungen stehen&quot;}" data-sheets-userformat="{&quot;2&quot;:2561,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}}">Website der Stadt - da m&uuml;ssen F&ouml;rderangebote und auch Ank&uuml;ndigungen stehen</span></p>', '3', '1', 3, NULL, 'Förderung von Balkonsolaranlagen', 'Metrik (Rot) - 0% des Scores: keine Förderung

Metrik (Gelb) - 33% des Scores: Beschluss und Ankündigung von Balkonsolarförderung,  Mittel sind im Haushalt eingestellt. 

Metrik (Hellgrün) - 67% des Scores: Förderung existiert, Fördersumme ist mindestens 2€ pro Einwohner*in der Stadt (also 100k€ für eine Stadt von 50k)

Metrik (Grün) - 100% des Scores: Wie Hellgrün, aber bei der Vergabe werden soziale Aspekte besonders berücksichtigt, also zB nur für Mieter*innen verfügbar oder höhere Zuschüsse für einkommensschwache Haushalte', 'energy', 'foerderung-von-balkonsolaranlagen', 'published', '<p><span style="font-size: 10pt; font-family: Fira Sans,Arial; font-style: normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Website der Stadt - da m&uuml;ssen F&ouml;rderangebote und auch Ank&uuml;ndigungen stehen&quot;}" data-sheets-userformat="{&quot;2&quot;:2561,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}}">Website der Stadt - da m&uuml;ssen F&ouml;rderangebote und auch Ank&uuml;ndigungen stehen</span></p>', 10) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('a0c95cc4-4aa4-4c67-8e77-a9b90916ddac', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.864+00', '2024-10-12 18:19:25.189+00', '<p><span style="font-size: 11pt; font-family: Calibri,Arial; font-weight: normal; font-style: normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Es geht um die regelm&auml;&szlig;ige Wartung von Radwegen, um den langfristigen Bestand einer Fahrradstadt zu gew&auml;hrleisten. Dadurch wird das Fahrradfahren f&uuml;r alle dauerhaft sicher und z&uuml;gig gestaltet.&nbsp;&quot;}" data-sheets-userformat="{&quot;2&quot;:14721,&quot;3&quot;:{&quot;1&quot;:0,&quot;3&quot;:1},&quot;10&quot;:0,&quot;11&quot;:4,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0},&quot;15&quot;:&quot;Calibri&quot;,&quot;16&quot;:11}">Es geht um die regelm&auml;&szlig;ige Wartung von Radwegen, um den langfristigen Bestand einer Fahrradstadt zu gew&auml;hrleisten. Dadurch wird das Fahrradfahren f&uuml;r alle dauerhaft sicher und z&uuml;gig gestaltet.&nbsp;</span></p>', '<p>Es geht um die regelm&auml;&szlig;ige Wartung von Radwegen, um den langfristigen Bestand einer Fahrradstadt zu gew&auml;hrleisten. Dadurch wird das Fahrradfahren f&uuml;r alle dauerhaft sicher und z&uuml;gig gestaltet.&nbsp;</p>', NULL, NULL, '<p><strong>Gelb</strong> &ndash; Die Stadt hat beschlossen, dass sie M&auml;ngelmeldung implementieren will &nbsp; &nbsp;</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Die Stadt betreibt ein Online-Formular zur M&auml;ngelmeldung f&uuml;r kommunale Radwege &nbsp; &nbsp;</p>
<p><strong>Gr&uuml;n</strong> &ndash; Die Kommune betreibt ein Online-Formular zur M&auml;ngelmeldung f&uuml;r kommunale Radwege UND ein Stadtratsbeschluss, dass gemeldete M&auml;ngel innerhalb von 6 Monaten saniert werden. (Idealerweise sind auf der Seite der Kommune auch gemeldete M&auml;ngel und Sanierungsma&szlig;nahmen aufgef&uuml;hrt.)</p>', NULL, NULL, NULL, NULL, '<ul>
<li><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Online-Formular zur M&auml;ngelmeldung auf Website der Stadt, Stadtratsbeschluss im Ratsinformationssystem&quot;}" data-sheets-userformat="{&quot;2&quot;:2561,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}}">Online-Formular zur M&auml;ngelmeldung auf Website der Stadt, </span></li>
<li><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Online-Formular zur M&auml;ngelmeldung auf Website der Stadt, Stadtratsbeschluss im Ratsinformationssystem&quot;}" data-sheets-userformat="{&quot;2&quot;:2561,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}}">Stadtratsbeschluss im Ratsinformationssystem</span></li>
</ul>', '3', '1', 3, NULL, 'Systemische Mängelerfassung und Sanierung der Radwege', 'Metrik (Rot) - 0% des Scores:

Metrik (Gelb) - 33% des Scores: Die Stadt hat beschlossen, dass sie Mängelmeldung implementieren will

Metrik (Grün) - 100% des Scores: Die Stadt betreibt ein Online-Formular zur Mängelmeldung für kommunale Radwege', 'transport', 'systemische-maengelerfassung-und-sanierung-der-radwege', 'published', '<p><span style="font-size: 10pt; font-family: Fira Sans,Arial; font-style: normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Online-Formular zur M&auml;ngelmeldung auf Website der Stadt, Stadtratsbeschluss im Ratsinformationssystem&quot;}" data-sheets-userformat="{&quot;2&quot;:2561,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}}">Online-Formular zur M&auml;ngelmeldung auf Website der Stadt, Stadtratsbeschluss im Ratsinformationssystem</span></p>', 7) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('be1ead4f-39c3-44dd-9b14-86efddb39baf', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.875+00', '2024-10-12 18:19:25.193+00', '<p>Informationen:</p>
<ul>
<li><a href="https://www.umweltbundesamt.de/publikationen/innenentwicklung-organisieren-kommunale" target="_blank" rel="noopener">Fl&auml;chenressourcenmanagement</a>: Kompensation-/Ausgleichsma&szlig;nahmen</li>
<li><a href="https://de.wikipedia.org/wiki/Eingriffsregelung_in_Deutschland#Kompensationsma%C3%9Fnahmen" target="_blank" rel="noopener">Kompensationsma&szlig;nahmen</a></li>
</ul>
<p>Ausgleich (Kompensation im r&auml;umlich und funktionalem Zusammenhang): Die beeintr&auml;chtigte Funktion des Naturhaushaltes wird am selben Ort zeitnah durch eine andere Ma&szlig;nahme verbessert. Beispiel: Durch die Versiegelung eines Stra&szlig;enneubaus wird die Grundwasserneubildung verringert. In unmittelbarer N&auml;he wird eine alte Stra&szlig;e auf derselben Fl&auml;che abgebaut (R&uuml;ckbau). Dieselbe Menge Regenwasser kann versickern, die Beeintr&auml;chtigung der Funktion ist ausgeglichen.</p>', '<p>Es gibt einen Beschluss, der jegliche Neuversiegelung ausschlie&szlig;t. Bei notwendiger Neuversiegelung m&uuml;ssen Ausgleichsfl&auml;chen in unmittelbarer N&auml;he vorhanden sein. Weiterhin wird eine zus&auml;tzliche Entsiegelung angestrebt.</p>', NULL, NULL, '<p><strong>Rot</strong> &ndash; keine Beschl&uuml;sse zu Neuversiegelung und Ausgleichsma&szlig;nahmen</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; 1:1-Kompensation von Versiegelung und aktive Unterst&uuml;tzung von Entsiegelung (au&szlig;erhalb von Ausgleichsma&szlig;nahmen)</p>
<p><strong>Gr&uuml;n</strong> &ndash; Kompensation bei Neuversiegelung gr&ouml;&szlig;er als 1:1 und aktive Unterst&uuml;tzung von Entsiegelung (au&szlig;erhalb von Ausgleichsma&szlig;nahmen); Monitoring mit j&auml;hrlichem Bericht</p>', NULL, NULL, NULL, NULL, '<p>Stadtratsbeschluss; nachzulesen im Fl&auml;chennutzungsplan (evtl. Abschnitte Gr&uuml;nfl&auml;chen, Fl&auml;chen f&uuml;r Ma&szlig;nahmen zum Schutz, zur Pflege und zur Entwicklung von Boden, Natur und Landschaft (SPE-Ma&szlig;nahmen).) und/oder in den jeweiligen Bebauungspl&auml;nen</p>', '4', '4', 2, NULL, 'Verhinderung von Neuversiegelung und Entsiegelung', NULL, 'ann', 'verhinderung-von-neuversiegelung-und-entsiegelung', 'published', '<p>Die Ausgleichsma&szlig;nahmen m&uuml;ssen f&uuml;r alle Versiegelungen gelten (auch f&uuml;r Wohngebiete) und sollten von der Kommune &uuml;bernommen werden.</p>', 10) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('b5ae5b3b-5585-484d-9336-11ed5daf5694', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.87+00', '2024-10-12 18:19:25.194+00', '<p><span style="font-size: 11pt; font-family: Fira Sans,Arial; font-style: normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Keine Werbung, Falschinformationen oder pro-Gaskampagnen der Stadt oder Stadtwerke&quot;}" data-sheets-userformat="{&quot;2&quot;:15233,&quot;3&quot;:{&quot;1&quot;:1},&quot;10&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0},&quot;15&quot;:&quot;Fira Sans&quot;,&quot;16&quot;:11}">Keine Werbung, Falschinformationen oder pro-Gaskampagnen der Stadt oder Stadtwerke</span></p>', '<p class="p1">Keine Werbung, Falschinformationen oder pro-Gaskampagnen der Stadt/Stadtwerke bzw. der die Stadt zust&auml;ndigen Energieversorger</p>', NULL, NULL, '<p><strong>Rot</strong> &ndash; Greenwashing von Gas, es wird als klimaneutral verkauft o.&auml;.</p>
<p><strong>Orange</strong> &ndash; Gas wird angeboten, aber mit neutralem / faktischem Text</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Stadtwerke bieten aktiv Pakete und Programme an, wie Privatpersonen und/oder Unternehmen von Gas auf EE umsteigen k&ouml;nnen. Bsp: Leasing von W&auml;rmepumpen, zus&auml;tzliche F&ouml;rdermittel in Kooperation mit der Stadt, Unterst&uuml;tzung und Information f&uuml;r F&ouml;rdermittelmanagement in Unternehmen, F&ouml;rdermittelberatung und Abwicklung f&uuml;r Privatpersonen</p>
<p><strong>Gr&uuml;n</strong> &ndash; Entweder gar kein Gas angeboten, oder bei Gasvertr&auml;gen ein Hinweis darauf, dass dies klimasch&auml;dlich ist / ein Auslaufmodell / stattdessen W&auml;rmepumpen o.&auml;. empfohlen werden.</p>', NULL, NULL, NULL, NULL, '<p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Website der Stadwerke UND der Stadt &uuml;berpr&uuml;fen&quot;}" data-sheets-userformat="{&quot;2&quot;:513,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0}">Website der Stadwerke <strong>UND</strong> der Stadt &uuml;berpr&uuml;fen</span></p>', '1', '1', 1, NULL, 'Kein Greenwashing für Gas', 'Metrik (Rot) - 0% des Scores: Greenwashing von Gas, es wird als klimaneutral verkauft o.ä.

Metrik (Gelb) - 33% des Scores: Gas wird angeboten, aber mit neutralem / faktischem Text

Metrik (Hellgrün) - 67% des Scores: Stadtwerke bieten aktiv Pakete und Programme an, wie Privatpersonen und/oder Unternehmen von Gas auf EE umsteigen können. Bsp: Leasing von Wärmepumpen, zusätzliche Fördermittel in Kooperation mit der Stadt, Unterstützung und Information für Fördermittelmanagement in Unternehmen, Fördermittelberatung und Abwicklung für Privatpersonen

Metrik (Grün) - 100% des Scores: Entweder garkein Gas angeboten, oder bei Gasverträgen ein Hinweis darauf, dass dies klimaschädlich ist / ein Auslaufmodell / stattdessen Wärmepumpen o.ä. empfohlen werden', 'energy', 'kein-greenwashing-fuer-gas', 'published', '<p><span style="font-size: 10pt; font-family: Fira Sans,Arial; font-style: normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Website der Stadwerke UND der Stadt &uuml;berpr&uuml;fen&quot;}" data-sheets-userformat="{&quot;2&quot;:513,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0}">Website der Stadwerke UND der Stadt &uuml;berpr&uuml;fen</span></p>', 5) ON CONFLICT DO NOTHING;
INSERT INTO public.measures (id, user_created, user_updated, choices_rating, date_created, date_updated, description, description_about, description_benefit, description_contribution, description_evaluation_criteria, description_funding, description_implementation, description_legal, description_tutorial, description_verification, feasibility_economical, feasibility_political, impact, measure_id, name, notes, sector, slug, status, verification_description, weight) VALUES ('be6040ce-4cfd-4b21-9277-f9d467535494', (SELECT id FROM directus_users WHERE email like 'frontend@example.com‘), NULL, '1', '2024-10-12 18:19:24.877+00', '2024-10-12 18:19:25.194+00', '<p><span style="font-size: 11pt; font-family: Fira Sans,Arial; font-style: normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Es geht hier nur um STROM-Vertr&auml;ge, Gasvertr&auml;ge f&uuml;r W&auml;rme/Heizung werden hier nicht ber&uuml;cksichtigt&quot;}" data-sheets-userformat="{&quot;2&quot;:15241,&quot;3&quot;:{&quot;1&quot;:1},&quot;6&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:10855845}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;10&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0},&quot;15&quot;:&quot;Fira Sans&quot;,&quot;16&quot;:11}">Es geht hier nur um STROM-Vertr&auml;ge, Gasvertr&auml;ge f&uuml;r W&auml;rme/Heizung werden hier nicht ber&uuml;cksichtigt</span></p>', '<p class="p1">Die Stadtwerke, welche die Kommune versorgen, bieten keine neuen STROM-Vertr&auml;ge, die auf fossilen bzw. Atomstrom basieren, an. Es geht hier nur um STROM-Vertr&auml;ge, Gasvertr&auml;ge f&uuml;r W&auml;rme/Heizung werden hier nicht ber&uuml;cksichtigt</p>', NULL, NULL, '<p><strong>Rot</strong> &ndash; Es gibt keinen 100%-&Ouml;kostrom-Vertrag &nbsp; &nbsp;</p>
<p><strong>Gelb</strong> &ndash; Stadtwerke bieten 100 % &Ouml;kostrom-Vertr&auml;ge an, aber auch fossile Vertr&auml;ge &nbsp; &nbsp;</p>
<p><strong>Hellgr&uuml;n</strong> &ndash; Es werden ausschlie&szlig;lich &Ouml;kostrom-Vertr&auml;ge angeboten, es besteht aber keine Zertifizierung von einem seri&ouml;sen &Ouml;kostromlabel. &nbsp; &nbsp;</p>
<p><strong>Gr&uuml;n</strong> &ndash; Es werden ausschlie&szlig;lich 100 % &Ouml;kostrom-Vertr&auml;ge angeboten, die von einem seri&ouml;sen &Ouml;kostromlabel zertifiziert wurden (z. B. &lt;Liste einf&uuml;gen&gt;)</p>', NULL, NULL, NULL, NULL, '<p class="p1">Website der Stadtwerke - schaut ob es euch m&ouml;glich ist, dort einen Stromvertrag der nicht 100%-&Ouml;kostrom ist zu kaufen. Gewerbestrom wird hierbei nicht ber&uuml;cksichtigt.</p>', '3', '5', 4, NULL, 'Keine neuen Verträge für fossilen Strom', 'Metrik (Rot) - 0% des Scores: Stadtwerke bieten Kohle/Öl/Gas/Atom-Strom an

Metrik (Hellgrün) - 67% des Scores: Keine neuen fossilen Verträge möglich, aber Atomstrom wird angeboten

Metrik (Grün) - 100% des Scores: Keine neuen fossilen Verträge möglich (auch kein Atomstrom)', 'energy', 'keine-neuen-vertraege-fuer-fossilen-strom', 'published', '<p><span style="font-size: 10pt; font-family: Fira Sans,Arial; font-style: normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Website der Stadtwerke &quot;}" data-sheets-userformat="{&quot;2&quot;:2561,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0,&quot;14&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}}">Website der Stadtwerke </span></p>', 30) ON CONFLICT DO NOTHING;
```


Inserts measure ratings:
```
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Klimaschutzmanagement der Kommune'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.424+00', NULL, true, '0.6666', '"* https://www.leipzig.de/klimaschutz\n* Referat Nachhaltige Entwicklung und Klimaschutz seit 1. Juli 2020 mit 6 Mitarbeiter, hängt unter Umweltdezernat (neben Amt für Umweltschutz und Amt für Stadtgrün): \n    * https://www.leipzig.de/buergerservice-und-verwaltung/aemter-und-behoerdengaenge/behoerden-und-dienstleistungen/dienststelle/referat-nachhaltige-entwicklung-und-klimaschutz-38\n    * https://www.l-iz.de/politik/leipzig/2020/06/leipzigs-klimareferat-soll-am-1-juli-mit-6-6-mitarbeiter-innen-seine-arbeit-aufnehmen-335198\n    * Organigramm: https://static.leipzig.de/fileadmin/mediendatenbank/leipzig-de/Stadt/01.1_Geschaeftsbereich_OBM/12_Ref_Kommunikation/Organigramm_der_Stadtverwaltung_Leipzig.pdf\n\nZusätzliche Bemerkungen:\nDa das Referat / Umweltamt nur unter dem Umweltdezernat hängt und nur mit wenigen Mitarbeitern ausgestattet sind nur hellgrün.\n\nhttps://www.klimabuendnis.org/kommunen/klimanotstand/beispiele/leipzig.html', 'published', 'f0caef9e-183c-4400-8eb0-31f5db7fab0b') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Runde Tische der Kommune mit lokaler Industrie, Handwerk und Wirtschaft zu Nachhaltigkeitsthemen'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.424+00', NULL, true, NULL, NULL, 'draft', 'e1180bc8-13c0-4e85-9c79-f1d0037bc174') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Lokaler kommunaler Klimaschutzfonds/Klimafonds'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.433+00', NULL, true, NULL, NULL, 'draft', 'f010bc44-9e88-4a39-a6d3-9742d5608ccf') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Ökostromanteil der Stadtwerke'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.434+00', NULL, true, NULL, NULL, 'draft', '47742832-07c4-45d1-ba68-15f4f3abc68a') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Mobilitätsangebote für die Verwaltung'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.434+00', NULL, true, NULL, NULL, 'draft', 'c06c2d62-3bfc-4e6e-bb0e-aee06cd42d90') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Sanierung und Modernisierung kommunaler Liegenschaften'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.435+00', NULL, true, NULL, NULL, 'draft', '02ddacc5-dae7-460e-ba04-3104365c41a1') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Bürgerbeteiligung beim Klimaschutz'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.435+00', NULL, true, NULL, '* https://www.leipzig.de/buergerbeteiligung/\n* https://www.leipzig.de/weiterdenken\n* https://buergerbeteiligung.sachsen.de/portal/sachsen/startseite\n    * https://buergerbeteiligung.sachsen.de/portal/leipzig/beteiligung/themen?status=AKTUELLE&status=BEENDETE\n* Klimabeirat wurde September 2023 im Stadtrat beschlossen, dieser hat Vorschlagsrecht (aber kein Beschlussrecht)\n    * Neufassung Antrag - VII-A-08702-NF-03: \"Klimabeirat auf den Weg bringen\": https://ratsinformation.leipzig.de/allris_leipzig_public/vo020?VOLFDNR=2013126&refresh=false&TOLFDNR=2090909\n    * https://www.l-iz.de/politik/leipzig/2023/09/stadtrat-tagt-debatte-leipziger-klimabeirat-eskaliert-555805', 'published', '58d91e51-7dbd-420d-b0d8-eb58c7e5ae30') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Beratungsangebote zur Energiewende'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.436+00', NULL, true, NULL, '* https://www.leipzig.de/umwelt-und-verkehr/umwelt-und-naturschutz/umweltinformationszentrum-uiz\n* https://www.leipzig.de/umwelt-und-verkehr/umwelt-und-naturschutz/umweltinformationszentrum-uiz/beratung\n* https://sparcs-leipzig.info/\n* https://www.l.de/stadtwerke/empowering-leipzig/\n* https://www.leipzig.de/bauen-und-wohnen/stadtentwicklung/erneuerbare-energien\n* https://zukunft-fernwaerme.de/\n* https://www.connectedurbantwins.de/praxisbeispiele/energie-atlas-leipzig-ein-werkzeug-fuer-die-energiewende/\n* https://www.verbraucherzentrale-sachsen.de/beratungsstellen/leipzig-technisches-rathaus-energieberatung/beratungsangebote/18403\n    * persönlich Beratung ist kostenfrei, nur vor Ort kostet 30 Euro\n* nicht von der Stadt aber in diesem Kontext trotzdem interessant: https://www.energiegenossenschaft-leipzig.de/buergerstrom/\n', 'published', '9ff7dc47-3278-4377-9e1e-db539ab57704') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Umstellung auf ökologisch angebaute vegetarisch Ernährung in öffentlicher Verpflegung'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.442+00', NULL, true, NULL, NULL, 'draft', '443f2f5e-d015-4b95-914e-0321b35a9b9a') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Transformationsplan zur Dekarbonisierung vorhandener Fernwärmenetze'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.442+00', NULL, true, NULL, NULL, 'draft', '726b18b8-08b3-4d3a-adfc-6e27004c1912') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Beratungsangebote zur Umstellung auf ökologische Landwirtschaft'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.451+00', NULL, true, NULL, NULL, 'draft', 'cde5dc8c-3f7a-47ff-b380-9262b546b606') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Förderung von Balkonsolaranlagen'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.451+00', NULL, true, NULL, '* Förderrichtlinie Balkonsolaranlagen: \n    * https://www.leipzig.de/news/news/foerderrichtlinie-privater-balkon-solaranlagen-geht-in-den-stadtrat\n    * https://kundenservice-stadtwerke.l.de/hc/de/articles/11391730543378-Balkonkraftwerk-Balkon-PV-Anlage\n    * https://www.leipzig.de/buergerservice-und-verwaltung/aemter-und-behoerdengaenge/foerdermittelfinder/\n        * Fachförderrichtlinie der Stadt Leipzig zur Förderung von Stecker-Solar-Geräten: \n            * https://www.leipzig.de/buergerservice-und-verwaltung/aemter-und-behoerdengaenge/foerdermittelfinder/detailansicht-foerdermittelfinder/projekt/fachfoerderrichtlinie-der-stadt-leipzig-zur-foerderung-von-stecker-solar-geraeten\n            * https://www.leipzig.de/foerderung-stecker-solar\n                * \"Gefördert werden die Anschaffung, die Installation und Inbetriebnahme von netzgekoppelten, steckerfertigen Photovoltaikkleinanlagen mit Wechselrichter (nachfolgend Stecker-Solar-Geräte genannt). Dabei soll sich die Förderung insbesondere an Menschen mit geringem Einkommen (Leipzig-Pass Inhaber) richten, um Ihnen die Möglichkeit zu bieten, stärker am Ausbau der erneuerbaren Energien und den Klimaschutzbemühungen der Stadt Leipzig teilzuhaben.Die Geräte müssen innerhalb des Stadtgebietes der Stadt Leipzig installiert werden. Die Förderung weiterer Zielgruppen mit geringem Einkommen wird bis Mitte 2024 geprüft.\"\n            * https://www.leipzig.de/buergerservice-und-verwaltung/aemter-und-behoerdengaenge/satzungen/details/satzung/8-19\n                * https://www.leipzig.de/buergerservice-und-verwaltung/aemter-und-behoerdengaenge/satzungen/details/satzung/8-19/download\n\nZusätzliche Bemerkungen:\nEigentlich sogar eher zwischen gelb und hellgrün, weil nur bedürftige Menschen gefördert werden.\n', 'draft', '022aa10c-ed1f-48d7-825e-447c6e263e36') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Mobilitätskonzept'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.471+00', NULL, true, NULL, '* https://www.leipzig.de/umwelt-und-verkehr/verkehrsplanung/mobilitaetsstrategie-2030\n* https://www.l-iz.de/politik/leipzig/2024/04/der-stadtrat-tagte-fahrplan-mobilitatsstrategie-nachste-vier-jahre-586890\n* Mobilitätsstrategie 2030 - Leipzig. Wege schaffen: https://geoportal.leipzig.de/arcgis/apps/experiencebuilder/experience/?draft=true&id=80a3a579e0ae4925abc61112129a65c4\n* \"Mobilitätsstrategie 2030 für Leipzig\" (Nr. VI-DS-03902-NF-02 vom 27.09.2018) sowie\n* \"Mobilitätsstrategie 2030 für Leipzig – Rahmenplan zur Umsetzung\" (Nr. VII-DS-00547-NF-01 vom 15.07.2020)\n* Fortschreibung des Rahmenplans zur Umsetzung der Mobilitätsstrategie 2030 für Leipzig (Beschlussvorlage-Nr. VII-DS-09238 vom 24.04.2024)\n* https://www.leipzig.de/umwelt-und-verkehr/verkehrsplanung/mobilitaetsstrategie-2030/buergerbeteiligung\n* https://static.leipzig.de/fileadmin/mediendatenbank/leipzig-de/Stadt/02.6_Dez6_Stadtentwicklung_Bau/66_Verkehrs_und_Tiefbauamt/Mobilitaetsstrategie/Stadt-Leipzig_LVB_Mobilita-tsstrategie_barrierefrei.pdf\n', 'published', '0b365b69-3618-4f37-a059-d444d78f118c') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Windkraftanlagen und Windparks der Kommune'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.472+00', NULL, true, NULL, NULL, 'draft', 'fd38ec45-7150-4e3b-b9ac-117675759886') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Keine neuen Verträge für fossilen Strom'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.478+00', NULL, true, NULL, NULL, 'draft', 'f1aa9780-3317-49bd-b78e-8934baec2497') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Ökostrom für kommunale Liegenschaften'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.479+00', NULL, true, NULL, NULL, 'draft', '6d7df191-af62-40ef-be87-0ab0a8b90651') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Systemische Mängelerfassung und Sanierung der Radwege'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.483+00', NULL, true, NULL, NULL, 'draft', '632fa937-50ce-4342-aeb0-098eac170e28') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Elektrifizierung ÖPNV'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.486+00', NULL, true, NULL, NULL, 'draft', '626c03ec-7111-405a-8030-4e0d9f316f28') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Energieautarker Betrieb von Kläranlagen'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.541+00', NULL, true, NULL, NULL, 'draft', '98f5032b-e1ca-4193-9322-f3b880802e1e') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Bike and Ride'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.566+00', NULL, true, NULL, NULL, 'draft', 'd9be9fe5-2708-4b56-ab3b-cff886cf6ea6') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Monitoring der Klimaschutzmaßnahmen'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.589+00', NULL, true, NULL, NULL, 'draft', '6b4dd9e9-56a5-4a1a-be2c-916bf55639dd') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Kein Greenwashing für Gas'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.59+00', NULL, true, NULL, '\"100 % Ökogas aus Deutschland – zertifiziert durch KlimaInvest1\"\nhttps://www.l.de/stadtwerke/privatkunden/gas/', 'published', '7252bf11-2ac6-4abf-af55-eadf5ed79e76') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Verhinderung von Neuversiegelung und Entsiegelung'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '2', '2024-10-12 18:19:25.593+00', NULL, true, NULL, NULL, 'draft', '368ab381-49bf-4b9d-a19f-548fc9803533') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Bürgerenergiegenossenschaften'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '3', '2024-10-12 18:19:25.596+00', NULL, true, NULL, NULL, 'draft', 'e8d2cdd0-f999-46c5-a039-d989ae65b89b') ON CONFLICT DO NOTHING;
INSERT INTO public.ratings_measures (user_created, user_updated, measure_id, localteam_id, achievement, applicable, approved, choices, date_created, date_updated, measure_published, rating, source, status, id) VALUES (NULL, NULL, (SELECT id FROM measures WHERE name like 'Mitglied beim Bundesverband erneuerbare Energie e.V. (anstatt Zukunft Gas)'), (SELECT id FROM localteams WHERE name like 'Code for Leipzig'), NULL, true, true, '1', '2024-10-12 18:19:25.598+00', NULL, true, NULL, NULL, 'draft', '26946b20-c334-4719-b7b1-bfc709afaeed') ON CONFLICT DO NOTHING;

```

When run before, clean user from database
```
delete from directus_users where email = 'frontend@example.com'
```

In a new Terminal run :
```
$ cd stadt-land-klima/
$ cd bin
$ ./directus_bash.sh 
$ ./directus-cli auth:set-token
$ source .env
$ cli/import-all.sh
$ cli/import-all.sh
$ ./directus-cli auth:set-frontend-token 
```

Set token in database
```
`update directus_users set token = '<token from frontend/.env>' where email = 'frontend@example.com'`
```


Import all needs to run tiwce otherwise permission for the roles don't get apllied.
Now open http://localhost:8081 in your browser and login with the credentials provided in the .env file.
To see the frontend open http://localhost:8080.

## Start in development

```
$ cd bin
$ ./start_development.sh
```

Directus will run on port 8081 and the frontend on port 8080

Now open `http://localhost:8081` in your browser and login with the credentials provided in the .env file.
To see the frontend open `http://localhost:8080`.

## Start in production

```
$ cd bin
$ ./start_production.sh
```

Directus will run on port 9001 and the frontend on port 9000.

## Stop

```
$ cd bin
$ ./stop.sh
```

## Update on production

Update to latest commit in current branch.

```
$ cd bin
$ ./update_production.sh
```

## Directus CLI

With the custom directus-cli you can import and export configuration.

To get a list of supported commands do:

```
$ cd bin
$ ./directus_bash.sh
```

then within the directus container:

```
$ ./directus-cli --help
```

For the cli tool to access directus it needs a static token for authentication.
Create one via the directus web interface or use the following command:

```
$ ./directus-cli auth:set-token
```

This will create a token in directus and save it to the .env file.
You might have to reload the .env file in the containers shell. (e.g. with `source .env`)

### My local Directus instance is empty

If your local Directus has no schemas/roles/objects, then you need to use the Directus-CLI tool to import them. This effectively reads the .yaml-files from the code and puts them into the running directus instance.
To import all roles, you can use (more infos using the `--help` flag):
```
$ ./directus-cli import:roles
```

### I changed things locally in Directus, but I have no changes to commit?

If you created changes through the Directus-UI, they need to be exported first using the Directus-CLI tool. This effectively saves the configuration state of your local running directus instance as .yaml files.
The following command will export any changes made to the database schema:

```
$ ./directus-cli export:schema [dest]
```

The Directus-CLI has a `--help` flag to show all available exports and imports.

