import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

function gcdBigInt(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    a %= b;
    [a, b] = [b, a];
  }
  return a;
}
function isNatural(n: unknown): n is number {
  return typeof n === 'number' && Number.isInteger(n) && n > 0;
}

function lcmBigInt(a: bigint, b: bigint): bigint {
  if (a === 0n || b === 0n) return 0n;
  const result = (a * b) / gcdBigInt(a, b);
  return result < 0n ? -result : result;
}

app.get('/iibragimov2417_gmail_com', (req, res) => {
const { x, y } = req.query;

  try {
    // Преобразуем входящие строки (в т.ч. экспоненциальную запись) в BigInt
    // Т.к. BigInt не понимает "e+33", используем Number для парсинга и переводим в BigInt
    const valX = BigInt(Number(x));
    const valY = BigInt(Number(y));

    // Проверка на натуральное число (должно быть > 0)
    if (valX <= 0n || valY <= 0n) {
      return res.type('text/plain').send('NaN');
    }

    const result = lcmBigInt(valX, valY);

    // Результат BigInt выводится без буквы "n" на конце через .toString()
    res.type('text/plain').send(result.toString());

  } catch (e) {
    // Если пришло не число, или дробное число (BigInt только для целых)
    res.type('text/plain').send('NaN');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
