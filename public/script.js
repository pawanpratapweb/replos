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

$(function () {
  $(".app").draggable();
});



// const app = document.querySelectorAll(".app");
// app.forEach((elem => {
//   // if (elem.getAttribute(name)) {
//   //   fetch(window.location.origin + "/api?app=" + elem.elem.getAttribute(name))
//   //     .then((res) => {
//   //       return res.json();
//   //     })
//   //     .then((data) => {
//   //       elem.childNodes[1].innerHTML = data;
//   //     })
//   //     .catch((err) => {
//   //       console.error(err);
//   //     });
//   // }
//   console.log(elem.getAttribute("name"))
// }))

const openApp = (appName, width, height) => {
  const appClass = "app_" + new Date().getTime();
  const desktop = document.querySelector(".desktop");
  desktop.insertAdjacentHTML('beforeend', `
  <div class="app ${appClass}" data-app="${appName}" style="height: ${height}px;width: ${width}px;">
    <div class="appTop">
      <p>${appName}</p>
      <button class="closeApp">
      </button>
    </div>
    <div class="appContent"></div>
  </div>
  `);
  fetch(window.location.origin + "/api?app=" + appName)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.code = data.code.replaceAll("_", appName)
      const app = document.querySelector("." + appClass);
      app.children[1].innerHTML = data.code;
    })
    .catch((err) => {
      console.error(err);
    });
}

openApp("notepad", "300", "500");