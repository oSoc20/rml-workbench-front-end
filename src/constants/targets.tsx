export const TARGETS_DEFAULT = {
  hdt: {
    extension: '.hdt',
    name: 'HDT',
  },
  jsonld: {
    extension: '.jsonld',
    name: 'JSON-LD',
  },
  nq: {
    extension: '.nq',
    name: 'N-Quads',
  },
  trig: {
    extension: '.trig',
    name: 'TriG',
  },
  trix: {
    extension: '.trix',
    name: 'TriX',
  },
  ttl: {
    extension: '.ttl',
    name: 'Turtle',
  },
};

export const MAPPER_CONFIG = {
  mapper: {
    type: 'mapper',
  },
};

export const INPUT_CONFIG = {
  file: {
    type: 'file',
    acceptedFileExtensions: ['.json', '.xml', '.csv'],
  },
};
