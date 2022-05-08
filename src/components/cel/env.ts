import { Definition } from "./compiler";

export const env: Definition = {
    functions: [
        {
            name: '+',
            parameters: [
                {
                    name: 'number1',
                    type: 'number'
                }, {
                    name: 'number2',
                    type: 'number'
                }
            ],
            result: {
                name: 'sum',
                type: 'number'
            }
        },
        {
            name: '-',
            parameters: [
                {
                    name: 'number1',
                    type: 'number'
                }, {
                    name: 'number2',
                    type: 'number'
                }
            ],
            result: {
                name: 'subtraction',
                type: 'number'
            }
        }
    ],
    constants: [
        {
            name: 'datapoint1',
            type: 'number'
        }
    ],
    variables: [
        {
            name: 'magicNumber',
            type: 'number'
        }
    ],
}