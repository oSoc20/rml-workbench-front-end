const KEY_PROJECT = 'KEY_PROJECTS';

export const getProjects = () => {
  const projects = localStorage.getItem(KEY_PROJECT);
  if (projects && projects !== '') {
    return JSON.parse(projects);
  }
  return {};
};

export const saveProject = (id, data) => {
  const projects = getProjects();
  projects[id] = data;
  localStorage.setItem(KEY_PROJECT, JSON.stringify(projects));
};
