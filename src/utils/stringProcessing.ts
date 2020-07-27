import shortid from 'shortid';

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getExtension(filename: string) {
  console.log(filename);
  return '' /*filename.split('.').pop()*/;
}

export function genId() {
  return shortid.generate();
}

export function trimFileExtension(filename: string) {
  console.log(filename);
  return '' /*filename.replace(/\.[^/.]+$/, '')*/;
}
