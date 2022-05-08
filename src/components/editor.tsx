import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import { compileEnv, initTypes, types } from "./cel/compiler";

initTypes(types)
const env = compileEnv()

// eslint-disable-next-line import/no-anonymous-default-export
export default async function(container: any) {
  console.log(container);

  const builders = env.map(e => new e.builder())
  const nodes = env.map(e => e.node)

  var editor = new Rete.NodeEditor("demo@0.1.0", container);
  editor.use(ConnectionPlugin);
  editor.use(ReactRenderPlugin, {
    components: nodes
  });
  editor.use(ContextMenuPlugin);

  var engine = new Rete.Engine("demo@0.1.0");

  builders.forEach(c => {
    editor.register(c);
    engine.register(c);
  });

  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved" as any,
    async () => {
      console.log("process");
      const json = editor.toJSON()
      await engine.abort();
      await engine.process(json);
      console.log(json)
    }
  );

  editor.fromJSON({
    id: "CEL",
    nodes: {
    //   "1": {
    //     id: 1,
    //     data: {},
    //     inputs: { num1: { connections: [] } },
    //     outputs: {
    //       num: { connections: [{ node: 2, input: "num1", data: {} }] }
    //     },
    //     position: [-285.5, -105.375],
    //     name: "Add"
    //   },
    //   "2": {
    //     id: 2,
    //     data: {},
    //     inputs: {
    //       num1: { connections: [{ node: 1, output: "num", data: {} }] }
    //     },
    //     outputs: { num: { connections: [] } },
    //     position: [-16.5, -99.375],
    //     name: "Add"
    //   }
    }
  });

  editor.view.resize();
  AreaPlugin.zoomAt(editor);
  editor.trigger("process");
}
