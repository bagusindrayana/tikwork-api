const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const jobVacancyRoutes = require('./routes/jobVacancyRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/api/jobs', jobVacancyRoutes);

// Database connection
sequelize.sync()
  .then(() => {
    console.log('Database connected');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = app;
