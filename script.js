function animateNumber(target, element, targetWR) {
  let start = 0;
  const duration = 1500;
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = target / steps;

  const interval = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(interval);
    }
    element.innerHTML = `🔥 Kamu perlu <strong>${Math.ceil(start)}</strong> kemenangan berturut-turut untuk mencapai winrate ${targetWR}%.`;
  }, stepTime);
}

function calculateWins() {
  const totalMatch = parseFloat(document.getElementById("totalMatch").value);
  const currentWR = parseFloat(document.getElementById("currentWR").value);
  const targetWR = parseFloat(document.getElementById("targetWR").value);
  const resultDiv = document.getElementById("result");

  if (isNaN(totalMatch) || isNaN(currentWR) || isNaN(targetWR) || targetWR > 100 || currentWR > 100 || totalMatch <= 0 || currentWR < 0 || targetWR < 0) {
    resultDiv.innerHTML = "⚠️ Silakan masukkan angka yang valid (0-100 untuk winrate dan jumlah match lebih dari 0).";
    resultDiv.style.borderColor = "#ff4444";
    return;
  }

  if (targetWR <= currentWR) {
    resultDiv.innerHTML = "⚠️ Target winrate harus lebih besar dari winrate saat ini.";
    resultDiv.style.borderColor = "#ff4444";
    return;
  }

  const currentWins = (currentWR / 100) * totalMatch;
  const requiredWins = (targetWR * totalMatch - 100 * currentWins) / (100 - targetWR);

  if (requiredWins <= 0) {
    resultDiv.innerHTML = "✅ Target winrate sudah tercapai!";
    resultDiv.style.borderColor = "#00ff88";
  } else {
    resultDiv.innerHTML = "";
    resultDiv.style.borderColor = "#ffcc00";
    animateNumber(Math.ceil(requiredWins), resultDiv, targetWR);
  }
}
