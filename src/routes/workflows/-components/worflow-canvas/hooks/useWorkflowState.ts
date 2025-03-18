import {
    Node,
    Edge,
    useNodesState,
    useEdgesState,
    OnNodesChange,
    OnEdgesChange,
    NodeChange,
    EdgeChange,
    applyNodeChanges,
    applyEdgeChanges,
} from "@xyflow/react";
import { useEffect, useCallback } from "react";
import { Plugin, PluginMetadataMap } from "@/types/plugins";
import { WorkflowResponse } from "@/api/types";
import { message } from "antd";

// Create a default start node for new workflows
const createDefaultStartNode = (): Node => ({
    id: "start-node",
    type: Plugin.START,
    position: { x: 250, y: 100 },
    data: {
        label: "Start",
        icon: PluginMetadataMap[Plugin.START].icon,
    },
});

type UseWorkflowStateProps = {
    workflow?: WorkflowResponse;
    onWorkflowChange?: (nodes: Node[], edges: Edge[]) => void;
};

type UseWorkflowStateReturn = {
    nodes: Node[];
    edges: Edge[];
    setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
    setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
};

/**
 * Hook to manage workflow nodes and edges state
 * Handles initialization, updates, and change notifications
 */
export const useWorkflowState = ({ workflow, onWorkflowChange }: UseWorkflowStateProps): UseWorkflowStateReturn => {
    // Initialize with empty arrays
    const [nodes, setNodes] = useNodesState<Node>([])
    const [edges, setEdges] = useEdgesState<Edge>([])

    // Handle node changes
    const onNodesChange = useCallback((changes: NodeChange[]) => {
        // Filter out any attempts to remove start nodes
        const filteredChanges = changes.filter(change => {
            // Block removal of start nodes
            if (
                change.type === 'remove' &&
                nodes.some(node => node.id === change.id && node.type === Plugin.START)
            ) {
                // Show a warning message to the user
                message.warning('Start node cannot be deleted');
                return false;
            }
            return true;
        });

        // Apply remaining changes
        setNodes((nds: Node[]) => applyNodeChanges(filteredChanges, nds) as Node[]);
    }, [nodes, setNodes]);

    // Handle edge changes
    const onEdgesChange = useCallback((changes: EdgeChange[]) => {
        setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds) as Edge[]);
    }, [setEdges]);

    // Load workflow data when available
    useEffect(() => {
        if (workflow) {
            // Only update if nodes/edges are empty or workflow data has changed
            const shouldUpdateNodes =
                nodes.length === 0 ||
                (workflow.nodes &&
                    JSON.stringify(workflow.nodes.map((n: Node) => n.id)) !==
                    JSON.stringify(nodes.map((n: Node) => n.id)));

            const shouldUpdateEdges =
                edges.length === 0 ||
                (workflow.edges &&
                    JSON.stringify(workflow.edges.map((e: Edge) => e.id)) !==
                    JSON.stringify(edges.map((e: Edge) => e.id)));

            // Convert workflow nodes to ReactFlow nodes
            if (shouldUpdateNodes && Array.isArray(workflow.nodes) && workflow.nodes.length > 0) {
                const flowNodes: Node[] = workflow.nodes.map((node: Node) => ({
                    ...node,
                    data: {
                        ...node.data,
                        icon: node.type && PluginMetadataMap[node.type as Plugin]?.icon,
                    },
                }));
                setNodes(flowNodes);
            } else if (nodes.length === 0) {
                // If no nodes, add a default start node
                setNodes([createDefaultStartNode()]);
            }

            // Set edges from workflow
            if (shouldUpdateEdges && Array.isArray(workflow.edges) && workflow.edges.length > 0) {
                setEdges(workflow.edges);
            } else if (edges.length === 0) {
                setEdges([]);
            }
        } else if (nodes.length === 0) {
            // If no workflow and no nodes, initialize with default start node
            setNodes([createDefaultStartNode()]);
            setEdges([]);
        }
    }, [workflow?.id]); // Only depend on workflow ID

    // Notify parent component when nodes or edges change
    useEffect(() => {
        if (onWorkflowChange && (nodes.length > 0 || edges.length > 0)) {
            onWorkflowChange(nodes, edges);
        }
    }, [nodes, edges, onWorkflowChange]);

    return {
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
    };
}; 