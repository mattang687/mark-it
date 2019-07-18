var textarea = document.getElementById("newTabPad");
var markdownTarget = document.getElementById("markdownTarget");

textarea.onkeyup = save;
textarea.style.display = "none";

getAndConvert();

browser.commands.onCommand.addListener(function(command) {
    if (command == "new_tab_switch_mode") {
      console.log("switching mode");
        convertAndSwitch();
    }
  });

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
    } else {
        textarea.style.display = "none";
        markdownTarget.style.display = "block";
    }
}