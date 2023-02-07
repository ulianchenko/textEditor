
// const btnSplit = document.querySelector('.btnSplit');
const btnAdd = document.querySelector('.btnAdd');
const btnOpen = document.querySelector('.btnOpen');
const btnSave = document.querySelector('.btnSave');
const btnSaveAs = document.querySelector('.btnSaveAs');
const editArea = document.querySelector('.editArea');
const firstName = document.querySelector('.firstName');
const checkBoxes = document.querySelectorAll('[type="checkbox"]');

function getAddHandle(addContent, fileContent) {
  fileContent.value = `${addContent.value}\n${fileContent.value}`;
  addContent.value = '';
}

//////////////////////////////////////////////////
// function getSplitHandle(fileContent) {
//   const str = fileContent.value;
//   const strArr = str.split(/\n/gm);
//   console.log(strArr);
// }
//////////////////////////////////////////////////

let fileHandle;
async function getOpenFileHandle(contentArea) {
  [fileHandle] = await window.showOpenFilePicker({
    startIn: 'documents',
  });
  const file = await fileHandle.getFile();
  const fileText = await file.text();
  contentArea.value = fileText;
}

async function getNewFileHandle(fileHandle) {
  const options = {
    types: [
      {
        description: 'Text Files',
        accept: {
          'text/plain': ['.txt'],
        },
      },
    ],
    startIn: fileHandle,
  };
  try {
    const handle = await window.showSaveFilePicker(options);
    return handle;
  } catch (error) {
    console.log(error.message);
  }
}

async function writeFile(fileHandle, fileText) {
  try {
    if (fileHandle.createWriter) {
      const writer = await fileHandle.createWriter();
      await writer.write(0, fileText);
      await writer.close();
      return;
    }
    const writable = await fileHandle.createWritable();
    await writable.write(fileText);
    await writable.close();
  } catch (error) {
    console.log(error.message);
  } finally {
    fileText = '';
  }
}

function getCheckboxHandle(checkbox, fileText) {
  if (checkbox.checked) {
    const strToFile = checkbox.id;
    const matchedText = fileText.replace(/\s*-\s/, '#')
    console.log(strToFile);
  }
}

btnAdd.addEventListener('click', () => getAddHandle(firstName, editArea));
btnOpen.addEventListener('click', () => getOpenFileHandle(editArea));
btnSave.addEventListener('click', async () => writeFile(fileHandle, editArea.value));
btnSaveAs.addEventListener('click', async () => writeFile(await getNewFileHandle(fileHandle), editArea.value));
// btnSplit.addEventListener('click', () => getSplitHandle(editArea))

checkBoxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => getCheckboxHandle(checkbox, editArea.value));
})
