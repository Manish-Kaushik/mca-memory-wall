require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB =
  require('./config/db');

const path = require('path');

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

// Routes

app.use(
  '/api/auth',
  require('./routes/auth')
);


app.use(
  '/api/memories',
  require('./routes/memories')
);

app.use(
  '/api/admin',
  require('./routes/admin')
);

// Root Route

app.get('/', (req, res) => {

  res.send(
    'MCA Memory Wall API Running'
  );

});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server started on port ${PORT}`
  )
);