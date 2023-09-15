-- Table: public.month_name_lookup

-- DROP TABLE IF EXISTS public.month_name_lookup;

CREATE TABLE IF NOT EXISTS public.month_name_lookup
(
    month_number integer NOT NULL,
    fin_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    swe_name character varying(20) COLLATE pg_catalog."default",
    eng_name character varying(20) COLLATE pg_catalog."default",
    ger_name character varying(20) COLLATE pg_catalog."default",
    tur_name character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT month_name_lookup_pkey PRIMARY KEY (month_number)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.month_name_lookup
    OWNER to postgres;

COMMENT ON TABLE public.month_name_lookup
    IS 'Gives a mont name by number';