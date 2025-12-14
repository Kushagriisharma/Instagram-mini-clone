const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());

// routes
const routes = require('./routes/routes');
app.use('/', routes);

// MongoDB connection (NO OPTIONS)
mongoose.connect(
  'mongodb+srv://divyasharma2242009_db_user:kush%21125S@cluster0.psn3uvt.mongodb.net/insta_clone'
)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB error:', err.message));

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
