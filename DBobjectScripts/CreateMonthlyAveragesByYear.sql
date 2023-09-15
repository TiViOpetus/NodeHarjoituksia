-- View: public.monthly_averages_by_year_fin

-- DROP VIEW public.monthly_averages_by_year_fin;

CREATE OR REPLACE VIEW public.monthly_averages_by_year_fin
 AS
 SELECT average_by_year_and_month.vuosi,
    month_name_lookup.fin_name,
    average_by_year_and_month.keskihinta
   FROM average_by_year_and_month,
    month_name_lookup
  WHERE average_by_year_and_month.kuukausi = month_name_lookup.month_number::numeric
  ORDER BY average_by_year_and_month.vuosi, average_by_year_and_month.kuukausi;

ALTER TABLE public.monthly_averages_by_year_fin
    OWNER TO postgres;
COMMENT ON VIEW public.monthly_averages_by_year_fin
    IS 'Monthly averages with Finnish month names';

