import { EmployeesClass } from "./plugin.employees"; // up version
import { ModelArgs as Setting } from "../types";
import Brain from "../brain/rag/brain";
import { FactoryModel, Memory } from "../brain";
import Runnable from "../brain/rag";
/**
 *
 * @returns
 */
const init = () => {


  return new EmployeesClass();
};

export { init, EmployeesClass };
