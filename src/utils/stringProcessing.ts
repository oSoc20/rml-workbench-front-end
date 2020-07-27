import shortid from 'shortid';

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getExtension(filename: string) {
  return filename.split('.').pop();
}

export function genId() {
  return shortid.generate();
}

export function trimFileExtension(filename: string) {
  return filename.replace(/\.[^/.]+$/, '');
}
