  import { useEffect, useState } from "react";
  import { Graph } from "react-d3-graph";
  import { getDeviceModels} from "../api/devices.api";
  import { getConnectionGraph } from "../api/connections.api";

  export function ConnectionsGraph() {
    const [device_models, setDeviceModels] = useState([]);
    const [connection_sources, setConnectionSource] = useState([]);
    const [connection_targets, setConnectionTarget] = useState([]);
    const [connection_labels, setConnectionLabels] = useState([]);

    const [loading, setLoading] = useState(true); // State to track API call status
    const [secondloading, secondSetLoading] = useState(true); // State to track API call status

    useEffect(() => {
      async function loadDeviceModels() {
        try {
          const res = await getDeviceModels();
          setDeviceModels(res.data["models"]);
          setLoading(false); // Set loading to false when API call is successful
        } catch (error) {
          console.error("Error fetching device models:", error);
          setLoading(false); // Set loading to false even if there's an error
        }
      }
      loadDeviceModels();
    }, []);

    useEffect(() => {
        async function loadConnectionInfo() {
          try {
            const res = await getConnectionGraph();
            setConnectionSource(res.data["first_devices"]);
            setConnectionTarget(res.data["second_devices"]);
            setConnectionLabels(res.data["protocols"]);

            secondSetLoading(false); // Set loading to false when API call is successful
          } catch (error) {
            console.error("Error fetching device models:", error);
            secondSetLoading(false); // Set loading to false even if there's an error
          }
        }
        loadConnectionInfo();
      }, []);
  
  
    const nodes = device_models.map((name) => ({ id: name }));
    const links = connection_sources.map((source, index) => ({
        source: source,
        target: connection_targets[index],
        label: connection_labels[index]
      }));
    const graph_data = {
      nodes: nodes,
      links: links,
    };
  
    const config = {
        
        directed: false,
        automaticRearrangeAfterDropNode: true,
        collapsible: true,
        highlightDegree: 2,
        highlightOpacity: 0.2,
        linkHighlightBehavior: true,
        maxZoom: 12,
        minZoom: 0.05,
        width: window.innerWidth,
        height: window.innerHeight,
        nodeHighlightBehavior: true, // comment this to reset nodes positions to work
        panAndZoom: false,
        staticGraph: false,
        d3: {
          alphaTarget: 0.05,
          gravity: -2000,
          linkLength: 200,
          linkStrength: 2
        },
        node: {
          color: "white",
          fontColor: "white",
          fontSize: 16,
          fontWeight: "normal",
          highlightColor: "blue",
          highlightFontSize: 14,
          highlightFontWeight: "bold",
          highlightStrokeWidth: 1.5,
          mouseCursor: "crosshair",
          opacity: 0.9,
          renderLabel: true,
          size: 800,
          strokeColor: "none",
          strokeWidth: 1.5,
          symbolType: "circle",
          viewGenerator: null
        },
        link: {
            color: "#d3d3d3",
            fontColor: "white",
            fontSize: 16,
            fontWeight: "normal",
            highlightColor: "blue",
            highlightFontSize: 8,
            highlightFontWeight: "bold",
            labelProperty: "label",
            mouseCursor: "pointer",
            opacity: 1,
            renderLabel: true,
            semanticStrokeWidth: true,
            strokeWidth: 1.5,
            markerHeight: 6,
            markerWidth: 6,
            strokeDasharray: 0,
            strokeDashoffset: 0,
            strokeLinecap: "butt"
         
        }
      };
  
    const onClickNode = function (nodeId) {
      window.location.replace("/dashboard/" + nodeId);
    };
  
    const onClickLink = function (source, target) {
      window.alert(`Clicked link between ${source} and ${target}`);
    };
  
    return (
      <>
        {loading && secondloading ? (
          <div>Loading...</div>
        ) : (
          <Graph
            id="graph-id"
            data={graph_data}
            config={config}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
          />
        )}
      </>
    );
  }