import { Node } from "@xyflow/react";
import { useCallback, useState } from "react";
import { FormData } from "../../workflow-drawer";

type UseWorkflowFormProps = {
    setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
};

type UseWorkflowFormReturn = {
    selectedNode: Node | null;
    drawerOpen: boolean;
    onNodeClick: (_: React.MouseEvent, node: Node) => void;
    onDrawerClose: () => void;
    onNodeFormChange: (nodeId: string, formData: FormData) => void;
};

/**
 * Hook to manage workflow form operations
 * Handles node selection and form data updates
 */
export const useWorkflowForm = ({ setNodes }: UseWorkflowFormProps): UseWorkflowFormReturn => {
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Handle node click to open drawer
    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        setSelectedNode(node);
        setDrawerOpen(true);
    }, []);

    // Handle drawer close
    const onDrawerClose = useCallback(() => {
        setDrawerOpen(false);
    }, []);

    // Update node data when form values change
    const onNodeFormChange = useCallback(
        (nodeId: string, formData: FormData) => {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === nodeId) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                ...formData,
                            },
                        };
                    }
                    return node;
                })
            );
        },
        [setNodes]
    );

    return {
        selectedNode,
        drawerOpen,
        onNodeClick,
        onDrawerClose,
        onNodeFormChange,
    };
}; 