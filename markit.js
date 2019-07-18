var textarea = document.getElementById("pad");
var button = document.getElementById("button");

button.addEventListener('click', save);

function onError(error) {
    console.log(error);
}

getNotes();

function getNotes() {
    // we store notes in a single file, should only have one object in results
    browser.storage.local.get(null).then((results) => {
        var curValue = results["notes"];
        textarea.value = curValue;
    }, onError);
}

function save() {
    var key = "notes";
    var data = textarea.value;
    var storingNote = browser.storage.local.set({ [key]: data });
    storingNote.then(() => {}, onError);
}