import { EmployeesClass } from "./plugin.employees"; // up version
import { ModelArgs as Setting } from "../types";
import Brain from "../brain/rag/brain";
import Runnable from "../brain/rag";
/**
 *
 * @param  {Object}  settings
 * @param  {String}  settings.model    model gpt-3.5-turbo
 * @param  {Array}   settings.temperature  0
 * @param  {Integer} settings.apiKey     your api key opena
 * @returns
 */
const init = () => {
  return new EmployeesClass();
};

export { init, EmployeesClass };
