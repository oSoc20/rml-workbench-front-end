export function removeSource(name: string, sources: any[]) {
  if (sources !== undefined || sources.length !== 0) {
    return sources.filter((source: any) => source.name !== name);
  }
  return [];
}
