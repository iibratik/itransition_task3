import express from 'express';

const app = express();
const PORT = 3000;

// Описываем поведение для главного пути /
app.get('/', (req, res) => {
  res.send('Hello');
});
app.get('/iibragimov2417_gmail_com', (req, res) => {
  const x: number = Number(req.query.x);
  const y: number = Number(req.query.y);
  const result = lcm(x,y)
  if (isNaN(result)) {
    return res.send('NaN');
  } else {
    res.send(result)
  }
});
function gcd(x:number,y:number){
  while (y !== 0) {
    x %= y;
    [x, y] = [y, x];
  }
  return x;
}
function lcm(x:number, y:number):number{
  function isNatural(n:unknown): n is number{
   return typeof n === 'number' && Number.isInteger(n) && n > 0;
  }
  if (!isNatural(x) || !isNatural(y)) {
    return NaN;
  }
  return (x * y) / gcd(x, y);
}

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});