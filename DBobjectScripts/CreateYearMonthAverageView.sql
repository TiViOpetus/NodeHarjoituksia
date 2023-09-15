-- View: public.average_by_year_and_month

-- DROP VIEW public.average_by_year_and_month;

CREATE OR REPLACE VIEW public.average_by_year_and_month
 AS
 SELECT EXTRACT(year FROM hourly_price.timeslot) AS vuosi,
    EXTRACT(month FROM hourly_price.timeslot) AS kuukausi,
    avg(hourly_price.price) AS keskihinta
   FROM hourly_price
  GROUP BY (EXTRACT(year FROM hourly_price.timeslot)), (EXTRACT(month FROM hourly_price.timeslot));

ALTER TABLE public.average_by_year_and_month
    OWNER TO postgres;
COMMENT ON VIEW public.average_by_year_and_month
    IS 'Calculates average electricity prices for year-month basis';

