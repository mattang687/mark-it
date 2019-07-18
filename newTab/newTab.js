var textarea = document.getElementById("newTabPad");
textarea.onkeyup = save;

getNotes();

document.getElementById("convertButton").addEventListener("click", convert);

function convert() {
    var text = textarea.value,
    markdownTarget = document.getElementById("markdownTarget"),
    converter = new showdown.Converter(),
    html = converter.makeHtml(text);
    markdownTarget.innerHTML = html;
}