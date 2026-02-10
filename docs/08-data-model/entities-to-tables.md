# Entities to Tables

## Convencao de nomes

- Dominio: PT-BR em camelCase (ex.: dataNascimento)
- Banco: EN em snake_case (ex.: birth_date)
- A camada de mapeamento deve traduzir os nomes entre dominio e banco

## pets

- id
- name
- birth_date
- weight
- notes
- photo_uri

## vaccines

- id
- pet_id
- name
- application_date
- next_dose
- notes

## medications

- id
- pet_id
- name
- dosage
- interval_hours
- start_date
- end_date

## reminders

- id
- pet_id
- type
- datetime
- status

## food_stock

- id
- pet_id
- brand
- quantity_current
- quantity_initial
- purchase_date
- estimated_end

## articles

- id
- title
- content
- category
- tags
