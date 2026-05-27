import app from './app.js';

const port = process.env.PORT || 4100;

app.listen(port, () => {
  console.log(`Unofficial Nintendo Reference API listening on http://localhost:${port}`);
});
