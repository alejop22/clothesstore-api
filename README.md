# Clothesstore API
----
API para la compañía ficticia Clothesstore

### instructuvo para correr el proyecto:

`$ npm install`

`$ npm start`

`$ npm test`

# Documentación de la API
----
> El servidor corre en el puerto 3000

### Obtener los productos favoritos ruta GET:

```
http://localhost:3000/products/favs
```

Este endpoint devuelve un JSON con todos los productos que hayan sido creados, con la siguiente estructura:

![](/assets/get.png)

En caso de que no haya productos el api responde con estado 404 not found y un json describiendo el error:

```json
{
    "error": "No hay ningún producto en favoritos"
}
```

### Creación de los productos ruta POST:

```
http://localhost:3000/product/
```

Este endpoint valida los datos de entrada y crea el producto

> ### Datos de entrada obligatorios
> - __name:__ nombre del producto
> - __description:__ descripción del producto
> - __price:__ precio del producto
> - __discount:__ el porcentaje de descuento del producto
> - __country:__ país de origen del producto
> - __img_front:__ imagen frontal del producto (prenda de vestir)
> - __img_back:__ imagen trasera del producto (prenda de vestir)

La estructura de los datos de entrada es la siguiente:

![](/assets/post_entry.png)

Si los datos de entrada son correctos el API responde con estado 201 created y un JSON con la siguiente estructura:

![](/assets/post.png)

En el caso donde alguno de los datos de entrada sean inválidos o no existan el API responde con estado 400 bad request y un JSON describiendo el error

> Para Colombia y Mexico el descuento maximo es de 50%.
> Para Chile y Peru el descuento maximo es de 30%.
> Si alguna de estas condiciones no se cumple el API responde con estado 400.

```json
{
    "error": "Peticion inválida, faltan datos"
}
```
o
```json
{
    "error": "Peticion inválida, descuento demasiado alto para el país"
}
```







