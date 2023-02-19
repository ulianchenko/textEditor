/////////////////////////////////////////////////////////////////
// https://developer.chrome.com/articles/file-system-access/
// https://googlechromelabs.github.io/text-editor/
// https://github.com/GoogleChromeLabs/text-editor/
// https://github.com/GoogleChromeLabs/text-editor/blob/main/src/inline-scripts/fs-helpers.js
// https://css-tricks.com/getting-started-with-the-file-system-access-api/
// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryHandle
// https://developer.mozilla.org/en-US/docs/Web/API/File/webkitRelativePath
// https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#using_hidden_file_input_elements_using_the_click_method
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory
// https://developer.mozilla.org/ru/docs/Web/API/File_API/Using_files_from_web_applications#%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%B0_click_%D1%81%D0%BA%D1%80%D1%8B%D1%82%D1%8B%D1%85_%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2_%D0%B2%D1%8B%D0%B1%D0%BE%D1%80%D0%B0_%D1%84%D0%B0%D0%B9%D0%BB%D0%B0
/////////////////////////////////////////////////////////////////






// const btnSplit = document.querySelector('.btnSplit');
// const btnAdd = document.querySelector('.btnAdd');
// const btnOpen = document.querySelector('.btnOpen');
// const btnSave = document.querySelector('.btnSave');
const btnProjectDirectory = document.querySelector('.btnProjectDirectory');
const btnSaveAs = document.querySelector('.btnSaveAs');
const btnScriptDirectoryOpen = document.querySelector('.scriptDirectoryOpen');
const projectDirectoryName = document.querySelector('.projectDirectoryName');
const aheatOpenBtns = document.querySelectorAll('.aheatOpenBtn');
const aheatDefaultBtn = document.querySelector('.aheatDefaultBtn');

const editArea = document.querySelector('.editArea');
const firstName = document.querySelector('.firstName');
const checkBoxes = document.querySelectorAll('[type="checkbox"]');
const aheatSettingsContainer = document.querySelector('.aheatSettingsContainer');
const aheatInput = document.querySelectorAll('.aheatSetting select, .aheatSetting input');
// const aheatInput = document.querySelector('.aheatSetting input');
// const entryStr = `run:
// #  - aheat
// #  - optipack
// #  - opticheck
// #  scripts_dir:

// #====================================================================#
// `
const entryStrObj = {
  entry: `run:
#  - aheat
#  - optipack
#  - opticheck
#  scripts_dir:

#=====================================================================#
`,
  aheat: `aheat:
#  inv:
#  hld:
#  hlm:
#  hlw:
#  cooling_times:

#=====================================================================#
`,
  optipack: `run_scripts:
optipack: |-
`,
  opticheck: `opticheck:
#   ahl:
#   inv:
#   nfh:
#
#   oa:
#   om:
#   alt: 
#
#   hlf:
#   dmf: 
#   dad:
#   bla: 1/26/2020
#
#   en_lim: 5.0   # < wt%
#   #ct_lim: 10.0  # > years
#   #bu_lim: 40000 # < GWD/MTU
#
#   cam:
#     - 
#
#   base_pattern: &base_pattern
#     amd: n/a
#     mtp: n/a #37
#     reg:
#     hll:
#     nft:
#     dam:
#     ctl:
#     cil:
#   rul:
#     1:
#       <<: *base_pattern
#
#   SFA_check:
#   MPC_check:
#   oa_columns: [___, cam, mpc, lod, mtp, amd, pat, loc, sfa, typ, bnu, enr, dis, hmm, dam, iac, pla, cil, tct, thl, dos, vio, tct, thl, hll, ctl, nfh, nhl]
#   oa_columns: [___, ___, mpc, lod, ___, ___, ___, loc, sfa, typ, bnu, enr, dis, hmm, dam, iac, pla, cil, tct, thl, dos, vio, tct, thl, hll, ctl, nfh, nhl]
#   ignore_empty: True
#
#   custom_check:
#`
};

editArea.value = entryStrObj.entry;
let projectDirectory;

// function getAddHandle(addContent, fileContent) {
//   fileContent.value = `${addContent.value}\n${fileContent.value}`;
//   addContent.value = '';
// }

async function getProjectDirectory(event) {
  projectDirectory = await window.showDirectoryPicker({startIn: 'documents'});
  // const dirSample = new FileSystemDirectoryHandle();
  // console.log(projectDirectory);
  // console.log(dirSample);
  projectDirectoryName.textContent += ` ${projectDirectory.name}`;
  // for await (const entry of projectDirectory.values()) {
  //   console.log(entry.kind, entry.name);
  // }
  event.target.style.boxShadow = '0 0 5px 3px rgb(34, 139, 34)';
}

