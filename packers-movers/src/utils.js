import { config } from "./Services/config";

export function createUrl(path) {
  return `${config.serverUrl}/${path}`;
}
