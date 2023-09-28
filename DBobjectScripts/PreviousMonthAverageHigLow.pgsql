-- Create a view to show previous month avergae price
-- and normal price limits
CREATE View public.previous_month_average AS
SELECT keskihinta,
    yläraja,
    alaraja
FROM average_by_year_and_month
WHERE vuosi = EXTRACT(year FROM NOW()) AND
    kuukausi = EXTRACT(month FROM NOW()) - 1