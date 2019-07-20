const textarea = document.getElementById("pad");
const markdownTarget = document.getElementById("markdownTarget");

textarea.onkeyup = save;

markdownTarget.style.display = "none";

chrome.commands.onCommand.addListener(function (command) {
    if (command == "new_tab_switch_mode") {
        console.log("switching mode");
        convertAndSwitch();
    }
});

getAndConvert();

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
