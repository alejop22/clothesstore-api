# Clothesstore API
----
API para la compañía ficticia Clothesstore

### instructuvo para correr el proyecto:

`$ npm install`

`$ npm start`

`$ npm test`

# Documentación de la API
----
> En local el servidor corre en el puerto 3000

### Obtener los productos favoritos ruta GET:

```
https://app-clothesstore.herokuapp.com/products/favs

http://localhost:3000/products/favs

```

Este endpoint devuelve un JSON con todos los productos que hayan sido creados, con la siguiente estructura:

![](https://res.cloudinary.com/dc3i4vyci/image/upload/v1654193513/ura1ieuiyh3lz0piwpra.png)

En caso de que no haya productos el api responde con estado 404 not found y un json describiendo el error:

```json
{
    "error": "No hay ningún producto en favoritos"
}
```

### Creación de los productos ruta POST:

```
https://app-clothesstore.herokuapp.com/product/

http://localhost:3000/product/
```

Este endpoint valida los datos de entrada y crea el producto

> ### Datos de entrada obligatorios
> - __name:__ nombre del producto
> - __description:__ descripción del producto
> - __price:__ precio del producto, debe ser numerico y mayor que 0
> - __discount:__ el porcentaje de descuento del producto, debe ser numerico y mayor o igual que 0
> - __country:__ país de origen del producto, se permite solo letras y el nombre del pais completo
> - __img_front:__ imagen frontal del producto (prenda de vestir)
> - __img_back:__ imagen trasera del producto (prenda de vestir)

La estructura de los datos de entrada es la siguiente:

![](https://res.cloudinary.com/dc3i4vyci/image/upload/v1654193550/lgem4fgqlybtppp9llq5.png)

Si los datos de entrada son correctos el API responde con estado 201 created y un JSON con la siguiente estructura:

![](https://res.cloudinary.com/dc3i4vyci/image/upload/v1654193593/gkfup4sqj9n8gr7hu8vs.png)

En el caso en donde alguno de los datos de entrada sean inválidos o no existan el API responde con estado 400 bad request junto con un JSON describiendo el error

> Para Colombia y Mexico el descuento maximo es de 50%.
> Para Chile y Peru el descuento maximo es de 30%.
> Si alguna de estas condiciones o las antes mencionadas no se cumplen el API responde con estado 400 bad request.

```json
{
    "error": "Petición inválida, faltan datos"
}
```

```json
{
    "error": "Petición inválida, descuento demasiado alto para el país"
}
```

```json
{
    "error": "País no valido"
}
```

```json
{
    "error": "Datos inválidos"
}
```

### Actualización de productos ruta PUT:

```
https://app-clothesstore.herokuapp.com/product/update/:id

http://localhost:3000/product/update/:id
```
> Donde :id hace referencia al id del producto que se quiere actualizar

Este endpoint valida los datos de entrada y que el producto exista para actualizarlo

> ### Datos de entrada obligatorios
> - __price:__ precio del producto, debe ser mayor que 0
> - __discount:__ el porcentaje de descuento del producto, debe ser mayor o igual que 0

La estructura de los datos de entrada es la siguiente:

```json
{
    "price": 10000,
    "discount": 50
}
```

Si los datos de entrada son correctos y el producto existe el API responde con estado 200 OK y un JSON con la siguiente estructura:

```json
{
    "status": 200,
    "description": "El producto :id se actualizo correctamente"
}
```

En el caso en donde el producto no existe o los datos de entrada sean inválidos el API responde con estado 400 bad request junto con un JSON describiendo el error:

```json
{
    "error": "El producto :id no existe"
}
```

```json
{
    "error": "Peticion invalida, faltan datos"
}
```




