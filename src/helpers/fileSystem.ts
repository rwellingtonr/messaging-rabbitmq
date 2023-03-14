import * as fs from 'fs';

const dir = 'uploads';

export async function writeFileAsync(filename: string, content: string) {
  checkAndCreateDir();
  await fs.promises.writeFile(`${dir}/${filename}`, content, {
    encoding: 'base64',
  });
}

export function checkAndCreateDir() {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export async function readFileAsync(filename: string) {
  const file = await fs.promises.readFile(`./${dir}/${filename}`, {
    encoding: 'base64',
  });

  return `data:image/jpeg;charset=utf-8;base64,${file}`;
}

export async function deleteFile(filename: string) {
  await fs.promises.unlink(`./${dir}/${filename}`);
}
