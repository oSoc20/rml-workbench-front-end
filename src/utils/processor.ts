import { MAPPER_DEFAULT } from '../constants/defaults';

export function addProcessor(processors: any[]) {
  let newProcessor = Object.assign({}, MAPPER_DEFAULT);
  const lastId = getLastId(processors);
  if (lastId != 0) {
    newProcessor.id = lastId + 1;
  }
  return processors.concat(newProcessor);
}

export function getById(processors: any[], id: number) {
  return processors.find((processor: any) => processor.id === id);
}

export function getConfig(processor: any) {
  if (processor !== undefined) {
    return processor.config;
  }
  return MAPPER_DEFAULT.config;
}

export function getLastId(processors: any[]) {
  if (processors !== undefined && processors.length != 0) {
    return processors[processors.length - 1].id;
  }
  return 0;
}

export function removeById(processors: any[], id: number) {
  if (processors !== undefined || processors.length != 0) {
    return processors.filter((processor: any) => processor.id !== id);
  }
  return [];
}
