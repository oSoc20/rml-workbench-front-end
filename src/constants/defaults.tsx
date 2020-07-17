export const MAPPER_DEFAULT = {
  id: 1,
  category: 'mapper',
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
