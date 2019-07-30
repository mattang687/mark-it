const textarea = document.getElementById("pad");
const markdownTarget = document.getElementById("markdownTarget");

// start in edit mode
markdownTarget.style.display = "none";

// override tab and shift + tab
setTabHandler(textarea);

chrome.commands.onCommand.addListener(function (command) {
    if (command == "new_tab_switch_mode") {
        console.log("switching mode");
        convertAndSwitch();
    }
});

getNotes();

function convertAndSwitch() {
    convert();
    if (textarea.style.display === "none") {
        textarea.style.display = "block";
        markdownTarget.style.display = "none";
    } else {
        textarea.style.display = "none";
        markdownTarget.style.display = "block";
    }
    textarea.focus();
}