//////////////////////////////////////////////////
// splits the file text content into lines array
//////////////////////////////////////////////////
// function getSplitHandle(fileContent) {
//   const str = fileContent.value;
//   const strArr = str.split(/\n/gm);
//   console.log(strArr);
// }
//////////////////////////////////////////////////

// let fileHandle;
// async function getOpenFileHandle(contentArea) {
//   [fileHandle] = await window.showOpenFilePicker({
//     startIn: 'documents',
//   });
//   const file = await fileHandle.getFile();
//   const fileText = await file.text();
//   contentArea.value = fileText;
// }

// async function getNewFileHandle(fileHandle) {
//   const options = {
//     types: [
//       {
//         description: 'Text Files',
//         accept: {
//           'text/plain': ['.txt'],
//         },
//       },
//     ],
//     startIn: fileHandle,
//   };
//   try {
//     const handle = await window.showSaveFilePicker(options);
//     return handle;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
async function getNewFileHandle() {
  // const options = {
  //   types: [
  //     {
  //       description: 'Text Files',
  //       accept: {
  //         'text/plain': ['.txt'],
  //       },
  //     },
  //   ],
  //   startIn: projectDirectory,
  // };
  try {
    // const handle = await window.showSaveFilePicker(options);
    const handle = await window.showSaveFilePicker({startIn: projectDirectory});
    return handle;
  } catch (error) {
    console.log(error.message);
  }
}

async function writeFile(fileHandle, contentArea) {
  try {
    // Support for Chrome 82 and earlier.
    if (fileHandle.createWriter) {
      const writer = await fileHandle.createWriter();
      await writer.write(0, contentArea.value);
      await writer.close();
      return;
    }
    // For Chrome 83 and later.
    const writable = await fileHandle.createWritable();
    await writable.write(contentArea.value);
    await writable.close();
  } catch (error) {
    console.log(error.message);
  } finally {
    // contentArea.value = '';
  }
}

// function getCheckboxHandle(checkbox, contentArea) {
//   let newContentAreaText = '';
//   if (checkbox.checked) {
//     const regexIdFirstMatch = new RegExp(`\\s*-\\s${checkbox.id}`);
//     newContentAreaText = contentArea.value.replace(regexIdFirstMatch, matchStr => `\n#${matchStr.slice(1)}`);
//   } else {
//     const regexHashFistMatch = new RegExp(`\#\\s*-\\s${checkbox.id}`);
//     newContentAreaText = contentArea.value.replace(regexHashFistMatch, matchStr => `${matchStr.slice(1)}`);
//   }
//   contentArea.value = newContentAreaText;96
// }



function getCheckboxHandle(checkbox, contentArea) {
  // let newContentAreaText = '';
  // if (checkbox.checked) {
  //   const regexIdFirstMatch = new RegExp(`\#\\s*-\\s${checkbox.id}`);
  //   newContentAreaText = contentArea.value.replace(regexIdFirstMatch, matchStr => `${matchStr.slice(1)}`);
  //   newContentAreaText += entryStrObj[checkbox.id];
  //   aheatSettingsContainer.style.display = 'block';
    
  // } else {
  //   const regexHashFirstMatch = new RegExp(`\\s*-\\s${checkbox.id}`);
  //   newContentAreaText = contentArea.value.replace(regexHashFirstMatch, matchStr => `\n#${matchStr.slice(1)}`);
  //   // const strIndexDeleteFrom = contentArea.value.indexOf(entryStrObj[checkbox.id]);
  //   // newContentAreaText = newContentAreaText.slice(0, strIndexDeleteFrom + 1);
  //   aheatSettingsContainer.style.display = 'none';
  // }
  // contentArea.value = newContentAreaText;

  

  const regexIdFirstMatch = new RegExp(`\#\\s*-\\s${checkbox.id}`);
  contentArea.value = contentArea.value.replace(regexIdFirstMatch, matchStr => `${matchStr.slice(1)}`);
  if (contentArea.value.includes(entryStrObj[checkbox.id])) {
    return;
  }
  contentArea.value += entryStrObj[checkbox.id];
  aheatSettingsContainer.style.display = 'block';
  // contentArea.value = newContentAreaText;
}
async function getScriptDirectoryOpenHandle(button, contentArea) {
  // let newContentAreaText = '';
  const directoryHandle = await window.showDirectoryPicker({startIn: projectDirectory});
  // projectDirectory = directoryHandle;
  // const directoryTree = await directoryHandle.entries();
  // for (const name of directoryTree) {
    // log each entry
    // console.log(name);
  // }
  const regexIdFirstMatch = new RegExp(`\#\\s*${button.id}:`);
  contentArea.value = contentArea.value.replace(regexIdFirstMatch, matchStr => `${matchStr.slice(1)} ../${directoryHandle.name}`);
  // contentArea.value = newContentAreaText;
}

