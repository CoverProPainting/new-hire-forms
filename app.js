const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: 'cover_pro_new_hire_session',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Password
const FORM_PASSWORD = process.env.FORM_PASSWORD || 'CPNewhire26!';

// Auth middleware
const authRequired = (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  }
  res.redirect('/login');
};

// Routes
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { password } = req.body;
  
  if (password === FORM_PASSWORD) {
    req.session.authenticated = true;
    res.redirect('/forms');
  } else {
    res.render('login', { error: 'Invalid password. Please try again.' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/forms', authRequired, (req, res) => {
  res.render('forms-index');
});

// Import form routes
const formRoutes = require('./routes/forms');
app.use('/form', authRequired, formRoutes);

// Redirect root to login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✓ Cover Pro Painting New Hire Forms`);
  console.log(`✓ Server running at http://localhost:${PORT}`);
  console.log(`✓ Access the forms at http://localhost:${PORT}/login`);
  console.log(`\n📝 Password: ${FORM_PASSWORD}`);
  console.log(`📧 Responses will be sent to: ${process.env.EMAIL_TO || 'info@coverpropainting.com'}\n`);
});
