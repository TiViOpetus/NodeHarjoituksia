--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2023-09-14 15:55:13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 19487)
-- Name: hourly_price; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hourly_price (
    timeslot timestamp with time zone NOT NULL,
    price double precision NOT NULL
);


ALTER TABLE public.hourly_price OWNER TO postgres;

--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 214
-- Name: TABLE hourly_price; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.hourly_price IS 'Electricity prices by hour';


--
-- TOC entry 221 (class 1259 OID 19520)
-- Name: average_by_weekday_num; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.average_by_weekday_num AS
 SELECT EXTRACT(isodow FROM hourly_price.timeslot) AS vpnumero,
    avg(hourly_price.price) AS avg
   FROM public.hourly_price
  GROUP BY (EXTRACT(isodow FROM hourly_price.timeslot))
  ORDER BY (EXTRACT(isodow FROM hourly_price.timeslot));


ALTER TABLE public.average_by_weekday_num OWNER TO postgres;

--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 221
-- Name: VIEW average_by_weekday_num; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON VIEW public.average_by_weekday_num IS 'Calculates an average for each weekday using ISO-weekday numbers';


--
-- TOC entry 217 (class 1259 OID 19503)
-- Name: average_by_year; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.average_by_year AS
 SELECT EXTRACT(year FROM hourly_price.timeslot) AS vuosi,
    avg(hourly_price.price) AS keskihinta
   FROM public.hourly_price
  GROUP BY (EXTRACT(year FROM hourly_price.timeslot));


ALTER TABLE public.average_by_year OWNER TO postgres;

--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 217
-- Name: VIEW average_by_year; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON VIEW public.average_by_year IS 'Average electricity prices on yearly basis';


--
-- TOC entry 219 (class 1259 OID 19511)
-- Name: average_by_year-month_day; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public."average_by_year-month_day" AS
 SELECT EXTRACT(year FROM hourly_price.timeslot) AS vuosi,
    EXTRACT(month FROM hourly_price.timeslot) AS kuukausi,
    EXTRACT(day FROM hourly_price.timeslot) AS "päivä",
    avg(hourly_price.price) AS keskihinta
   FROM public.hourly_price
  GROUP BY (EXTRACT(year FROM hourly_price.timeslot)), (EXTRACT(month FROM hourly_price.timeslot)), (EXTRACT(day FROM hourly_price.timeslot));


ALTER TABLE public."average_by_year-month_day" OWNER TO postgres;

--
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 219
-- Name: VIEW "average_by_year-month_day"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON VIEW public."average_by_year-month_day" IS 'Calculates averages to day level';


--
-- TOC entry 218 (class 1259 OID 19507)
-- Name: average_by_year_and_month; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.average_by_year_and_month AS
 SELECT EXTRACT(year FROM hourly_price.timeslot) AS vuosi,
    EXTRACT(month FROM hourly_price.timeslot) AS kuukausi,
    avg(hourly_price.price) AS keskihinta
   FROM public.hourly_price
  GROUP BY (EXTRACT(year FROM hourly_price.timeslot)), (EXTRACT(month FROM hourly_price.timeslot));


ALTER TABLE public.average_by_year_and_month OWNER TO postgres;

--
-- TOC entry 3368 (class 0 OID 0)
-- Dependencies: 218
-- Name: VIEW average_by_year_and_month; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON VIEW public.average_by_year_and_month IS 'Calculates average electricity prices for year-month basis';


--
-- TOC entry 220 (class 1259 OID 19515)
-- Name: weekday_lookup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.weekday_lookup (
    weekday_number integer NOT NULL,
    fin_name character varying(20) NOT NULL,
    swe_name character varying(20) NOT NULL,
    eng_name character varying(20) NOT NULL,
    ger_name character varying(20),
    tur_name character varying(20)
);


ALTER TABLE public.weekday_lookup OWNER TO postgres;

--
-- TOC entry 3369 (class 0 OID 0)
-- Dependencies: 220
-- Name: TABLE weekday_lookup; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.weekday_lookup IS 'Allows weekday lookup with several languages';


--
-- TOC entry 222 (class 1259 OID 19528)
-- Name: avg_price_by_weekday_name; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.avg_price_by_weekday_name AS
 SELECT weekday_lookup.fin_name AS "viikonpäivä",
    weekday_lookup.swe_name AS veckodag,
    weekday_lookup.eng_name AS weekday,
    weekday_lookup.ger_name AS wochentag,
    weekday_lookup.tur_name AS haftaici,
    round((average_by_weekday_num.avg)::numeric, 3) AS keskihinta
   FROM public.weekday_lookup,
    public.average_by_weekday_num
  WHERE ((weekday_lookup.weekday_number)::numeric = average_by_weekday_num.vpnumero)
  ORDER BY average_by_weekday_num.vpnumero;


