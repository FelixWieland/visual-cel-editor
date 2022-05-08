import { Node } from "rete-react-render-plugin";

interface NodeProps {
    node: any
    bindSocket: any
    bindControl: any
}

interface NodeState {
    outputs: any
    controls: any 
    inputs: any
    selected: any 
}

interface PatchedNodeProps {
    component: (props: NodeProps, state: NodeState) => JSX.Element
}

export class _PatchedNode extends Node {
    render() {
        console.log(this.props, this.state)
        return (this.props as any).component(this.props, this.state)
    }
}

export const PatchedNode = _PatchedNode as unknown as (props: PatchedNodeProps) => JSX.Element
