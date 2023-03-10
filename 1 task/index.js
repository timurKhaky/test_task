const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl

//Хотел написать функции очистки и debounce чтобы избежать повторных запусков таймеров, но решил, что в этом нет необходимости.
//Как минимум этого не было в тех.задании
//Правда, я позволил себе отключить кнопку, пока инпут пустой

const createTimerAnimator = () => {
  return (seconds) => {
    let timerValue = seconds;
    //Устанавливаю первое значение до запуска таймера
    timerFormater(timerValue);

    const timerInterval = setInterval(timer, 1000);

    function timer() {
      timerValue--;
      timerFormater(timerValue);
      if (!timerValue) {
        clearInterval(timerInterval);
      }
    }
    function timerFormater(value) {
      //вычисление часов/минут/секунд для дальнейшего форматирования в hh:mm:ss
      const hourCalc = Math.floor(value / 3600);
      const minCalc = Math.floor((value - hourCalc * 3600) / 60);
      const secCalc = value - hourCalc * 3600 - minCalc * 60;
      //приведение в формат двух чисел (01:02:03 вместо 1:2:3)
      const timeFormatChecker = {
        hour: String(hourCalc).length === 1 ? `0${hourCalc}` : hourCalc,
        min: String(minCalc).length === 1 ? `0${minCalc}` : minCalc,
        sec: String(secCalc).length === 1 ? `0${secCalc}` : secCalc,
      };

      const { hour, min, sec } = timeFormatChecker;
      timerEl.textContent = `${hour}:${min}:${sec}`;
    }
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  inputEl.value = inputEl.value.replace(/[^0-9]/g, "");
  //Включаем доступ к таймеру, если в инпуте есть значение
  buttonEl.disabled = !inputEl.value ? "disabled" : "";
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);
  animateTimer(seconds);
  inputEl.value = "";
  buttonEl.disabled = "disabled";
});