ALTER TABLE public.avg_price_by_weekday_name OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 19495)
-- Name: current_prices; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.current_prices AS
 SELECT hourly_price.timeslot AS kello,
    hourly_price.price AS hinta
   FROM public.hourly_price
  WHERE (hourly_price.timeslot >= now())
  ORDER BY hourly_price.timeslot;


ALTER TABLE public.current_prices OWNER TO postgres;

--
-- TOC entry 3370 (class 0 OID 0)
-- Dependencies: 215
-- Name: VIEW current_prices; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON VIEW public.current_prices IS 'Shows electricity prices from now on';


--
-- TOC entry 216 (class 1259 OID 19499)
-- Name: running_average; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.running_average AS
 SELECT round((avg(hourly_price.price))::numeric, 3) AS keskihinta
   FROM public.hourly_price;


ALTER TABLE public.running_average OWNER TO postgres;

--
-- TOC entry 3371 (class 0 OID 0)
-- Dependencies: 216
-- Name: VIEW running_average; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON VIEW public.running_average IS 'Calculates average electricity price from all rows';


--
-- TOC entry 3357 (class 0 OID 19487)
-- Dependencies: 214
-- Data for Name: hourly_price; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.hourly_price VALUES ('2023-09-12 18:00:00+03', 12.5);
INSERT INTO public.hourly_price VALUES ('2023-09-12 17:00:00+03', 14.100000381469727);
INSERT INTO public.hourly_price VALUES ('2023-09-12 19:00:00+03', 13.99);
INSERT INTO public.hourly_price VALUES ('2023-09-14 13:00:00+03', 10.15);
INSERT INTO public.hourly_price VALUES ('2023-09-14 14:00:00+03', 10.5);
INSERT INTO public.hourly_price VALUES ('2023-09-14 15:00:00+03', 14.25);
INSERT INTO public.hourly_price VALUES ('2023-09-14 16:00:00+03', 14);
INSERT INTO public.hourly_price VALUES ('2023-09-14 17:00:00+03', 12.65);
INSERT INTO public.hourly_price VALUES ('2023-09-14 18:00:00+03', 10.7);
INSERT INTO public.hourly_price VALUES ('2023-09-14 19:00:00+03', 10.5);
INSERT INTO public.hourly_price VALUES ('2022-09-14 14:00:00+03', 10);
INSERT INTO public.hourly_price VALUES ('2022-09-14 15:00:00+03', 30);
INSERT INTO public.hourly_price VALUES ('2022-08-14 14:00:00+03', 10);
INSERT INTO public.hourly_price VALUES ('2022-08-14 15:00:00+03', 30);
INSERT INTO public.hourly_price VALUES ('2023-08-14 14:00:00+03', 10);
INSERT INTO public.hourly_price VALUES ('2023-08-14 15:00:00+03', 30);


--
-- TOC entry 3358 (class 0 OID 19515)
-- Dependencies: 220
-- Data for Name: weekday_lookup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.weekday_lookup VALUES (1, 'maanantai', 'måndag', 'monday', 'Montag', 'Pazartesi');
INSERT INTO public.weekday_lookup VALUES (2, 'tiistai', 'tisdag', 'tuesday', 'Dienstag', 'Sali');
INSERT INTO public.weekday_lookup VALUES (3, 'keskiviikko', 'onsdag', 'wednesday', 'Mittwoch', 'Carsamba');
INSERT INTO public.weekday_lookup VALUES (4, 'torstai', 'torsdag', 'thursday', 'Donnerstag', 'Persemble');
INSERT INTO public.weekday_lookup VALUES (5, 'perjantai', 'fredag', 'friday', 'Freitag', 'Cuma');
INSERT INTO public.weekday_lookup VALUES (6, 'lauantai', 'lördag', 'saturday', 'Samstag', 'Cumartesi');
INSERT INTO public.weekday_lookup VALUES (7, 'sunnuntai', 'söndag', 'sunday', 'Sonntag', 'Pazar');


--
-- TOC entry 3205 (class 2606 OID 19491)
-- Name: hourly_price hourly_price_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hourly_price
    ADD CONSTRAINT hourly_price_pk PRIMARY KEY (timeslot);


--
-- TOC entry 3207 (class 2606 OID 19519)
-- Name: weekday_lookup weekday_lookup_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weekday_lookup
    ADD CONSTRAINT weekday_lookup_pk PRIMARY KEY (weekday_number);


-- Completed on 2023-09-14 15:55:13

--
-- PostgreSQL database dump complete
--

