import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

function gcd(x: number, y: number): number {
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

function isNatural(n: unknown): n is number {
  return typeof n === 'number' && Number.isInteger(n) && n > 0;
}

function lcm(x: number, y: number): number {
  if (!isNatural(x) || !isNatural(y)) {
    return NaN;
  }
  return (x * y) / gcd(x, y);
}

app.get('/iibragimov2417_gmail_com', (req, res) => {
  const x = Number(req.query.x);
  const y = Number(req.query.y);

  const result = lcm(x, y);

  res.setHeader('Content-Type', 'text/plain');

  if (isNaN(result)) {
    res.send('NaN');
  } else {
    res.send(result.toString());
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
