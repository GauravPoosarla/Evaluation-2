const express = require('express');
const router = require('./src/routes/index');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(8000, () => {
  console.log('Server started on port 8000');
});