
CREATE TABLE public.forecast (
                timestamp TIMESTAMP NOT NULL,
                place VARCHAR(50) NOT NULL,
                wind_speed REAL,
                wind_direction REAL,
                temperature REAL,
                CONSTRAINT forecast_pk PRIMARY KEY (timestamp, place)
);
COMMENT ON TABLE public.forecast IS 'FMI weather forecast for 36 hours';
COMMENT ON COLUMN public.forecast.timestamp IS 'ISO timestamp with timezone';
COMMENT ON COLUMN public.forecast.place IS 'Name of weather station';


CREATE TABLE public.observation (
                timestamp TIMESTAMP NOT NULL,
                place VARCHAR(50) NOT NULL,
                wind_speed REAL,
                wind_direction REAL,
                temperature REAL,
                CONSTRAINT observation_pk PRIMARY KEY (timestamp, place)
);
COMMENT ON TABLE public.observation IS 'Stores FMI weather observations in 10 minute intervals';
COMMENT ON COLUMN public.observation.timestamp IS 'ISO timestamp with timezone';
COMMENT ON COLUMN public.observation.place IS 'Name of weather station';
