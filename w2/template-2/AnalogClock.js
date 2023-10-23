const createHand = (className) => {
  const hand = document.createElement("div");
  hand.classList.add("hand", className);
  return hand;
};

const AnalogClock = ($container) => {
  // 시계에 시침, 분침, 초침을 추가
  const hourHand = createHand("hour");
  const minuteHand = createHand("minute");
  const secondHand = createHand("second");
  $container.append(hourHand, minuteHand, secondHand);

  // 시계에 시간을 나타내는 마크를 추가
  for (let i = 1; i <= 12; i += 1) {
    const timeMark = document.createElement("div");
    timeMark.classList.add("time", `time${i}`);
    timeMark.textContent = "|";
    $container.appendChild(timeMark);
  }

  // 시간을 업데이트하는 함수
  const updateClock = () => {
    const now = new Date();

    // 현재 시간에서 초, 분, 시 정보를 가져옴
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12; // 12-hour clock

    // 각 침이 가리키는 각도를 계산
    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
    const hourDegrees = ((hours + minutes / 60) / 12) * 360;

    // CSS 변수를 사용하여 각 침의 각도를 변경
    secondHand.style.setProperty("--deg", secondDegrees);
    minuteHand.style.setProperty("--deg", minuteDegrees);
    hourHand.style.setProperty("--deg", hourDegrees);
  };

  // 시계 시작
  const startClock = () => {
    // 시간을 초기화하고, 1초 간격으로 시간을 업데이트
    updateClock();
    setInterval(updateClock, 1000);
  };

  startClock();
};

export default AnalogClock;
