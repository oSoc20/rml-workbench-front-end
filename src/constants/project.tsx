import { COLUMNS_DEFAULT } from './columns';
import { CONFIG_DEFAULT } from './config';

export const PROJECT_DEFAULT = {
  columns: [...COLUMNS_DEFAULT.map((col) => ({ ...col }))],
  config: { ...CONFIG_DEFAULT },
};
