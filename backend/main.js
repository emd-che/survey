const express = require('express');
var indexRouter = require('./routes/index');
var cors = require('cors');
const PORT = 3000

const app = express();
app.use(cors())
app.use(express.json());
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})