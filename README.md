# Stechs-Challenge

![GitHub package.json version](src/resources/images/appScreenshot.png)

Este es un challenge para la empresa Stechs que consiste en construir una pagina utilizando como base Next/React. Para la pagina ademas se utilizan las siguientes tecnologias :
    
    -Para los componentes se utiliza la library NextUI. 
    -Para los tests se utiliza la library Jest.
    -Para el hosting de la app se utiliza Vercel.
    -Para el backend de la app se decidio utilizar un backend en Node y una base de datos en Mongo.


![Stechs-Challenge](src/resources/images/appScreenshot.png)

## Installation

### Install Node.js 

Es necesario tener instalado node version **^18** . Si no lo tenemos instalado podes bajarlo de [nodejs.org](https://nodejs.org/).

### Install NPM

NPM es un manejador de paquetes de **Node** . Si no lo tenemos instalado todavia podemos hacerlo desde [npmjs.com](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). 

### Clone the Repository

```bash
git clone git@github.com:pedroabruno/stechs-challenge-fe.git
```

### Install Node App Dependencies

Ir a la raiz del proyecto y utilizando **NPM** :

```bash
npm install
```
Este comando bajara e instalara las dependencias del proyecto entre las cuales estan las libraries de Next

## Running the app locally 

Por defecto la app corre contra un backend en **Node** hosteado en **Vercel** y con una db en **Mongo** hosteada en **Mongo Atlas** . 

Para levantar la app localmente correr el siguiente comando.

```bash
npm run dev
```
Por defecto se levanta una instancia de la app en el puerto 3000. Utilizar la siguiente URL :  [localhost:3000](http://localhost:3000)

## Build

Para ver si la aplicacion buildea correctamente y pasa las pruebas de **lint** se puede utilizar el comando.

```bash
npm run build
```

De esta forma nos aseguramos que la app esta lista para ser deployada.

### Run tests

Para correr los tests se utiliza el comando :

```bash
yarn make
```

### Deploy to Vercel

Build the Electron application by using this command:

```bash
npm run test
```

## Using a local backend 

Para utilizar el backend local se debe : 
    
    -clonar el siguiente repositorio : [repo-backend](https://github.com/pedroabruno/stechs-challenge-be)

    -levantar el backend localmente y copiar la URL(ruta+puerto)

    -en el archivo src/api/axios.ts modificar la variable `URL_BASE` por la URL del backend

## Changes and Features

-Se cambia el filtrado de los items de un input y un botton a un input que utilizando debounce para el filtrado de items


## Roadmap

-Los strings pasaran a cargarse de un archivo de configuracion dependiendo del idioma elegido
-se agregara light mode

## Contributors

<!-- readme: contributors -start -->
<table>
    <tr>
        <td align="center">
            <a href="https://github.com/pedroabruno">
                <img src="https://avatars.githubusercontent.com/u/11651241?v=4" width="100;"/>
                <br />
                <sub><b>Pedro</b></sub>
            </a>
        </td>
    </tr>
</table>