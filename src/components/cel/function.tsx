import { PatchedNode } from "./patch"
import Rete from "rete";
import { Socket, Control } from "rete-react-render-plugin";
import { useEffect } from "react";
import { CustomControl } from "../Control";

import * as compiler from './compiler'


function BasicControl(props: any) {
    useEffect(() => {
        props.putData(props.id, props.name);
    }, [props])

    return (
        null
    );
}

function createFunction(fn: compiler.Function) {
    return {
        node: function (props: any) {
            return (
                <PatchedNode
                    {...props}
                    component={({ node, bindSocket, bindControl }, { outputs, controls, inputs, selected }) => (
                        <div className={`node ${selected}`}>
                            <div className="title">{node.name}</div>
                            {/* Outputs */}
                            {outputs.map((output: any) => (
                                <div className="output" key={output.key}>
                                    <div className="output-title">{output.name}</div>
                                    <Socket
                                        type="output"
                                        socket={output.socket}
                                        io={output}
                                        innerRef={bindSocket}
                                    />
                                </div>
                            ))}
                            {/* Controls */}
                            {controls.map((control: any) => (
                                <Control
                                    className="control"
                                    key={control.key}
                                    control={control}
                                    innerRef={bindControl}
                                />
                            ))}
                            {/* Inputs */}
                            {inputs.map((input: any) => (
                                <div className="input" key={input.key}>
                                    <Socket
                                        type="input"
                                        socket={input.socket}
                                        io={input}
                                        innerRef={bindSocket}
                                    />
                                    {!input.showControl() && (
                                        <div className="input-title">{input.name}</div>
                                    )}
                                    {input.showControl() && (
                                        <Control
                                            className="input-control"
                                            control={input.control}
                                            innerRef={bindControl}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                />
            )
        },
        builder: class extends Rete.Component {
            constructor() {
              super(fn.name);
            }
          
            builder(node: any) {
                fn.parameters.forEach(parameter => {
                    const param = new Rete.Input(parameter.name, parameter.type, compiler.socket(parameter.type))
                    node = node.addInput(param)
                })
                const result = new Rete.Output(fn.result.name, fn.result.type, compiler.socket(fn.result.type))
                node = node.addOutput(result)

                const ctrl = new CustomControl(this.editor, BasicControl, fn.name, fn.name)
                node = node.addControl(ctrl)

                return node;
            }
          
            worker(node: any, inputs: any, outputs: any) {
              console.log(node);
            }
        }
    }
}



export {
    createFunction
}