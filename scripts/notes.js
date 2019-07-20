function onError(error) {
    console.log(error);
}

async function getNotes() {
    // we store notes in a single file, should only have one object in results
    await browser.storage.local.get(null).then((results) => {
        let text = results["notes"];
        if (text == null) {
            text = "Enter Notes Here!\n\n(Switch to Edit Mode with `Ctrl + Space` If You're in a New Tab)";
        }
        textarea.value = text;
        console.log("got notes");
    }, onError);
    return;
}

function save() {
    const key = "notes";
    const text = textarea.value;
    const storingNote = browser.storage.local.set({ [key]: text });
    storingNote.then(() => {
        console.log("saved");
    }, onError);
}