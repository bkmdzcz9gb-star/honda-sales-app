let selectedCar = null;
let selectedModel = null;
let selectedColor = "";
let selectedDown = 0;
let selectedMonths = 36;

function formatMoney(number) {
  return Number(number).toLocaleString("th-TH", {
    maximumFractionDigits: 0
  });
}


/* =========================
   เลือกรถ
========================= */

function selectCar(carName, button) {

  selectedCar = carName;
  selectedModel = null;
  selectedColor = "";

  document
    .querySelectorAll(".car-option")
    .forEach(function(button) {
      button.classList.remove("selected");
    });

  button.classList.add("selected");

  const modelSelect =
    document.getElementById("modelSelect");

  const colorSelect =
    document.getElementById("colorSelect");

  modelSelect.innerHTML =
    '<option value="">เลือกรุ่นย่อย</option>';

  colorSelect.innerHTML =
    '<option value="">เลือกรุ่นย่อยก่อน</option>';

  motorcycles[carName].forEach(function(model, index) {

    const option =
      document.createElement("option");

    option.value = index;
    option.textContent = model.name;

    modelSelect.appendChild(option);

  });

}


/* =========================
   เลือกรุ่นย่อย
========================= */

function selectModel() {

  const index =
    document.getElementById("modelSelect").value;

  const colorSelect =
    document.getElementById("colorSelect");

  colorSelect.innerHTML =
    '<option value="">เลือกสี</option>';

  if (index === "") {

    selectedModel = null;

    return;
  }

  selectedModel =
    motorcycles[selectedCar][index];

  selectedModel.colors.forEach(function(color) {

    const option =
      document.createElement("option");

    option.value = color;
    option.textContent = color;

    colorSelect.appendChild(option);

  });

}


/* =========================
   เลือกสี
========================= */

function selectColor() {

  selectedColor =
    document.getElementById("colorSelect").value;

}


/* =========================
   เลือกเงินดาวน์
========================= */

function selectDown(amount, button) {

  selectedDown = amount;

  document
    .querySelectorAll(".down-option")
    .forEach(function(button) {
      button.classList.remove("selected");
    });

  button.classList.add("selected");

  document.getElementById("customDown").value = "";

}


/* =========================
   เงินดาวน์กำหนดเอง
========================= */

function customDownChanged() {

  const value =
    Number(document.getElementById("customDown").value);

  if (value > 0) {

    selectedDown = value;

    document
      .querySelectorAll(".down-option")
      .forEach(function(button) {
        button.classList.remove("selected");
      });

  }

}


/* =========================
   เลือกจำนวนงวด
========================= */

function selectMonths(months, button) {

  selectedMonths = months;

  document
    .querySelectorAll(".month-option")
    .forEach(function(button) {
      button.classList.remove("selected");
    });

  button.classList.add("selected");

}


/* =========================
   หาอัตราดอกเบี้ย
========================= */

function getRate(rateGroup, months) {

  if (rateGroup === "S") {

    if (months === 36) return 0.0109;

    if (months === 30) return 0.0107;

    return 0.0106;

  }

  if (rateGroup === "M") {

    return 0.0099;

  }

  if (rateGroup === "L") {

    return 0.05;

  }

  return 0;

}


/* =========================
   คำนวณ
========================= */

function calculate() {

  if (!selectedCar) {

    alert("กรุณาเลือกรถ");

    return;

  }

  if (!selectedModel) {

    alert("กรุณาเลือกรุ่นย่อย");

    return;

  }

  const color =
    document.getElementById("colorSelect").value;

  if (!color) {

    alert("กรุณาเลือกสี");

    return;

  }

  const customDown =
    Number(document.getElementById("customDown").value);

  if (customDown > 0) {

    selectedDown = customDown;

  }

  if (selectedDown < 0) {

    alert("เงินดาวน์ไม่ถูกต้อง");

    return;

  }

  if (!selectedModel.promo) {

    alert(
      "ฐานข้อมูลยังไม่มีราคาโปรของรุ่นนี้"
    );

    return;

  }

  const price =
    selectedModel.promo;

  const financed =
    price - selectedDown;

  if (financed <= 0) {

    alert("เงินดาวน์ต้องน้อยกว่าราคาโปร");

    return;

  }


  let interest;
  let rateText;


  /* S / M = ดอกเบี้ยรายเดือน */

  if (
    selectedModel.rateGroup === "S" ||
    selectedModel.rateGroup === "M"
  ) {

    const rate =
      getRate(
        selectedModel.rateGroup,
        selectedMonths
      );

    interest =
      financed * rate * selectedMonths;

    rateText =
      (rate * 100).toFixed(2) +
      "% / เดือน";

  }


  /* L = 5% ต่อปี */

  else if (
    selectedModel.rateGroup === "L"
  ) {

    interest =
      financed *
      0.05 *
      (selectedMonths / 12);

    rateText =
      "5% / ปี";

  }


  const total =
    financed + interest;

  const monthly =
    total / selectedMonths;


  showResult({

    car: selectedCar,

    model: selectedModel.name,

    code: selectedModel.code,

    color: color,

    price: price,

    down: selectedDown,

    financed: financed,

    interest: interest,

    total: total,

    monthly: monthly,

    months: selectedMonths,

    rateText: rateText

  });

}


/* =========================
   แสดงผล
========================= */

function showResult(data) {

  const result =
    document.getElementById("result");

  result.style.display = "block";

  result.innerHTML = `

    <h2>ผลคำนวณ</h2>

    <div class="row">
      <span>รถ</span>
      <strong>${data.car}</strong>
    </div>

    <div class="row">
      <span>รุ่นย่อย</span>
      <strong>${data.model}</strong>
    </div>

    <div class="row">
      <span>สี</span>
      <strong>${data.color}</strong>
    </div>

    <div class="row">
      <span>ราคาโปร</span>
      <strong>${formatMoney(data.price)} บาท</strong>
    </div>

    <div class="row">
      <span>เงินดาวน์</span>
      <strong>${formatMoney(data.down)} บาท</strong>
    </div>

    <div class="row">
      <span>ยอดจัด</span>
      <strong>${formatMoney(data.financed)} บาท</strong>
    </div>

    <div class="row">
      <span>อัตรา</span>
      <strong>${data.rateText}</strong>
    </div>

    <div class="row">
      <span>ดอกเบี้ยรวม</span>
      <strong>${formatMoney(data.interest)} บาท</strong>
    </div>

    <div class="row">
      <span>จำนวนงวด</span>
      <strong>${data.months} งวด</strong>
    </div>

    <div class="highlight">
      ${formatMoney(data.monthly)} บาท / เดือน
    </div>

    <div class="small">
      * ค่างวดเป็นการคำนวณเบื้องต้น
      การอนุมัติและเงื่อนไขจริงขึ้นอยู่กับไฟแนนซ์
    </div>

  `;

}


/* =========================
   รีเซ็ต
========================= */

function resetForm() {

  selectedCar = null;
  selectedModel = null;
  selectedColor = "";
  selectedDown = 0;
  selectedMonths = 36;

  document
    .querySelectorAll(".selected")
    .forEach(function(button) {
      button.classList.remove("selected");
    });

  document.getElementById("modelSelect").innerHTML =
    '<option value="">เลือกรถก่อน</option>';

  document.getElementById("colorSelect").innerHTML =
    '<option value="">เลือกรุ่นย่อยก่อน</option>';

  document.getElementById("customDown").value = "";

  document.getElementById("result").style.display =
    "none";

}
