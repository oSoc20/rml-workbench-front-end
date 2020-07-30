export function findSources(mapperConfig: string) {
  let regexSourceLine = /rml:source "(.*?)"/gm,
    result,
    indices = [];
  while ((result = regexSourceLine.exec(mapperConfig))) {
    if (result.length > 1 && !indices.includes(result[1])) {
      console.log(result);
      indices.push(result[1]);
    }
  }
  console.log(indices);
  return indices;
}
