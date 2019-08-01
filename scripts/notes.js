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
    });
    return;
}

function convert() {
    const text = textarea.value;
    const html = marked(text);
    markdownTarget.innerHTML = html;
}

function save() {
    const key = "notes";
    const text = textarea.value;
    chrome.storage.local.set({ [key]: text });
}

// get notes when the local storage changes
// storage will only be updated when the user stops typing
function setUpdateHandler(textarea) {
    chrome.storage.onChanged.addListener((changes) => {
        let storageChange = changes["notes"];
        if (storageChange != null) {
            textarea.value = storageChange.newValue;
            convert();
        }
    })
}

// listen to inputs and wait until typing stops before saving
let timeout = null;
function waitToSave(indicator) {
    // show saving indicator
    if (indicator != null) indicator.style.opacity = "1";

    // clear timeout if typing, otherwise schedule save() in 1s
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        save();
        // hide saving indicator
        if (indicator != null) indicator.style.opacity = "0";
    }, 500)
}

function setWaitToSave(textarea, indicator) {
    textarea.addEventListener("input", () => waitToSave(indicator));
}

// save after user stops typing and override tab and shift + tab
// provide indicator to save on indentation changes
function setKeyPressHandler(textarea, indicator) {
    let shifted = false;

    textarea.onkeyup = function(evt) {
        // check for shift
        if (evt.keyCode === 16) {
            shifted = false;
        }
    };

    textarea.onkeydown = function(evt) {
        if (evt.keyCode === 9) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            const text = textarea.value;
            let lineStart = text.substring(0, start).lastIndexOf("\n") + 1;

            if (!shifted) {
                // add 2 spaces to the beginning of the line
                textarea.value = text.substring(0, lineStart) + "  " + text.substring(lineStart);
                textarea.selectionStart = start + 2;
                textarea.selectionEnd = end + 2;
            } else {
                // remove 2 spaces from the beginning of the line, if there are any
                let tabEnd = lineStart;
                while (text.charAt(tabEnd) === ' ' && tabEnd - lineStart < 2) {
                    tabEnd++;
                }
                textarea.value = text.substring(0, lineStart) + text.substring(tabEnd);
                textarea.selectionStart = start - (tabEnd - lineStart);
                textarea.selectionEnd = end - (tabEnd - lineStart);
            }

            // tab doesn't count as a textarea input, so manually call waitToSave()
            waitToSave(indicator);

            // prevent focusing next element
            evt.preventDefault();
        }
        if (evt.keyCode === 16) {
            shifted = true;
        }
    };
}