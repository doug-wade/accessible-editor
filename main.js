import './style.css';
import { WebContainer } from '@webcontainer/api';
import { files as cliFiles } from './cli-files';
import { files as httpServerFiles } from './http-server-files';

/** @type {import('@webcontainer/api').WebContainer}  */
let httpServerWebcontainerInstance;

/** @type {import('@webcontainer/api').WebContainer}  */
let cliWebcontainerInstance;

/** @type boolean */
let httpServerBooting = true;

/** @type boolean */
let cliBooting = true;

window.addEventListener('load', async () => {
  tinymce.activeEditor.setContent(`
    <div>
      <a href="#">click me</a>
      <img src="https://www.skilljar.com/wp-content/uploads/2019/06/skilljar_logo.svg">
    </div>
  `);

  postContentsButton.addEventListener('click', async () => {
    cliBooting = true;
    await writeIndexHtml(tinymce.activeEditor.getContent());
  });

  // Call only once
  httpServerWebcontainerInstance = await WebContainer.boot();
  cliWebcontainerInstance = await WebContainer.boot();

  await Promise.all([
    httpServerWebcontainerInstance.mount(httpServerFiles),
    cliWebcontainerInstance.mount(cliFiles),
  ]);

  const exitCode = await installDependencies();
  if (exitCode !== 0) {
    throw new Error('Installation failed');
  }

  cliBooting = false;

  startDevServer();
});

async function installDependencies() {
  // Install dependencies
  return await Promise.all([
    httpServerWebcontainerInstance,
    cliWebcontainerInstance,
  ])
    .map((webContainerInstance) =>
      webContainerInstance.spawn('npm', ['install'])
    )
    .map((process) => process.exit);
}

async function startDevServer() {
  // Run `npm run start` to start the Express app
  await httpServerWebcontainerInstance.spawn('npm', ['run', 'start']);

  // Wait for `server-ready` event
  httpServerWebcontainerInstance.on('server-ready', (port, url) => {
    iframeEl.src = url;
    cliBooting = false;
  });
}

/**
 * @param {string} content
 */

async function writeIndexHtml(contentFragment) {
  const content = `<html lang="en"><head></head><body>${contentFragment}</body>`;
  await httpServerWebcontainerInstance.fs.writeFile('/index.html', content);
}

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="editor">
      <textarea class="tinymce-editor">I am a textarea</textarea>
    </div>
    <div class="preview">
      <iframe src="loading.html"></iframe>
    </div>
  </div>
`;

tinymce.init({
  selector: '.tinymce-editor'
});

/** @type {HTMLIFrameElement | null} */
const iframeEl = document.querySelector('iframe');

/** @type {HTMLTextAreaElement | null} */
const postContentsButton = document.querySelector('button');
