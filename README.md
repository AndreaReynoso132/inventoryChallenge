# inventoryChallenge
# Frontend - Inventory 
Este es el frontend de la aplicación **Inventory** desarrollada utilizando **React**, **Material UI**, **Redux**, y **React Router**.

## Tecnologías utilizadas

- **React**: Biblioteca para la creación de interfaces de usuario.
- **Material UI**: Biblioteca de componentes de UI para el diseño y la experiencia visual.
- **Redux**: Manejo del estado global de la aplicación.
- **React Router**: Navegación entre diferentes vistas de la aplicación.
- **Axios**: Para realizar llamadas HTTP al backend.

## Instalación

Para comenzar a trabajar con este proyecto, asegúrate de tener **Node.js** instalado en tu máquina. Luego, sigue estos pasos:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/AndreaReynoso132/inventoryChallenge.git
   cd inventory-frontend
 2.Instalar dependencias e iniciar 
 npm install
  npm start
  http://localhost:3000


# Backend - Inventory 
Este es el backend de la aplicación **Inventory* desarrollado en **.NET Core** con una arquitectura en capas. El backend provee una API REST que gestiona el inventario de productos.

## Tecnologías utilizadas

- **.NET Core**: Framework para el desarrollo del backend.
- **Entity Framework Core**: ORM para el manejo de la base de datos.
- **SQL Server**: Base de datos utilizada.
- **JWT**: Para la autenticación y autorización.
- **Swagger**: Para la documentación automática de la API.

## Instalación

Asegúrate de tener **.NET 6 SDK** y **SQL Server** instalados en tu máquina.

1. Clona este repositorio:
   ```bash
   git clone https://github.com/AndreaReynoso132/inventoryChallengeApi.git
Navega a la carpeta del proyecto:

bash
2. Ir a la carpeta 
cd InventoryApi
3.Restaura los paquetes NuGet:
dotnet restore

4.Configura las connection strings en el archivo appsettings.json:

{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=InventoryDb;User Id=admin;Password=tu_password;"
  }
}

5.Aplica las migraciones de la base de datos:
dotnet ef database update

6.Inicia la aplicación:
dotnet run
La API estará disponible en http://localhost:5000.
   
7.Endpoints principales
GET /api/products: Obtiene todos los productos.
GET /api/products/{id}: Obtiene un producto por su ID.
POST /api/products: Crea un nuevo producto.
PUT /api/products/{id}: Actualiza un producto existente.
DELETE /api/products/{id}: Elimina un producto por su ID.

   
   
   
