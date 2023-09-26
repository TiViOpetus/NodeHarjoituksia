-- Query to get prices at timestamp greater than 2023-09-14 0:00

SELECT timeslot, price
	FROM public.hourly_price
	WHERE timeslot >= '2023-09-14T00:00:00Z'
	ORDER BY timeslot;