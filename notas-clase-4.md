# Despliegue de API Rest usando FL0
---

## 1. Pasos para desplegar con FL0

- Crear una cuenta con GitHub o Gmail.
- Crear un repo para el proyecto.
  - Clonar repo.
  ```bash
  git clone <repo.url>
  ```
  - Añadir el código.
  ```bash
  git push
  ```
  - **IMPORTANTE:** en el package.json debe haber un script de start. La variable de entorno *process.env.PORT* hay que crearla ya que fl0 usa esta variable.
  ```js
  "scripts": {
    "start": "node app.js"
  }
  ```
- Seleccionar el repositorio en fl0.
- Realizar una ligera configuración.
- Deploy!

## 2. Cambiar de Common JS a ESModules

En primer lugar, cambiar en el *package.json* el tipo de uso de las dependencias.

```js
// Por defecto no sale esta opción, ya que usa siempre CommonJS
"type": "module"
```

Pulsando *ctrl + .* en los módulos CJS puedes cambiar todo a ESM.
**CUIDADO** no todos los cambios se realizan correctamente.

### 2.1 Importar JSON

La importación de JSON con ESM es diferente, tenemos tres opciones:

```js
// 1. ESTO NO FUNCIONA AUN CON ESM
import movies from './movies.json' with { type: 'json' } 

// 2. Usar FS
const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')) <-- Forma de leer JSON en ESM

// 3. La más recomendada, crear un require
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const movies = require('./movies.json')
``` 

## 3. Arquitectura MVC

¿Qué es MVC?

Es una arquitectura de software basada en Modelo Vista Controlador.

- Modelo: se encarga de la lógica de la aplicación / negocio (base de datos, actualizar información, etc.).

- Vista: interfaz del usuario.

- Controlador: intermediario entre la vista y el modelo, responde a las entradas del usuario.

