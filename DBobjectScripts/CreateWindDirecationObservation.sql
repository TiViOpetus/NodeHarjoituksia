-- Table: public.wind_direction_observation

-- DROP TABLE IF EXISTS public.wind_direction_observation;

CREATE TABLE IF NOT EXISTS public.wind_direction_observation
(
    "timestamp" timestamp with time zone NOT NULL,
    wind_direction real,
    place character varying(80) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT wind_direction_observation_pkey PRIMARY KEY ("timestamp")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.wind_direction_observation
    OWNER to postgres;