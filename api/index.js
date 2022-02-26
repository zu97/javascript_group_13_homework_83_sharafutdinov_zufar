const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const run = async () => {
    app.listen(port, () => {
        console.log(`App started on ${port} port`);
    });
}
run().catch((e) => console.error(e));
