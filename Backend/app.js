const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/mern_crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => console.log('MongoDB Connected'));
mongoose.connection.on('error', (err) => console.error(`MongoDB Connection Error: ${err}`));


app.use('/api', employeeRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
