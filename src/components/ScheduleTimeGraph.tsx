import { useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MarkerType,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { formatDate } from "../helpers/helper";

type ScheduleTimeGraphProps = {
  scheduleTimes: ScheduleTimes;
  selectScheduleDate: string;
  selectDate: string;
};

const ScheduleTimeGraph: React.FC<ScheduleTimeGraphProps> = (
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
        id: props.selectScheduleDate,
        data: {
          label: (
            <>
              <button className="btn w-100 h-100 btn-success">
                {formatDate(props.selectScheduleDate)}
              </button>
            </>
          ),
        },
        position: { x: 500, y: y * 50 },
        type: "input",
        style: {
          width: "200px",
        },
      },
      ...Object.keys(
        props.scheduleTimes[props.selectDate][props.selectScheduleDate]
      ).map((key, index) => {
        if (index % 10 === 0) {
          y++;
          x = 0;
        }
        x++;
        let label = "";
        if (index === 0) label = "9am to 12pm";
        else if (index === 1) label = "12pm to 3pm";
        else if (index === 2) label = "3pm to 6pm";
        else label = "6pm to 9pm";

        return {
          id: label,
          data: {
            label: (
              <>
                <button className="btn w-100 h-100 btn-primary">{label}</button>
              </>
            ),
          },
          position: { x: x * 250, y: y * 100 },
          style: {
            width: "200px",
          },
        };
      }),
      ...Object.keys(
        props.scheduleTimes[props.selectDate][props.selectScheduleDate]
      ).map((key, index) => {
        if (index % 10 === 0) {
          y++;
          x = 0;
        }
        x++;
        let label = "";
        let count: number;
        if (index === 0) {
          label = "9am to 12pm";
          count =
            props.scheduleTimes[props.selectDate][props.selectScheduleDate]
              .nine12;
        } else if (index === 1) {
          label = "12pm to 3pm";
          count =
            props.scheduleTimes[props.selectDate][props.selectScheduleDate]
              .twelve3;
        } else if (index === 2) {
          label = "3pm to 6pm";
          count =
            props.scheduleTimes[props.selectDate][props.selectScheduleDate]
              .three6;
        } else {
          label = "6pm to 9pm";
          count =
            props.scheduleTimes[props.selectDate][props.selectScheduleDate]
              .six9;
        }

        return {
          id: "#" + label,
          data: {
            label: (
              <>
                <button className="btn w-100 h-100 btn-secondary">
                  {count + " Scheduled"}
                </button>
              </>
            ),
          },
          position: { x: x * 250, y: y * 100 },
          style: {
            width: "200px",
          },
        };
      }),
    ]);

    setEdges([
      {
        id: "esc1",
        source: props.selectScheduleDate,
        target: "9am to 12pm",
        type: "smoothstep",
        label: "Time",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "esc2",
        source: props.selectScheduleDate,
        target: "12pm to 3pm",
        type: "smoothstep",
        label: "Time",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "esc3",
        source: props.selectScheduleDate,
        target: "3pm to 6pm",
        type: "smoothstep",
        label: "Time",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "esc4",
        source: props.selectScheduleDate,
        target: "6pm to 9pm",
        type: "smoothstep",
        label: "Time",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "e912",
        source: "9am to 12pm",
        target: "#9am to 12pm",
        type: "smoothstep",
        label: "Meals Scheduled",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "e123",
        source: "12pm to 3pm",
        target: "#12pm to 3pm",
        type: "smoothstep",
        label: "Meals Scheduled",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "e36",
        source: "3pm to 6pm",
        target: "#3pm to 6pm",
        type: "smoothstep",
        label: "Meals Scheduled",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "e69",
        source: "6pm to 9pm",
        target: "#6pm to 9pm",
        type: "smoothstep",
        label: "Meals Scheduled",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
    ]);
  }, [props, setEdges, setNodes]);

  return (
    <>
      <h1 className="display-5 mx-auto mt-5">
        Diet planned on {formatDate(props.selectScheduleDate)} for {formatDate(props.selectDate)}
      </h1>
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

export default ScheduleTimeGraph;
