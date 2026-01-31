import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

function gcd(x: bigint, y: bigint): bigint {
  while (y !== 0n) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

function isNatural(value: any): boolean {
  // Handle empty strings, undefined, null, objects
  if (value === '' || value === undefined || value === null ||
      typeof value === 'object' || value === '{}') {
    return false;
  }

  // Convert to string to check the input
  const str = String(value).trim();

  // Check if empty after trim
  if (str === '' || str === '{}') {
    return false;
  }

  // Check if it's a valid number string (only digits, no decimals, no negatives)
  if (!/^\d+$/.test(str)) {
    return false;
  }

  // Try to parse as BigInt
  try {
    const n = BigInt(str);
    // Natural numbers are positive integers (> 0)
    return n > 0n;
  } catch {
    return false;
  }
}

function lcm(xInput: any, yInput: any): string {
  if (!isNatural(xInput) || !isNatural(yInput)) {
    return 'NaN';
  }

  try {
    const x = BigInt(String(xInput).trim());
    const y = BigInt(String(yInput).trim());

    const result = (x * y) / gcd(x, y);
    return result.toString();
  } catch {
    return 'NaN';
  }
}

app.get('/iibragimov2417_gmail_com', (req, res) => {
  const x = req.query.x;
  const y = req.query.y;

  const result = lcm(x, y);

  res.setHeader('Content-Type', 'text/plain');
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});