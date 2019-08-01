// all notes pages must have these elements
const textarea = document.getElementById("pad"),
  markdownTarget = document.getElementById("markdownTarget"),
  changeModeButton = document.getElementById("changeModeButton"),
  indicator = document.getElementById("savingIndicator");

// convert from markdown to html with Marked
function convert() {
  const text = textarea.value;
  const html = marked(text);
  markdownTarget.innerHTML = html;
}

// save textarea contents to local storage
function save() {
  const key = "notes";
  const text = textarea.value;
  chrome.storage.local.set({ [key]: text });
}

// automatically get notes
(async function getNotes() {
  // all notes are stored in a single string with key "notes"
  await chrome.storage.local.get("notes", results => {
    let text = results["notes"];
    if (text == null) {
      text =
        "Enter Notes Here!\n\n(Switch to Edit Mode with `Ctrl + Space` If You're in a New Tab)";
    }
    textarea.value = text;
    convert();
  });

  return;
})();

// switch between view and edit
// if in edit, convert text before switching
function switchMode() {
  if (textarea.style.display === "none") {
    // in view mode, switching to edit
    textarea.style.display = "block";
    markdownTarget.style.display = "none";
    changeModeButton.innerText = "EDIT";
    changeModeButton.style.background = "#81ae9d";
  } else {
    // in edit mode, switching to view
    convert();
    textarea.style.display = "none";
    markdownTarget.style.display = "block";
    changeModeButton.innerText = "VIEW";
    changeModeButton.style.background = "#fb9f89";
  }
  textarea.focus();
}

// bind switchMode to changeModeButton
changeModeButton.addEventListener("click", switchMode);

// listen for mode switch keybind
chrome.commands.onCommand.addListener(function(command) {
  if (command === "new_tab_switch_mode") {
    switchMode();
  }
});

// get notes when the local storage changes
// storage will only be updated when the user stops typing
chrome.storage.onChanged.addListener(changes => {
  let storageChange = changes["notes"];
  if (storageChange != null) {
    textarea.value = storageChange.newValue;
    convert();
  }
});

// wait until typing stops before saving
let timeout = null;
function waitToSave() {
  // show saving indicator
  indicator.style.opacity = "1";

  // clear timeout if typing, otherwise schedule save() in 1s
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    save();
    // hide saving indicator
    indicator.style.opacity = "0";
  }, 400);
}

// trigger waitToSave on input
textarea.addEventListener("input", () => waitToSave());

// override tab and shift + tab
// trigger waitToSave on indentation changes
(function setKeyPressHandler() {
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
        textarea.value =
          text.substring(0, lineStart) + "  " + text.substring(lineStart);
        textarea.selectionStart = start + 2;
        textarea.selectionEnd = end + 2;
      } else {
        // remove 2 spaces from the beginning of the line, if there are any
        let tabEnd = lineStart;
        while (text.charAt(tabEnd) === " " && tabEnd - lineStart < 2) {
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
})();
