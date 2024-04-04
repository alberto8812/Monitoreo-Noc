![alt text](image.png)

# Proyecto NOC

El objetivo es crear una serie de tareas usando arquitectura limpia con TypesScript

# dev
1. Clonar el archivo .env.tamplate a .env
2. Configurar lass varaibles de entorno
3.Ejecutar el comando ```npm install```
4.levantar las bases de datos con el comando ``` docker compose up -d```
5. ejecutar el comando
    ```
    npx prisma migrate dev
    ```
6. Ejecutar ```npm run dev``