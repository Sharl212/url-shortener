const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dns = require('dns');
const app = express();

const { newUrl, redirectUrl } = require('./methods/url');

require('./db') // ? db connection

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/api/shorturl/new', async (req, res) => {
  const { url } = req.body;

  dns.lookup(url, async err => {
    if (err) return res.status(404).send();
    return res.status(200).send(await newUrl(url));
  })
})

app.get('/api/shorturl/:id', async (req, res) => {
  const { id } = req.params;
  const original_url = await redirectUrl(id);

  res.redirect(original_url);
})

app.listen('4000', () => console.log('API on 4000'))
