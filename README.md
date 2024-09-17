# HTML VIEWER

Esta aplicación Node.js es un servidor básico que recibe un parámetro codificado en gzip a través de una solicitud HTTP GET, decodifica el contenido y lo muestra como HTML. Es útil para visualizar contenido HTML comprimido de manera rápida.

## Descripción

La aplicación utiliza **Express** para gestionar las solicitudes HTTP y **zipurl** para descomprimir datos codificados en gzip. Cuando se realiza una solicitud GET al servidor con un parámetro `d` que contiene un hash codificado en gzip, la aplicación decodifica este contenido y lo envía como respuesta.

## Requisitos

- Node.js (v14 o superior)
