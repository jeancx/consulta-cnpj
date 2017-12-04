FORMAT: 1A

# Data Structures

## Café GET (object)

+ id: `1` (number, required) - Identificador
+ created: `2017-10-11` (string, required) - Data de preparo
+ tipo_preparo (enum, required)
    + 0 (number) - Café com Leite
    + 1 (number) - Carioca
    + 2 (number) - Espresso
+ copo (enum, required)
    + 0 (number) - 50ml
    + 1 (number) - 150ml
    + 2 (number) - 300ml
+ leite: `true` (boolean, required) - Vai leite?

## Café POST (object)

+ tipo_preparo (enum, required)
    + 0 (number) - Café com Leite
    + 1 (number) - Carioca
    + 2 (number) - Espresso
+ copo (enum, required)
    + 0 (number) - 50ml
    + 1 (number) - 150ml
    + 2 (number) - 300ml
+ leite: `true` (boolean, required) - Vai leite?

## Café PUT (object)

+ copo (enum, required)
    + 0 (number) - 50ml
    + 1 (number) - 150ml
    + 2 (number) - 300ml
+ leite: `true` (boolean, required) - Vai leite?

## Café PATCH (object)

+ copo (enum, optional)
    + 0 (number) - 50ml
    + 1 (number) - 150ml
    + 2 (number) - 300ml
+ leite: `true` (boolean, optional) - Vai leite?


# Group Café

## Cafés [/cafes/]

### Listar [GET]

+ Response 200 (application/json)

    + Attributes (object)
        + results (array)
            + (Café GET)
            + (Café GET)
            + (Café GET)

### Criar [POST]

+ Request (application/json)

    + Attributes (Café POST)

+ Response 201 (application/json)

    + Attributes (Café GET)

## Café [/cafes/{id}/]

+ Parameters

    + id: `1` (number, required) - Identificador do café

### Detalhes [GET]

+ Response 200 (application/json)

    + Attributes (Café GET)

### Atualizar [PUT]

+ Request (application/json)

    + Attributes (Café PUT)

+ Response 200 (application/json)

    + Attributes (Café GET)

### Atualizar parcialmente [PATCH]

+ Request (application/json)

    + Attributes (Café PATCH)

+ Response 200 (application/json)

    + Attributes (Café GET)

### Cancelar [DELETE]

+ Response 204 (application/json)