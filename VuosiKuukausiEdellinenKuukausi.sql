-- Vuoden, kuukauden ja edellisen kuukauden erottaminen 
-- kuluvan ajanhetken aikaleimasta
SELECT EXTRACT(year FROM NOW()) AS vuosi,
	EXTRACT(month FROM NOW()) AS kuukausi,
	EXTRACT(month FROM NOW())-1 AS edellinen_kuukausi