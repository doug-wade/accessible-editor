import { WebContainer } from '@webcontainer/api';
import { files } from './files';

const tempFilePath = '/contents.html';
let webcontainerInstance;
let initialized = false;

async function initContainer() {
  if (initialized) {
    return;
  }

  webcontainerInstance = await WebContainer.boot();
  await webcontainerInstance.mount(files);

  const installProcess = await webcontainerInstance.spawn('npm', ['install']);
  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data)
    }
  }));

  const installExitCode = await installProcess.exit;

  if (installExitCode !== 0) {
    throw new Error('Unable to run npm install');
  }

  initialized = true;
}

export default async function (contents) {
  let results = '';

  await initContainer();
  
  // Write contents to temporary file
  await webcontainerInstance.fs.writeFile(tempFilePath, contents);

  const auditProcess = await webcontainerInstance.spawn('npm', ['run', 'audit', '--', tempFilePath]);
  
  auditProcess.output.pipeTo(new WritableStream({
    write(data) {
      results += data;
    }
  }));

  const auditExitCode = await auditProcess.exit;

  if (auditExitCode !== 0) {
    await webcontainerInstance.fs.rm(tempFilePath);
    throw new Error(`Unable to run pa11y audit.\n\n# Output\n${results}`);
  }

  // Remove temporary file
  await webcontainerInstance.fs.rm(tempFilePath);

  return results;
}
