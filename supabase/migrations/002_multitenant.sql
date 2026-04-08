-- Dodajemy kolumnę na tłumaczenia (JSONB)
ALTER TABLE menu_items 
ADD COLUMN IF NOT EXISTS name_translations JSONB DEFAULT '{}'::jsonb;

-- Dodajemy osobne kolumny cenowe dla poszczególnych rynków
ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS price_pln NUMERIC(10,2),
ADD COLUMN IF NOT EXISTS price_eur NUMERIC(10,2);

-- Wypełniamy nowe kolumny danymi ze starych kolumn (jako zapas / startowe dane)
UPDATE menu_items
SET 
  name_translations = jsonb_build_object('pl', name),
  price_pln = price,
  price_eur = 0.00 -- Domyślna wartość w EUR, do uaktualnienia ręcznego
WHERE price_pln IS NULL;
