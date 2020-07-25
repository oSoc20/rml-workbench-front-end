import { ComponentCategory } from './componentCategory';

export const Columns = {
  [ComponentCategory.Source]: {
    title: 'Sources',
    tooltip: 'Input files (e.g. CSV, JSON, XML) and/or an RDF files (e.g. Ntriples, Turtle).',
  },
  [ComponentCategory.Processor]: {
    title: 'Processing',
    tooltip: 'Currently, only mappers are supported for RML processors.',
  },
};

export const COLUMNS_DEFAULT = [
  {
    id: new Date().getTime(),
    name: Columns[ComponentCategory.Source].title,
    category: ComponentCategory.Source,
    components: [],
  },
  {
    id: new Date().getTime() + 1, // or unique hash in future
    name: Columns[ComponentCategory.Processor].title,
    category: ComponentCategory.Processor,
    components: [],
  },
];
