import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Описываем поведение для главного пути /
app.get('/', (req, res) => {
  res.send('Hello');
});
app.get('/iibragimov2417_gmail_com', (req, res) => {
  const x = Number(req.query.x);
  const y = Number(req.query.y);

  const result = lcm(x, y);

  // Устанавливаем тип ответа "обычный текст"
  res.setHeader('Content-Type', 'text/plain');

  if (isNaN(result)) {
    res.send('NaN');
  } else {
    // Важно: отправляем как строку, чтобы Express не принял это за статус-код
    res.send(result.toString());
  }
});
function gcd(x:number,y:number){
while (y !== 0) {
    x %= y;
    [x, y] = [y, x];
  }
  return x;
}
function isNatural(n: unknown): n is number {
  return typeof n === 'number' && Number.isInteger(n) && n > 0;
}
function lcm(x:number, y:number):number{
if (!isNatural(x) || !isNatural(y)) {
    return NaN;
  }
  return (x * y) / gcd(x, y);
}

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});