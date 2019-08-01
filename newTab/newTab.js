const textarea = document.getElementById("newTabPad");
const markdownTarget = document.getElementById("markdownTarget");
const button = document.getElementById("changeViewButton");
const indicator = document.getElementById("savingIndicator");

// start in view mode
textarea.style.display = "none";

// handle indentation
setKeyPressHandler(textarea, indicator);
// wait until typing stops to save
setWaitToSave(textarea, indicator);
// update contents when changed in another tab
setUpdateHandler(textarea);

button.innerText = "VIEW";
button.style.background = "#fb9f89";
button.addEventListener('click', convertAndSwitch);

chrome.commands.onCommand.addListener(function (command) {
    if (command == "new_tab_switch_mode") {
        convertAndSwitch();
    }
});

getNotes();

function convertAndSwitch() {
    convert();
    if (textarea.style.display === "none") {
        textarea.style.display = "block";
        markdownTarget.style.display = "none";
        button.innerText = "EDIT";
        button.style.background = "#81ae9d";
    } else {
        textarea.style.display = "none";
        markdownTarget.style.display = "block";
        button.innerText = "VIEW";
        button.style.background = "#fb9f89";
    }
    textarea.focus();
}