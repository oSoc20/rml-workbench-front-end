import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
export default history;

export function redirectTo(url: string) {
  history.push(url);
}
