-- Extract year, month and day for grouping average prices

SELECT EXTRACT(YEAR FROM timeslot) AS vuosi,
EXTRACT(MONTH FROM timeslot) AS kuukausi,
EXTRACT(DAY FROM timeslot) AS päivä,
AVG(price) AS keskihinta
	FROM public.hourly_price
	GROUP BY vuosi, kuukausi, päivä