const express = require('express');
const { unzipurl } = require('zipurl');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
	const encodedData = req.query.d;
	const token = req.query.token || null;
	if (!encodedData) {
		return res.status(400).send('No se encontró el parámetro d');
	}

	try {
		const htmlContent = await unzipurl(encodedData);
		let html = htmlContent;

		if (token) {
			const apiUrl = `https://v0-new-project-4b8p7wk55bl.vercel.app/api/decode-token`;

			const response = await axios.get(`${apiUrl}?token=${token}`);
			const decodedData = response.data;
			console.log('Data', decodedData);
			html =
				`<script>
        const clientId = "${decodedData.payload.clientId || ''} ";
        const companyId = "${decodedData.payload.companyId || ''}";
        const internalUserId = "${decodedData.payload.internalUserId || ''}";
        const workspaceId = "${decodedData.payload.workspaceId || ''}";        
        </script>` + htmlContent;
		}

		res.send(html);
	} catch (error) {
		console.error('Error al decodificar el contenido:', error);
		res.status(500).send('Error al procesar el HTML');
	}
});

app.listen(port, () => {
	console.log(`Servidor escuchando en http://localhost:${port}`);
});
