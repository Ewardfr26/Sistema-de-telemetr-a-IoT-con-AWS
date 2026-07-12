require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 3000;
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
const docClient = DynamoDBDocumentClient.from(client);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function generarTelemetria() {
    const latitud = 12.34 + (Math.random() - 0.5) * 0.01;
    const longitud = -67.89 + (Math.random() - 0.5) * 0.01;
    const rumboActual = Math.floor(Math.random() * 360); 
    const profundidad = Math.floor(Math.random() * (50 - 5 + 1)) + 5; 

    return {
        id_barco: "MV-OceanWatch-01",
        timestamp: new Date().toISOString(),
        coordenadas: { lat: latitud, lng: longitud },
        rumbo: rumboActual,
        velocidad_nudos: 14.5,
        profundidad_pies: profundidad,
        clima: { viento_nudos: 18, estado_mar: "Marejadilla" },
        eta: "2026-07-15T08:00:00Z"
    };
}

app.get('/api/telemetria', async (req, res) => {
    const datosNavegacion = generarTelemetria();
    console.log("📡 Procesando solicitud del panel web...");

    const comando = new PutCommand({
        TableName: "TelemetriaBuques",
        Item: datosNavegacion
    });

    try {
        await docClient.send(comando);
        console.log("📝 Datos guardados en DynamoDB con éxito");
    } catch (error) {
        console.error("❌ Error al guardar en DynamoDB:", error);
    }

       res.json(datosNavegacion);
});


app.listen(PORT, () => {
    console.log(`🚢 Servidor del buque listo en http://localhost:${PORT}`);
});