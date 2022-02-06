import { GraphVisitor, TraversalActions } from '@parcel/types';

declare type NodeId = number;
declare function toNodeId(x: number): NodeId;
declare function fromNodeId(x: NodeId): number;
declare type ContentKey = string;
declare type Edge<TEdgeType extends number> = {
    from: NodeId;
    to: NodeId;
    type: TEdgeType;
};

declare type SerializedAdjacencyList<TEdgeType> = {
    nodes: Uint32Array;
    edges: Uint32Array;
};
declare type AdjacencyListOptions<TEdgeType> = {
    edgeCapacity?: number;
    nodeCapacity?: number;
};
declare class AdjacencyList<TEdgeType extends number = 1> {
    #private;
    constructor(opts?: SerializedAdjacencyList<TEdgeType | NullEdgeType> | AdjacencyListOptions<TEdgeType | NullEdgeType>);
    /**
     * Create a new `AdjacencyList` from the given options.
     */
    static deserialize<TEdgeType extends number = any>(opts: SerializedAdjacencyList<TEdgeType>): AdjacencyList<TEdgeType>;
    /**
     * Returns a serializable object of the nodes and edges in the graph.
     */
    serialize(): SerializedAdjacencyList<TEdgeType>;
    get stats(): {
        /** The number of nodes in the graph. */
        nodes: number;
        /** The number of edge types associated with nodes in the graph. */
        nodeEdgeTypes: number;
        /** The maximum number of nodes the graph can contain. */
        nodeCapacity: number;
        /** The size of the raw nodes buffer, in mb. */
        nodeBufferSize: string;
        /** The current load on the nodes array. */
        nodeLoad: string;
        /** The number of edges in the graph. */
        edges: number;
        /** The number of edges deleted from the graph. */
        deleted: number;
        /** The maximum number of edges the graph can contain. */
        edgeCapacity: number;
        /** The size of the raw edges buffer, in mb. */
        edgeBufferSize: string;
        /** The current load on the edges array, including deletes. */
        edgeLoadWithDeletes: string;
        /** The current load on the edges array. */
        edgeLoad: string;
        /** The total number of edge hash collisions. */
        collisions: number;
        /** The number of collisions for the most common hash. */
        maxCollisions: number;
        /** The average number of collisions per hash. */
        avgCollisions: number;
        /** The likelihood of uniform distribution. ~1.0 indicates certainty. */
        uniformity: number;
    };
    /**
     * Resize the internal nodes array.
     *
     * This is used in `addNode` when the `numNodes` meets or exceeds
     * the allocated size of the `nodes` array.
     */
    resizeNodes(size: number): void;
    /**
     * Resize the internal edges array.
     *
     * This is used in `addEdge` when the `numEdges` meets or exceeds
     * the allocated size of the `edges` array.
     */
    resizeEdges(size: number): void;
    /**
     * Adds a node to the graph.
     *
     * Returns the id of the added node.
     */
    addNode(): NodeId;
    /**
     * Adds an edge to the graph.
     *
     * Returns `true` if the edge was added,
     * or `false` if the edge already exists.
     */
    addEdge(from: NodeId, to: NodeId, type?: TEdgeType | NullEdgeType): boolean;
    getAllEdges(): Iterator<{
        type: TEdgeType | NullEdgeType;
        from: NodeId;
        to: NodeId;
    }>;
    /**
     * Check if the graph has an edge connecting the `from` and `to` nodes.
     */
    hasEdge(from: NodeId, to: NodeId, type?: TEdgeType | NullEdgeType): boolean;
    /**
     *
     */
    removeEdge(from: NodeId, to: NodeId, type?: TEdgeType | NullEdgeType): void;
    hasInboundEdges(to: NodeId): boolean;
    getInboundEdgesByType(to: NodeId): {
        type: TEdgeType | NullEdgeType;
        from: NodeId;
    }[];
    getOutboundEdgesByType(from: NodeId): {
        type: TEdgeType | NullEdgeType;
        to: NodeId;
    }[];
    /**
     * Get the list of nodes connected from this node.
     */
    getNodeIdsConnectedFrom(from: NodeId, type?: AllEdgeTypes | TEdgeType | NullEdgeType | Array<TEdgeType | NullEdgeType>): NodeId[];
    /**
     * Get the list of nodes connected to this node.
     */
    getNodeIdsConnectedTo(to: NodeId, type?: AllEdgeTypes | TEdgeType | NullEdgeType | Array<TEdgeType | NullEdgeType>): NodeId[];
    inspect(): any;
}

