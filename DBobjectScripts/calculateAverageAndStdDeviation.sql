-- Query for calculating running average 
-- and standard deviation of electricity prices

SELECT AVG(price) AS hinta, STDDEV(price) AS keskihajonta
	FROM public.hourly_price;
	

