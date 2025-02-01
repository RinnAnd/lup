# Proyecto de Gestión de Tareas

Este proyecto es una aplicación de gestión de tareas construida con NestJS en el backend y React en el frontend.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- Node.js (versión 20 o superior)
- npm (versión 7 o superior)
- PostgreSQL (versión 12 o superior)
- Docker (Opcional)

## Instalación

### Clonar el Repositorio

```sh
git clone https://github.com/RinnAnd/lup.git
cd lup
```

## Configuración del Backend
1. Navega al directorio del backend:
```sh
cd back
```
2. Instala las dependencias
```sh
npm install
```

3. Inicia instancia de base de datos PostgreSQL utilizando Docker (Opcional):
    1. Para traer la imagen de Postgres más reciente:
    ```sh
    make pull
    ```
    2. Para inicializar un contenedor con las credenciales que corresponden al .env compartido:
    ```sh
    make postgresinit
    ```
    3. Para crear la base de datos con el nombre del .env compartido:
    ```sh
    make createdb
    ```


4. Crea un archivo .env en el directorio back y agrega las siguientes variables de entorno
    - Recomiendo dejar el PORT 3025 porque es con el que trabaja el frontend y el CORS policy
```env
PORT=3025

DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=root
DB_PASSWORD=postgres
DB_NAME=todo_app
JWT_SECRET=RiDIshBRIeTi
```

5. Inicia el servidor de desarrollo:
```sh
npm start
```

#### El backend debería estar corriendo en `http://localhost:3025`

## Configuración del Frontend

1. Navega al directorio del frontend:
```sh
cd ../front
```

2. Instala las dependencias:
```sh
npm install
```

3. Inicia el servidor de desarrollo
```sh
npm run dev
```

#### El frontend debería estar corriendo en `http://localhost:5173`

## Métricas

1. Total de tareas:
    - Conocer el total de tareas permite al usuario tener una visión clara de la carga de trabajo actual y anterior. Es una métrica fundamental para evaluar la productividad y el volumen de trabajo gestionado.

2. Porcentaje de tareas completadas:
    - El porcentaje de tareas completadas es una métrica crucial para medir el progreso y la eficiencia del usuario en la gestión de sus tareas. Un alto porcentaje de tareas completadas sugiere una buena gestión del tiempo y la capacidad de finalizar tareas, mientras que un bajo porcentaje puede indicar la necesidad de mejorar la planificación y ejecución.

3. Porcentaje de tareas en progreso:
    - El porcentaje de tareas en progreso ayuda a identificar la cantidad de trabajo pendiente y permite al usuario priorizar y organizar mejor sus tareas. Es útil para entender la carga de trabajo actual y ajustar los esfuerzos en consecuencia.

4. Tiempo promedio de Finalización:
    - El tiempo promedio de finalización es una métrica importante para evaluar la eficiencia y la rapidez con la que el usuario completa sus tareas. Un tiempo promedio de finalización bajo indica una alta eficiencia.

El componente Dashboard.tsx utiliza:
- Gráfico de Torta (Pie Chart): Se utiliza para mostrar la distribución de tareas completadas y en progreso. Esto proporciona una representación visual rápida del estado de las tareas del usuario.
- Estadísticas de Finalización (Completion Statistics): Se presentan como texto para resaltar los porcentajes de tareas completadas y en progreso, así como el tiempo promedio de finalización. Esto permite al usuario obtener información detallada y específica sobre su rendimiento.

### Quedo atento a cualquier comentario o complicación al momento de ejecución.