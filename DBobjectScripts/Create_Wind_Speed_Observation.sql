-- Table: public.wind_speed_observation

-- DROP TABLE IF EXISTS public.wind_speed_observation;

CREATE TABLE IF NOT EXISTS public.wind_speed_observation
(
    "timestamp" timestamp with time zone NOT NULL,
    wind_speed real,
    place character varying(80) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT wind_speed_observation_pkey PRIMARY KEY ("timestamp")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.wind_speed_observation
    OWNER to postgres;