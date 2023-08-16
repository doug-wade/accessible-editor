import './style.css';
import pa11yWrapper from './lib/wrapper';

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

/** @type {HTMLIFrameElement | null} */
const iframeEl = document.querySelector('iframe');

/** @type {HTMLTextAreaElement | null} */
const postContentsButton = document.querySelector('button');

window.addEventListener('load', async () => {
  tinymce.init({
    selector: '.tinymce-editor'
  });

  postContentsButton.addEventListener('click', async () => {
    const results = await pa11yWrapper(tinymce.activeEditor.getContent());
    console.log(results);
  });
});
