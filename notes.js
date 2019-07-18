function onError(error) {
    console.log(error);
}

function getNotes() {
    // we store notes in a single file, should only have one object in results
    browser.storage.local.get(null).then((results) => {
        var data = results["notes"];
        if (data == null) {
            data = "";
        }
        textarea.value = data;
        console.log("got notes");
    }, onError);
}

function save() {
    var key = "notes";
    var data = textarea.value;
    var storingNote = browser.storage.local.set({ [key]: data });
    storingNote.then(() => {
        console.log("saved");
    }, onError);
}