-- Table: public.wind_speed_forecast

-- DROP TABLE IF EXISTS public.wind_speed_forecast;

CREATE TABLE IF NOT EXISTS public.wind_speed_forecast
(
    "timestamp" timestamp with time zone NOT NULL,
    wind_speed real,
    place character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT wind_speed_forecast_pkey PRIMARY KEY ("timestamp", place),
    CONSTRAINT weather_station_wind_speed_forecast_fk FOREIGN KEY (place)
        REFERENCES public.weather_station (place) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.wind_speed_forecast
    OWNER to postgres;