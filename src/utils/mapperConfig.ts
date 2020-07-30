export function findSources(mapperConfig: string) {
  let regexSourceLine = /(?<=rml:source )"(\w*.\w*)"/g,
    result,
    indices = [];
  while ((result = regexSourceLine.exec(mapperConfig))) {
    if (!indices.includes(result[0])) indices.push(result[0]);
  }
  return indices;
}
