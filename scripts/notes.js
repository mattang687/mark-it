function onError(error) {
    console.log(error);
}

async function getNotes() {
    // we store notes in a single file, should only have one object in results
    await browser.storage.local.get(null).then((results) => {
        let text = results["notes"];
        if (text == null) {
            text = "Enter Notes Here!\n\n(Switch to Edit Mode with `Ctrl + Shift + Space` If You're in a New Tab)";
        }
        textarea.value = text;
        console.log("got notes");
    }, onError);
    return;
}

function convert() {
    const text = textarea.value;
    const html = marked(text);
    markdownTarget.innerHTML = html;
}

async function getAndConvert() {
    await getNotes();
    convert();
}

function save() {
    const key = "notes";
    const text = textarea.value;
    const storingNote = browser.storage.local.set({ [key]: text });
    storingNote.then(() => {
        console.log("saved");
    }, onError);
}