import {ComponentCategory} from "./componentCategory";

export const Columns = {
  [ComponentCategory.Source]: {
    title: 'Sources',
    tooltip: 'Input files (e.g. CSV, JSON, XML) and/or an RDF files (e.g. Ntriples, Turtle).',
  },
  [ComponentCategory.Processor]: {
    title: 'Processing',
    tooltip: 'Currently, only mappers are supported for RML processors.',
  },
  [ComponentCategory.Target]: {
    title: 'Target',
    tooltip: 'Currently, the target can be only a RDF file.',
  }
};
