const textarea = document.getElementById("pad");
const markdownTarget = document.getElementById("markdownTarget");

// override tab and shift + tab
setTabHandler(textarea);

markdownTarget.style.display = "none";

browser.commands.onCommand.addListener(function (command) {
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
