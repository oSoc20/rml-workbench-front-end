import { genId } from '../utils/stringProcessing';
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
    id: genId(),
    name: Columns[ComponentCategory.Source].title,
    category: ComponentCategory.Source,
    components: [],
  },
  {
    id: genId(),
    name: Columns[ComponentCategory.Processor].title,
    category: ComponentCategory.Processor,
    components: [],
  },
];
