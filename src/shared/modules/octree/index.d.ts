declare interface Octree<T> {
    ClearNodes(): void
    GetAllNodes(): T[]
    CreateNode(position: Vector3, object: T): unknown
    RadiusSearch(position: Vector3, radius: number): T[]
    KNearestNeighborsSearch(position: Vector3, k: number, radius: number): T
}

declare interface OctreeConstructor {
    new <T>(): Octree<T>
}

declare const Octree: OctreeConstructor
export = Octree
