const bikeSelect = document.getElementById("bike");
const downInput = document.getElementById("down");
const monthSelect = document.getElementById("months");
const resultBox = document.getElementById("result");

MOTORCYCLES.forEach((bike, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent =
        `${bike.name} - ${bike.variant}`;
    bikeSelect.appendChild(option);
});

function getRate(group, months) {

    if(group === "S"){
        if(months == 36) return 0.0109;
        if(months == 30) return 0.0107;
        return 0.0106;
    }

    if(group === "M"){
        return 0.0099;
    }

    return 0;
}

function calculate(){

    const bike =
        MOTORCYCLES[bikeSelect.value];

    if(!bike) return;

    const down =
        Number(downInput.value) || 0;

    const months =
        Number(monthSelect.value);

    const promo =
        bike.promo || bike.full;

    const finance =
        promo - down;

    let totalInterest = 0;

    if(bike.rateGroup === "L"){

        const years = months / 12;

        totalInterest =
            finance * 0.05 * years;

    }else{

        const rate =
            getRate(
                bike.rateGroup,
                months
            );

        totalInterest =
            finance *
            rate *
            months;
    }

    const total =
        finance + totalInterest;

    const payment =
        Math.round(total / months);

    resultBox.innerHTML = `
        <h3>${bike.name}</h3>

        <p>รุ่น: ${bike.variant}</p>

        <p>เงินสด:
        ${bike.cash ?
        bike.cash.toLocaleString() :
        "-"}</p>

        <p>โปรจัด:
        ${promo.toLocaleString()}</p>

        <p>ดาวน์:
        ${down.toLocaleString()}</p>

        <p>ยอดจัด:
        ${finance.toLocaleString()}</p>

        <p>ดอกเบี้ยรวม:
        ${Math.round(totalInterest)
        .toLocaleString()}</p>

        <h2>
        ${payment.toLocaleString()}
        บาท/เดือน
        </h2>
    `;
}
