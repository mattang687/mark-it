var textarea = document.getElementById("newTabPad");
var markdownTarget = document.getElementById("markdownTarget");

textarea.onkeyup = save;
textarea.style.display = "none";

showdown.setFlavor('github');
getAndConvert();

browser.commands.onCommand.addListener(function(command) {
    if (command == "new_tab_switch_mode") {
      console.log("switching mode");
        convertAndSwitch();
    }
  });

function convert(text) {
    var text = textarea.value,
    converter = new showdown.Converter({
        "simplifiedAutoLink": true,
        "strikethrough": true,
        "tables": true,
        "tasklists": true,
        "smoothLivePreview": true,
        "smartIndentationFix": true,
        "disableForced4SpacesIndentedSublists": true,
        "simpleLineBreaks": true,
        "openLinksInNewWindow": true,
        "emoji": true,
        "underline": true,
    }),
    html = converter.makeHtml(text);
    markdownTarget.innerHTML = html;
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