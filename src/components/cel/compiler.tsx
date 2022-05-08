
import Rete, { Socket } from "rete";
import { createConstant } from "./constant";
import { env } from "./env";
import { createFunction } from "./function";
import { createVariable } from "./variable";

export const types = ['number', 'string', 'bool'] as const

export type Type = typeof types[number]

export interface Definition {
    variables: Array<Variable>,
    constants: Array<Constant>
    functions: Array<Function>
} 

export interface Variable {
    name: string
    type: Type
}

export interface Constant {
    name: string
    type: Type
}

export interface Function {
    name: string
    parameters: Array<Parameter>
    result: Parameter
}

export interface Parameter {
    type: Type
    name: string
}

const sockets = {} as Record<Type, Socket>

export function initTypes(t: typeof types) {
    t.forEach(type => {
        sockets[type] = new Rete.Socket(type)
    })
} 

export function socket(type: Type): Socket {
    return sockets[type]
}

type CelComponent = {
    node: any;
    builder: any;
}

export function compileEnv(): Array<CelComponent> {
    return [
        ...env.constants.map(createConstant),
        ...env.variables.map(createVariable),
        ...env.functions.map(createFunction),
    ];
}