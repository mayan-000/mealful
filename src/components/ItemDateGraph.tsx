import { useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  useNodesState,
} from "react-flow-renderer";
import { formatDate } from "../helpers/helper";

type ItemDateGraphProps = {
  dates: string[] | undefined;
  selectDate: string;
  setSelectDate: (value: string) => void;
  setSelectScheduleDate: (value: string) => void;
};

const ItemDateGraph: React.FC<ItemDateGraphProps> = (props): JSX.Element => {
  const [nodes, setNodes, OnNodesChange] = useNodesState([]);

  useEffect(() => {
    if (props.dates) {
      let x = 1,
        y = 1;
      setNodes(
        props.dates.map((date, index): Node<any> => {
          if (index % 10 === 0) {
            y++;
            x = 0;
          }
          x++;
          return {
            id: index.toString(),
            data: {
              label: (
                <>
                  <button
                    className={`btn w-100 h-100 fs-1 ${
                      props.selectDate === date ? "btn-primary" : "btn-success"
                    }`}
                    onClick={() => {
                      props.setSelectScheduleDate("-1")
                      props.setSelectDate(date);
                    }}
                  >
                    {formatDate(date)}
                  </button>
                </>
              ),
            },
            position: { x: x * 500, y: y * 150 },
            style: {
              width: "450px",
              height: "100px",
            },
          };
        })
      );
    }
  }, [props, setNodes]);

  return (
    <>
      <h1 className="display-3 mx-auto mt-5">Select a Date and Scroll</h1>
      <ReactFlow
        className="my-3 mx-auto"
        style={{
          height: "500px",
          width: "90vw",
          boxSizing: "border-box",
        }}
        nodes={nodes}
        onNodesChange={OnNodesChange}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background color="red" gap={8} />
      </ReactFlow>
    </>
  );
};

export default ItemDateGraph;
