const pomodoroTimer = document.querySelector('#pomodoro-timer');
const startButton = document.querySelector('#pomodoro-start');
const pauseButton = document.querySelector('#pomodoro-pause');
const stopButton = document.querySelector('#pomodoro-stop');
let type = "Work";
let timeSpentInCurrentSession = 0;

let isClockRunning = false;

// in seconds = 25 mins
let workSessionDuration = 1500;
let currentTimeLeftInSession = 1500;
let breakSessionDuration = 300;

// START
startButton.addEventListener('click', () => {
    toggleClock();
  })
  
  // PAUSE
  pauseButton.addEventListener('click', () => {
    toggleClock();
  })
  
  // STOP
  stopButton.addEventListener('click', () => {
    toggleClock(true);
  })

  // Toggle Clock Function
  const toggleClock = (reset) => {
    if (reset) {
      // STOP THE TIMER
      stopClock();
    } else {
      if (isClockRunning === true) {
        // PAUSE THE TIMER
        isClockRunning = false;
        clearInterval(clockTimer);
      } else {
        // START THE TIMER
        isClockRunning = true;
        clockTimer = setInterval(() => {
            // decrease time left / increase time spent
            stepDown()
            displayCurrentTimeLeftInSession()
        }, 1000)
      }
    }
  }

  const stepDown = () => {
      if (currentTimeLeftInSession > 0) {
          // decrease time left / increase time spent
         currentTimeLeftInSession--
         timeSpentInCurrentSession++
      } else if (currentTimeLeftInSession === 0) {
          // Timer is over -> if work switch to break, viceversa
          timeSpentInCurrentSession = 0
        if (type === "work") {
            currentTimeLeftInSession = breakSessionDuration
            displaySessionLog('Work')
            type = 'Break'
        } else {
            currentTimeLeftInSession = workSessionDuration
            type = 'Work'
            displaySessionLog('Break')
        }
      }
      displayCurrentTimeLeftInSession()
  }

  const stopClock = () => {
    displaySessionLog(type)
    clearInterval(clockTimer)
    isClockRunning = false
    currentTimeLeftInSession = workSessionDuration
    displayCurrentTimeLeftInSession()
    type = 'Work'
  }

  const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession;
    let result = '';
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60) % 60;
    let hours = parseInt(secondsLeft / 3600);
    // add leading zeroes if it's less than 10
    function addLeadingZeroes(time) {
      return time < 10 ? `0${time}` : time
    }
    if (hours > 0) result += `${hours}:`
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
    pomodoroTimer.innerText = result.toString();
  }

  const displaySessionLog = (type) => {
    const sessionsList = document.querySelector('#pomodoro-sessions')
    // append li to it
    const li = document.createElement('li')
    let sessionLabel = type
    let elapsedTime = parseInt(timeSpentInCurrentSession / 60)
    elapsedTime = elapsedTime > 0 ? elapsedTime : '< 1'
    const text = document.createTextNode(`${sessionLabel} : ${elapsedTime} min`)
    li.appendChild(text)
    sessionsList.appendChild(li)
  }