import type { BotMethods } from "@builderbot/bot/dist/types";
import { determineAgent } from "./determine";
import { buildPromptEmployee } from "./employee.rol";
import BaseAgent from "./base-agent";
import { Employee, ModelArgs as Setting } from "../types";
import { EVENTS, MemoryDB } from "@builderbot/bot"
import z from "zod"
import { BaseRetriever } from "@langchain/core/retrievers"
import { BaseChatModel } from "@langchain/core/language_models/chat_models"

class EmployeesClass {
  listEmployees: Employee[] = [];
  /**
   *
   * @param {*} employees [] array
   */
  employees = (employees: Employee[] = []) => this.listEmployees = employees;

  /**
   *
   * @param {*} employeeName
   * @returns
   */
  getAgent = (employeeName: string) => {
    const indexEmployee = this.listEmployees.findIndex(
      (emp) => emp.name === employeeName
    );
    return this.listEmployees[indexEmployee];

  };

  /**/
  /*
  determine = async (text: string) => {
    try {

      const messages = [
        {
          role: "system",
          content: buildPromptEmployee(this.listEmployees),
        },
        {
          role: "user",
          content: text,
        },
      ]
      const librarian = BaseAgent
        .setAIModel({ modelName: 'openai' })//on openai
        .setZodSchema(// with this schema
          z.object({// defines call
            name: z.string().nullable().describe('El nombre de la persona por la cual pregunta el usuario'),
            age: z.number().nullable().describe('La edad de la persona por la cual pregunta el usuario'),
            thot: z.string().nullable().describe('tu actual pensamiento')
          })
        ).create()

      if (llmDetermineEmployee?.error) {
        throw new Error(llmDetermineEmployee?.error?.message)
      }

      const bestChoise = determineAgent(
        librarian.ctx.answer.toString()
      );

      const employee = this.getAgent(`${bestChoise?.tool}`);
      return { employee, answer: bestChoise.answer };

    } catch (err) {
      console.log({ err })
      return undefined
    }
  };*/
  /**
   * @param {*} employee 
   * @param {*} ctxFn 
   */
  gotoFlow = (employee: Employee,
    ctxFn: BotMethods) => {
    const flow = employee.flow
    ctxFn.gotoFlow(flow)
  }
}

export { EmployeesClass };