declare type NullEdgeType = 1;
declare type GraphOpts<TNode, TEdgeType extends number = 1> = {
    nodes?: Map<NodeId, TNode>;
    adjacencyList?: SerializedAdjacencyList<TEdgeType>;
    rootNodeId?: NodeId | null;
};
declare type SerializedGraph<TNode, TEdgeType extends number = 1> = {
    nodes: Map<NodeId, TNode>;
    adjacencyList: SerializedAdjacencyList<TEdgeType>;
    rootNodeId: NodeId | undefined | null;
};
declare type AllEdgeTypes = -1;
declare const ALL_EDGE_TYPES: AllEdgeTypes;
declare class Graph<TNode, TEdgeType extends number = 1> {
    nodes: Map<NodeId, TNode>;
    adjacencyList: AdjacencyList<TEdgeType>;
    rootNodeId: NodeId | undefined | null;
    constructor(opts?: GraphOpts<TNode, TEdgeType> | null);
    setRootNodeId(id?: NodeId | null): void;
    static deserialize<TNode = any, TEdgeType extends number = any>(opts: GraphOpts<TNode, TEdgeType>): Graph<TNode, TEdgeType>;
    serialize(): SerializedGraph<TNode, TEdgeType>;
    getAllEdges(): Iterator<Edge<TEdgeType | NullEdgeType>>;
    addNode(node: TNode): NodeId;
    hasNode(id: NodeId): boolean;
    getNode(id: NodeId): TNode | undefined | null;
    addEdge(from: NodeId, to: NodeId, type?: TEdgeType | NullEdgeType): boolean;
    hasEdge(from: NodeId, to: NodeId, type?: TEdgeType | NullEdgeType): boolean;
    getNodeIdsConnectedTo(nodeId: NodeId, type?: TEdgeType | NullEdgeType | Array<TEdgeType | NullEdgeType> | AllEdgeTypes): Array<NodeId>;
    getNodeIdsConnectedFrom(nodeId: NodeId, type?: TEdgeType | NullEdgeType | Array<TEdgeType | NullEdgeType> | AllEdgeTypes): Array<NodeId>;
    removeNode(nodeId: NodeId): void;
    removeEdges(nodeId: NodeId, type?: TEdgeType | NullEdgeType): void;
    removeEdge(from: NodeId, to: NodeId, type?: TEdgeType | NullEdgeType, removeOrphans?: boolean): void;
    isOrphanedNode(nodeId: NodeId): boolean;
    updateNode(nodeId: NodeId, node: TNode): void;
    replaceNodeIdsConnectedTo(fromNodeId: NodeId, toNodeIds: ReadonlyArray<NodeId>, replaceFilter?: null | ((a: NodeId) => boolean), type?: TEdgeType | NullEdgeType): void;
    traverse<TContext>(visit: GraphVisitor<NodeId, TContext>, startNodeId?: NodeId | null, type?: TEdgeType | NullEdgeType | Array<TEdgeType | NullEdgeType> | AllEdgeTypes): TContext | undefined | null;
    filteredTraverse<TValue, TContext>(filter: (b: NodeId, a: TraversalActions) => TValue | undefined | null, visit: GraphVisitor<TValue, TContext>, startNodeId?: NodeId | null, type?: TEdgeType | Array<TEdgeType | NullEdgeType> | AllEdgeTypes): TContext | undefined | null;
    traverseAncestors<TContext>(startNodeId: NodeId | undefined | null, visit: GraphVisitor<NodeId, TContext>, type?: TEdgeType | NullEdgeType | Array<TEdgeType | NullEdgeType> | AllEdgeTypes): TContext | undefined | null;
    dfs<TContext>({ visit, startNodeId, getChildren, }: {
        visit: GraphVisitor<NodeId, TContext>;
        getChildren(nodeId: NodeId): Array<NodeId>;
        startNodeId?: NodeId | null;
    }): TContext | undefined | null;
    bfs(visit: (nodeId: NodeId) => boolean | undefined | null): NodeId | undefined | null;
    topoSort(type?: TEdgeType): Array<NodeId>;
    findAncestor(nodeId: NodeId, fn: (nodeId: NodeId) => boolean): NodeId | undefined | null;
    findAncestors(nodeId: NodeId, fn: (nodeId: NodeId) => boolean): Array<NodeId>;
    findDescendant(nodeId: NodeId, fn: (nodeId: NodeId) => boolean): NodeId | undefined | null;
    findDescendants(nodeId: NodeId, fn: (nodeId: NodeId) => boolean): Array<NodeId>;
    _assertHasNodeId(nodeId: NodeId): void;
}
declare function mapVisitor<NodeId, TValue, TContext>(filter: (b: NodeId, a: TraversalActions) => TValue | undefined | null, visit: GraphVisitor<TValue, TContext>): GraphVisitor<NodeId, TContext>;

declare type ContentGraphOpts<TNode, TEdgeType extends number = 1> = {
    _contentKeyToNodeId: Map<ContentKey, NodeId>;
    _nodeIdToContentKey: Map<NodeId, ContentKey>;
} & GraphOpts<TNode, TEdgeType>;
declare type SerializedContentGraph<TNode, TEdgeType extends number = 1> = {
    _contentKeyToNodeId: Map<ContentKey, NodeId>;
} & SerializedGraph<TNode, TEdgeType>;
declare class ContentGraph<TNode, TEdgeType extends number = 1> extends Graph<TNode, TEdgeType> {
    _contentKeyToNodeId: Map<ContentKey, NodeId>;
    _nodeIdToContentKey: Map<NodeId, ContentKey>;
    constructor(opts?: ContentGraphOpts<TNode, TEdgeType> | null);
    static deserialize<TNode = any, TEdgeType extends number = any>(opts: ContentGraphOpts<TNode, TEdgeType>): ContentGraph<TNode, TEdgeType>;
    serialize(): SerializedContentGraph<TNode, TEdgeType>;
    addNodeByContentKey(contentKey: ContentKey, node: TNode): NodeId;
    addNodeByContentKeyIfNeeded(contentKey: ContentKey, node: TNode): NodeId;
    getNodeByContentKey(contentKey: ContentKey): TNode | undefined | null;
    getNodeIdByContentKey(contentKey: ContentKey): NodeId;
    hasContentKey(contentKey: ContentKey): boolean;
    removeNode(nodeId: NodeId): void;
}

export { ALL_EDGE_TYPES, ContentGraph, ContentGraphOpts, ContentKey, Edge, Graph, GraphOpts, NodeId, SerializedContentGraph, fromNodeId, mapVisitor, toNodeId };
