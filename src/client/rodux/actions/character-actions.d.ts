import Rodux from "@rbxts/rodux";

export interface ActionSetReady extends Rodux.Action<"SetReady"> {
    ready: boolean;
}
