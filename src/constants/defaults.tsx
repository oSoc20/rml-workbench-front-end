export const MAPPER_DEFAULT = {
  id: 1,
  type: 'mapper',
  config: '',
  sources: [],
  target: '.nq',
};

export const RDF_FILE_FORMATS = [
  {
    extension: '.hdt',
    name: 'HDT',
  },
  {
    extension: '.jsonld',
    name: 'JSON-LD',
  },
  {
    extension: '.nq',
    name: 'N-Quads',
  },
  {
    extension: '.trig',
    name: 'TriG',
  },
  {
    extension: '.trix',
    name: 'TriX',
  },
  {
    extension: '.ttl',
    name: 'Turtle',
  },
];

export const MAPPER_CONFIG = [
  {
    type: 'mapper',
  },
];

export const INPUT_CONFIG = [
  {
    type: 'file',
  },
];
