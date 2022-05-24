export function grabOrCreate<T extends keyof CreatableInstances>(
    parent: Instance,
    name: string,
    className: T,
): CreatableInstances[T] {
    let object = parent.FindFirstChild(name);
    if (object) return object as CreatableInstances[T];

    object = new Instance(className);
    object.Name = name;
    object.Parent = parent;

    return object as CreatableInstances[T];
}
