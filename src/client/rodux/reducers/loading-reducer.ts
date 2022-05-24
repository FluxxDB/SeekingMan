import Rodux from "@rbxts/rodux";
import {
    ActionSetAssetSize,
    ActionSetCanSkip,
    ActionSetIndex,
    ActionSetIsLoading,
    ActionSetPrioritySize,
} from "../actions/loading-actions";

export interface ILoadingReducer {
    prioritySize: number;
    assetSize: number;
    index: number;
    isLoading: boolean;
    canSkip: boolean;
}

const InitialState: ILoadingReducer = {
    prioritySize: 1,
    assetSize: 1,
    index: 0,
    isLoading: true,
    canSkip: false,
};

export type LoadingActions =
    | ActionSetAssetSize
    | ActionSetIndex
    | ActionSetIsLoading
    | ActionSetPrioritySize
    | ActionSetCanSkip;

export const loadingReducer = Rodux.createReducer<ILoadingReducer, LoadingActions>(InitialState, {
    SetAssetSize: (state, action) => {
        return { ...state, assetSize: action.assetSize };
    },
    SetPrioritySize: (state, action) => {
        return { ...state, prioritySize: action.prioritySize };
    },
    SetIndex: (state, action) => {
        return { ...state, index: action.index };
    },
    SetIsLoading: (state, action) => {
        return { ...state, isLoading: action.isLoading };
    },
    SetCanSkip: (state, action) => {
        return { ...state, canSkip: action.canSkip };
    },
});
