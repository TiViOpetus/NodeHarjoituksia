-- Table: public.temperature_forecast

-- DROP TABLE IF EXISTS public.temperature_forecast;

CREATE TABLE IF NOT EXISTS public.temperature_forecast
(
    "timestamp" timestamp with time zone NOT NULL,
    temperature real,
    place character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT temperature_forecast_pkey PRIMARY KEY ("timestamp", place),
    CONSTRAINT weather_station_temperature_forecast_fk FOREIGN KEY (place)
        REFERENCES public.weather_station (place) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.temperature_forecast
    OWNER to postgres;