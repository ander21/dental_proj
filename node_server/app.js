const express = require('express');
const app = express();
const router = require('./routes/app.routes');
const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}.`);
});
