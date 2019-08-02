const darkModeButton = document.getElementById("darkModeButton");

// get mode from local storage and add/remove dark class to body and textarea
function getDarkMode() {
  chrome.storage.local.get("darkMode", results => {
    let mode = results["darkMode"];
    if (mode == null) {
      mode = "light";
      chrome.storage.local.set({ ["darkMode"]: mode });
    }
    if (mode === "dark") {
      darkModeButton ? (darkModeButton.innerText = "DARK") : {};
      document.querySelector("html").classList.add("dark");
      document.querySelector("body").classList.add("dark");
      textarea.classList.add("dark");
    } else {
      darkModeButton ? (darkModeButton.innerText = "LIGHT") : {};
      document.querySelector("html").classList.remove("dark");
      document.querySelector("body").classList.remove("dark");
      textarea.classList.remove("dark");
    }
  });
}

// getDarkMode when the page loads
document.addEventListener("DOMContentLoaded", getDarkMode);

// hidden notes will be updated when they are shown
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    getDarkMode();
  }
});

// switches mode
function toggleDarkMode() {
  chrome.storage.local.get("darkMode", results => {
    let mode = results["darkMode"];
    if (mode == null) {
      mode = "light";
      chrome.storage.local.set({ ["darkMode"]: mode });
    }
    if (mode === "dark") {
      darkModeButton ? (darkModeButton.innerText = "LIGHT") : {};
      chrome.storage.local.set({ ["darkMode"]: "light" });
      document.querySelector("html").classList.remove("dark");
      document.querySelector("body").classList.remove("dark");
      textarea.classList.remove("dark");
    } else {
      darkModeButton ? (darkModeButton.innerText = "DARK") : {};
      chrome.storage.local.set({ ["darkMode"]: "dark" });
      document.querySelector("html").classList.add("dark");
      document.querySelector("body").classList.add("dark");
      textarea.classList.add("dark");
    }
  });
}
