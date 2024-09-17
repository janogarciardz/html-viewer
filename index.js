const express = require('express');
const { unzipurl } = require('zipurl');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const encodedData = req.query.d; 
  if (!encodedData) {
    return res.status(400).send('No se encontró el parámetro d');
  }

  try {    
    const htmlContent = await unzipurl(encodedData);
    
    res.send(htmlContent);
  } catch (error) {
    console.error('Error al decodificar el contenido:', error);
    res.status(500).send('Error al procesar el HTML');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
