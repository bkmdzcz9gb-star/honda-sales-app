<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Honda Sales Assistant</title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f3f4f6;
      color: #222;
    }

    .container {
      max-width: 600px;
      margin: auto;
      padding: 16px;
    }

    .header {
      background: #d60000;
      color: white;
      padding: 20px;
      border-radius: 18px;
      text-align: center;
      margin-bottom: 16px;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
    }

    .header p {
      margin: 6px 0 0;
      font-size: 14px;
    }

    .card {
      background: white;
      border-radius: 16px;
      padding: 18px;
      margin-bottom: 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 12px;
    }

    .options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .option {
      border: 2px solid #ddd;
      border-radius: 12px;
      padding: 14px 10px;
      text-align: center;
      background: white;
      cursor: pointer;
      font-size: 16px;
    }

    .option:active {
      transform: scale(0.98);
    }

    .option.selected {
      border-color: #d60000;
      background: #fff1f1;
      color: #d60000;
      font-weight: bold;
    }

    .disabled {
      color: #aaa;
      background: #f5f5f5;
      border-color: #eee;
    }

    .result {
      background: #111;
      color: white;
    }

    .result .title {
      color: white;
    }

    .monthly {
      font-size: 30px;
      font-weight: bold;
      color: white;
      text-align: center;
      margin-top: 12px;
    }

    .calculate {
      width: 100%;
      padding: 16px;
      border: 0;
      border-radius: 12px;
      background: #d60000;
      color: white;
      font-size: 18px;
      font-weight: bold;
    }
  </style>
</head>

<body>

<div class="container">

  <div class="header">
    <h1>HONDA SALES ASSISTANT</h1>
    <p>ผู้ช่วยคำนวณสำหรับเซลล์</p>
  </div>

  <div class="card">
    <div class="title">1. เลือกรถ</div>

    <div class="options">
      <div class="option">Wave110</div>
      <div class="option">Wave125i</div>
      <div class="option">Super Cub</div>
      <div class="option">Scoopy</div>
      <div class="option">Lead125</div>
      <div class="option">Giorno+</div>
      <div class="option">Click125</div>
      <div class="option">Click160</div>
      <div class="option">PCX160</div>
      <div class="option">ADV160</div>
      <div class="option">Forza350</div>
      <div class="option">CRF300L</div>
      <div class="option">ADV350</div>
      <div class="option">UC3</div>
    </div>
  </div>

  <div class="card">
    <div class="title">2. รุ่นย่อย</div>

    <div class="options">
      <div class="option disabled">เลือกรถก่อน</div>
    </div>
  </div>

  <div class="card">
    <div class="title">3. เงินดาวน์</div>

    <div class="options">
      <div class="option">5,000</div>
      <div class="option">10,000</div>
      <div class="option">20,000</div>
      <div class="option">30,000</div>
    </div>
  </div>

  <div class="card">
    <div class="title">4. จำนวนงวด</div>

    <div class="options">
      <div class="option">12 งวด</div>
      <div class="option">18 งวด</div>
      <div class="option">24 งวด</div>
      <div class="option">30 งวด</div>
      <div class="option">36 งวด</div>
    </div>
  </div>

  <button class="calculate">
    คำนวณ
  </button>

  <div class="card result" style="margin-top:16px;">
    <div class="title">ผลการคำนวณ</div>

    <div>ยังไม่ได้เลือกรถ</div>

    <div class="monthly">
      — บาท/เดือน
    </div>
  </div>

</div>

</body>
</html>
