import { RDF_FILE_FORMATS } from '../constants/defaults';

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getExtension(filename: string) {
  return filename.split('.').pop();
}

export function getFilename(filename: string) {
  return filename.split('.').slice(0, -1).join('.');
}

export function getRdfFileFormat(name: string) {
  return RDF_FILE_FORMATS.find((fileFormat: any) => fileFormat.name === name);
}

export function getRdfByExtension(extension: string) {
  return RDF_FILE_FORMATS.find((fileFormat: any) => fileFormat.extension === extension);
}

export function trimFilename(filename: string) {
  return filename.replace(/^.*[\\/]/, '');
}

export function isAlreadyAdded(filename: string, array: any[]) {
  for (const element of array) {
    if (element.name === filename) {
      return true;
    }
  }
  return false;
}
