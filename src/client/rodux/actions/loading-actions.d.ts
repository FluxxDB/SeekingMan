import Rodux from "@rbxts/rodux";

export interface ActionSetAssetSize extends Rodux.Action<"SetAssetSize"> {
    assetSize: number;
}

export interface ActionSetPrioritySize extends Rodux.Action<"SetPrioritySize"> {
    prioritySize: number;
}

export interface ActionSetIndex extends Rodux.Action<"SetIndex"> {
    index: number;
}

export interface ActionSetIsLoading extends Rodux.Action<"SetIsLoading"> {
    isLoading: boolean;
}

export interface ActionSetCanSkip extends Rodux.Action<"SetCanSkip"> {
    canSkip: boolean;
}
