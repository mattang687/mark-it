async function getNotes() {
    // we store notes in a single file, should only have one object in results
    await chrome.storage.local.get("notes", (results) => {
        let text = results["notes"];
        if (text == null) {
            text = "Enter Notes Here!\n\n(Switch to Edit Mode with `Ctrl + Space` If You're in a New Tab)";
        }
        textarea.value = text;
        convert();
        save();
        console.log("got notes");
    });
    return;
}

function convert() {
    const text = textarea.value;
    const html = marked(text);
    markdownTarget.innerHTML = html;
    console.log("convert");
}

function save() {
    const key = "notes";
    const text = textarea.value;
    chrome.storage.local.set({ [key]: text });
    console.log("save");
}