export function findSources(mapperConfig: string) {
  let regexSourceLine = /(?<=\/input\/)\w*.\w*/gi,
    result,
    indices = [];
  while ((result = regexSourceLine.exec(mapperConfig))) {
    if (!indices.includes(result[0])) indices.push(result[0]);
  }
  return indices;
}
