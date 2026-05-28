require('dotenv').config();

const express = require('express');

const cors = require('cors');

const connectDB =
  require('./config/db');

const path = require('path');

connectDB();

const app = express();


// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());


// ================= ROUTES =================

// AUTH

app.use(

  '/api/auth',

  require('./routes/auth')

);

// MEMORIES

app.use(

  '/api/memories',

  require('./routes/memories')

);

// ADMIN

app.use(

  '/api/admin',

  require('./routes/admin')

);

// FEEDBACK / SUGGESTIONS

app.use(

  '/api/feedback',

  require('./routes/feedback')

);


// ================= ROOT ROUTE =================

app.get('/', (req, res) => {

  res.send(
    'MCA Memory Wall API Running'
  );

});


// ================= SERVER =================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () =>

  console.log(

    `Server started on port ${PORT}`

  )

);