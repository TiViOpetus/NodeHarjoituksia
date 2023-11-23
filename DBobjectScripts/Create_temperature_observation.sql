-- Table: public.temperature_observation

-- DROP TABLE IF EXISTS public.temperature_observation;

CREATE TABLE IF NOT EXISTS public.temperature_observation
(
    "timestamp" timestamp with time zone NOT NULL,
    temperature real,
    place character varying(80) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT temperature_observation_pkey PRIMARY KEY ("timestamp"),
    CONSTRAINT weather_station_temperature_observation_fk FOREIGN KEY (place)
        REFERENCES public.weather_station (place) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.temperature_observation
    OWNER to postgres;