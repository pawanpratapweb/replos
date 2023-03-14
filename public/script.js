const windowsIcoTaskbar = document.querySelector(".windowsIcoTaskbar");

windowsIcoTaskbar.addEventListener("click", () => {
  const bottomBarMain = document.querySelector(".bottomBarMain");

  if (bottomBarMain.style.bottom === "60px") {
    bottomBarMain.style.bottom = "-100%";
  } else {
    bottomBarMain.style.bottom = "60px";
  }

  // click animation to windowsIcoTaskbar
  windowsIcoTaskbar.style.transform = "scale(0.75)";
  setTimeout(() => {
    windowsIcoTaskbar.style.transform = "scale(1)";
  }, 100)
});

const desktop = document.querySelector(".desktop");
desktop.addEventListener("click", () => {
  const bottomBarMain = document.querySelector(".bottomBarMain");
  bottomBarMain.style.bottom = "-100%";

  const contextMenu = document.querySelector(".contextMenu");
  contextMenu.style.opacity = "0";
});

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  const contextMenu = document.querySelector(".contextMenu");
  contextMenu.style.left = e.clientX + "px";
  contextMenu.style.top = e.clientY + "px";
  contextMenu.style.opacity = "1";
});

function updateTime() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var t_str = hours + ":" + minutes + " ";
  if (hours > 11) {
    t_str += "PM";
  } else {
    t_str += "AM";
  }
  document.querySelector(".timeTaskbar").innerHTML = t_str;
}
setInterval(updateTime, 1000);

// set the current date on the desktop
const dateTaskbar = document.querySelector(".dateTaskbar");
const date = new Date();
dateTaskbar.innerText = `${date.getDate()} ${[
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
][date.getMonth()]
  } ${date.getFullYear()}`;


// taskbaricon click animation
const taskbarIcon = document.querySelectorAll(".taskbarIcon");
taskbarIcon.forEach(elem => {
  elem.addEventListener("click", () => {
    elem.style.transform = "scale(0.75)";
    setTimeout(() => {
      elem.style.transform = "scale(1)";
    }, 100)
  })
})


async function generateText(prompt) {
  const response = await fetch('https://api.openai.com/v1/text-davinci-002/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 100,
      n: 1,
      stop: '\n'
    })
  });

  const data = await response.json();
  const text = data.choices[0].text.trim();
  return text;
}

console.log(generateText("who are you"))