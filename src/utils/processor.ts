export function getById(processors: any[], id: number) {
  return processors.find((processor: any) => processor.id === id);
}

export function getLastId(processors: any[]) {
  if (processors !== undefined && processors.length !== 0) {
    return processors[processors.length - 1].id;
  }
  return 0;
}

export function removeById(processors: any[], id: number) {
  if (processors !== undefined || processors.length !== 0) {
    return processors.filter((processor: any) => processor.id !== id);
  }
  return [];
}
