import { useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { formatDate } from "../helpers/helper";

type ScheduleDateGraphProps = {
  scheduleDates: ScheduleDates;
  selectDate: string;
  setSelectScheduleDate: (value: string) => void;
};

const ScheduleDateGraph: React.FC<ScheduleDateGraphProps> = (
  props
): JSX.Element => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  useEffect(() => {
    let x = 1,
      y = 1;
    setNodes([
      {
        id: props.selectDate,
        data: {
          label: (
            <>
              <button className="btn w-100 h-100 btn-success">
                {formatDate(props.selectDate)}
              </button>
            </>
          ),
        },
        position: { x: 1.5 * 500, y: y * 150 },
        type: "input",
        style: {
          width: "200px",
        },
      },
    ]);

    x++;

    if (props.scheduleDates) {
      setNodes((nodes) => [
        ...nodes,
        ...Object.keys(props.scheduleDates[props.selectDate]).map(
          (scheduleDate, index): Node<any> => {
            if (index % 10 === 0) {
              y++;
              x = 0;
            }
            x++;
            return {
              id: "#" + index,
              data: {
                label: (
                  <>
                    <button
                      className="btn w-100 h-100 btn-primary"
                      onClick={() => {
                        props.setSelectScheduleDate(scheduleDate);
                      }}
                    >
                      {formatDate(scheduleDate)}
                    </button>
                  </>
                ),
              },
              position: { x: x * 250, y: y * 100 },
              style: {
                width: "200px",
              },
            };
          }
        ),
      ]);

      setNodes((nodes) => {
        x = 1;
        y++;
        return [
          ...nodes,
          ...Object.keys(props.scheduleDates[props.selectDate]).map(
            (scheduleDate, index): Node<any> => {
              if (index % 10 === 0) {
                y++;
                x = 0;
              }
              x++;
              return {
                id: scheduleDate + "#" + index,
                data: {
                  label: (
                    <>
                      <button className="btn w-100 h-100">
                        {props.scheduleDates
                          ? props.scheduleDates[props.selectDate][
                              scheduleDate
                            ] + " Scheduled"
                          : ""}
                      </button>
                    </>
                  ),
                },
                position: { x: x * 250, y: y * 100 },
                style: {
                  width: "200px",
                },
              };
            }
          ),
        ];
      });

      setEdges([
        ...Object.keys(props.scheduleDates[props.selectDate]).map(
          (scheduleDate, index): Edge<any> => {
            return {
              id: "e" + index + "-" + scheduleDate,
              source: "#" + index,
              target: scheduleDate + "#" + index,
              type: "smoothstep",
              label: "Meals Scheduled",
              animated: true,
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
            };
          }
        ),
        ...Object.keys(props.scheduleDates[props.selectDate]).map(
          (scheduleDate, index): Edge<any> => {
            return {
              id: "e" + props.selectDate + "-" + index,
              source: props.selectDate,
              target: "#" + index,
              type: "smoothstep",
              label: "Scheduled By Dates",
              animated: true,
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
            };
          }
        ),
      ]);
    }
  }, [props, setEdges, setNodes]);

  return (
    <>
      <h1 className="display-3 mx-auto mt-5">Diet Plan on Scheduled on {formatDate(props.selectDate)}</h1>
      <ReactFlow
        className="my-3 mx-auto"
        style={{
          height: "500px",
          width: "90vw",
          boxSizing: "border-box",
        }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background color="blue" gap={8} />
      </ReactFlow>
    </>
  );
};

export default ScheduleDateGraph;