async function getAheatOpenHandle(button, contentArea) {
  // let newContentAreaText = '';
  // [handle] = await window.showOpenFilePicker({startIn: 'documents'});
 const handle = await window.showOpenFilePicker({startIn: projectDirectory});
//  const handle = await self.showOpenFilePicker();
  // console.log(handle);
  // const fileData = await handle.getFile();
  // const fileDirectory = await handle.getDirectory();
  // console.log(fileData);

  // console.log(URL.createObjectURL(fileData));

  // console.log(projectDirectory);

  const relativePaths = await projectDirectory.resolve(handle[0]);
  // console.log(relativePaths);
  // for (const name of relativePaths) {
  //   // log each entry
  //   console.log(name);
  // }

  const path = relativePaths.join('/');
  // console.log(path);
  const regexIdFirstMatch = new RegExp(`\#\\s*${button.id}:`);
  contentArea.value = contentArea.value.replace(regexIdFirstMatch, matchStr => `${matchStr.slice(1)} ../${path}`);
  // contentArea.value = newContentAreaText;

  // const regexIdFirstMatch = new RegExp(`\#\\s*${button.id}:`);
  // newContentAreaText = contentArea.value.replace(regexIdFirstMatch, matchStr => `${matchStr.slice(1)} ../${directoryHandle.name}`);
  // contentArea.value = newContentAreaText;
  // const root = await navigator.storage.getDirectory();
  // const draftHandle = await root.getFileHandle('draft.txt', { create: true });
  // const accessHandle = await draftHandle.createSyncAccessHandle();
  // console.log(root);
  // console.log(draftHandle);
  // console.log(accessHandle);
  // accessHandle.close();
}

// function getAheatSettingsSelect(select, contentArea) {
//   // console.log(event.target.value);
//   const regexIdFirstMatch = new RegExp(`\#\\s*${select.id}:`);
//   contentArea.value = contentArea.value.replace(regexIdFirstMatch, matchStr => `${matchStr.slice(1)} ${select.value}`);
//   // contentArea.value = newContentAreaText;
// }
function getAheatSettingsInput(elem, contentArea) {
  const regexIdFirstMatch = new RegExp(`\#\\s*${elem.id}:`);
  contentArea.value = contentArea.value.replace(regexIdFirstMatch, matchStr => `${matchStr.slice(1)} ${elem.value}`);
  elem.blur();
}

function getAheatDefaultHandle(elem, contentArea) {
  // console.log(elem.dataset.default);
  const regexIdFirstMatch = new RegExp(`\#\\s*${elem.id}:`);
  contentArea.value = contentArea.value.replace(regexIdFirstMatch, matchStr => `${matchStr.slice(1)} ${elem.dataset.default}`);
}

// btnAdd.addEventListener('click', () => getAddHandle(firstName, editArea));
// btnOpen.addEventListener('click', () => getOpenFileHandle(editArea));
// btnSave.addEventListener('click', async () => writeFile(fileHandle, editArea.value));
// btnSaveAs.addEventListener('click', async () => writeFile(await getNewFileHandle(fileHandle), editArea.value));
btnProjectDirectory.addEventListener('click', getProjectDirectory);
btnSaveAs.addEventListener('click', async () => writeFile(await getNewFileHandle(), editArea));
// btnSplit.addEventListener('click', () => getSplitHandle(editArea))

checkBoxes.forEach(checkbox => {
  checkbox.addEventListener('change', event => getCheckboxHandle(event.target, editArea));
});

btnScriptDirectoryOpen.addEventListener('click', event => getScriptDirectoryOpenHandle(event.target, editArea));

aheatOpenBtns.forEach(btn => btn.addEventListener('click', event => getAheatOpenHandle(event.target, editArea)));

// document.querySelector('.aheatInvOpenInp').addEventListener('change', event => console.log(event.target.files[0].webkitRelativePath));

// document.querySelector('.aheatInvOpen').addEventListener('click', event => document.querySelector('.aheatInvOpenInp').click());
// document.querySelector('.aheatInvOpenInp').addEventListener('change', event => console.log(event.target.files));

// aheatSelect.addEventListener('change', event => getAheatSettingsSelect(event.target, editArea));

aheatInput.forEach(elem => elem.addEventListener('change', event => getAheatSettingsInput(event.target, editArea)));

aheatDefaultBtn.addEventListener('click', event => getAheatDefaultHandle(event.target, editArea));