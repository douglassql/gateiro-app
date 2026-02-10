# Entities

## Pet
Representa um gato cadastrado na aplicação.

- id
- nome
- dataNascimento
- peso
- foto
- observacoes


## Vaccine
Registro de vacina aplicada ao pet.

- id
- petId
- nome
- dataAplicacao
- proximaDose
- observacoes


## Medication
Controle de medicamentos administrados ao pet.

- id
- petId
- nome
- dosagem
- intervaloHoras
- dataInicio
- dataFim


## Reminder
Lembretes relacionados ao cuidado do pet.

- id
- petId
- tipo (vaccine | medication | feeding | general)
- dataHora
- status


## FoodStock
Controle de estoque de ração do pet.

- id
- petId
- marca
- quantidadeAtual
- quantidadeInicial
- dataCompra
- previsaoTermino


## Article
Conteúdos educativos, dicas e FAQ.

- id
- titulo
- conteudo
- categoria
- tags
