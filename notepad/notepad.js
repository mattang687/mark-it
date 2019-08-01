const textarea = document.getElementById("pad");
const markdownTarget = document.getElementById("markdownTarget");
const changeViewButton = document.getElementById("changeViewButton");
const openNotesButton = document.getElementById("openNotesButton");
const indicator = document.getElementById("savingIndicator");

// start in edit mode
markdownTarget.style.display = "none";

// handle indentation
setKeyPressHandler(textarea, indicator);
// wait until typing stops to save
setWaitToSave(textarea, indicator);
// update contents when changed in another tab
setUpdateHandler(textarea);

changeViewButton.innerText = "EDIT";
changeViewButton.style.background = "#81ae9d";
changeViewButton.addEventListener('click', convertAndSwitch);

openNotesButton.addEventListener('click', () => openNotes());

function openNotes() {
    console.log("click");
    chrome.tabs.create({url: chrome.extension.getURL("/newTab/newTab.html")})
}

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
        changeViewButton.innerText = "EDIT";
        changeViewButton.style.background = "#81ae9d";
    } else {
        textarea.style.display = "none";
        markdownTarget.style.display = "block";
        changeViewButton.innerText = "VIEW";
        changeViewButton.style.background = "#fb9f89";
    }
    textarea.focus();
}
