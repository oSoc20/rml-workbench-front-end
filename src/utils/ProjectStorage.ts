const KEY_PROJECT = 'KEY_PROJECTS';

export const isProjectExist = (id: string) => {
  return id in getProjects();
};

export const getProjects = () => {
  const projects = localStorage.getItem(KEY_PROJECT);
  if (projects && projects !== '') {
    return JSON.parse(projects);
  }
  return {};
};

export const saveProject = (id: string, data: any) => {
  const projects = getProjects();
  projects[id] = data;
  localStorage.setItem(KEY_PROJECT, JSON.stringify(projects));
};

export const removeProject = (project: any) => {
  let tmp = Object.entries(getProjects()).filter(([value]) => value !== project.id);
  let tmpToObject = Object.fromEntries(tmp);
  saveProjects(tmpToObject);
};

export const saveProjects = (projects: any) => {
  localStorage.setItem(KEY_PROJECT, JSON.stringify(projects));
};
