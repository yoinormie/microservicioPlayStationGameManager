import express = require('express');
import app from './config';
import NpssoKey from './config'
import psn = require('psn-api')


//const accessCode = await psn.exchangeNpssoForAccessCode(NpssoKey.toString());
async function exchangeKey4AccessCode() {
    const accessCode = await psn.exchangeNpssoForAccessCode(String(process.env.MyNpsso));
    return accessCode;
}

const accessCode = exchangeKey4AccessCode()


app.get('/', (req: express.Request, res: express.Response) => {
    res.json({
        message: "Hola desde el microservicio de PlayStation"
    });
});