export function findSources(mapperconfig: string) {
  var regexSourceLine = /(?<=\/input\/)\w*.\w*/gi,
    result,
    indices = [];
  while ((result = regexSourceLine.exec(mapperconfig))) {
    if (!indices.includes(result[0])) indices.push(result[0]);
  }
  return indices;
}
