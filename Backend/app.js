const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const apiRoutes = require('./routes/api');
const sendReminders = require('./Services/sendReminders');
const cron = require('node-cron');

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use('/api', apiRoutes);



sendReminders();

// Puerto de escucha
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
