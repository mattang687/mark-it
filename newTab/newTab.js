var textarea = document.getElementById("newTabPad");
var markdownTarget = document.getElementById("markdownTarget");
const button = document.getElementById("changeViewButton");

textarea.onkeyup = save;
textarea.style.display = "none";

button.innerText = "VIEW";
button.style.background = "#fb9f89";
button.addEventListener('click', convertAndSwitch);

browser.commands.onCommand.addListener(function (command) {
    if (command == "new_tab_switch_mode") {
        console.log("switching mode");
        convertAndSwitch();
    }
});

getAndConvert();

function convert() {
    var text = textarea.value;
    markdownTarget.innerHTML = marked(text);
}

async function getAndConvert() {
    await getNotes();
    convert();
}

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
}