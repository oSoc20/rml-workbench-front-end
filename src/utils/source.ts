import { isAlreadyAdded } from './stringProcessing';

export function addSource(source: any, sources: any[]) {
  if (!isAlreadyAdded(source.name, sources)) {
    return sources.concat(source);
  }
  return sources;
}

export function removeSource(name: string, sources: any[]) {
  if (sources !== undefined || sources.length != 0) {
    return sources.filter((source: any) => source.name !== name);
  }
  return [];
}
