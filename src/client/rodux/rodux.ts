import Rodux from "@rbxts/rodux";
import { DataActions, dataReducer, IDataReducer } from "./reducers/data-reducer";
import { IGameReducer, GameActions, gameReducer } from "./reducers/game-reducer";
import { ILoadingReducer, LoadingActions, loadingReducer } from "./reducers/loading-reducer";

export interface IClientStore {
    gameState: IGameReducer;
    playerData: IDataReducer;
    loadingState: ILoadingReducer;
}
export type StoreActions = GameActions | DataActions | LoadingActions;

export const StoreReducer = Rodux.combineReducers<IClientStore, StoreActions>({
    gameState: gameReducer,
    playerData: dataReducer,
    loadingState: loadingReducer,
});

// This bypasses some type checks by using `never` but the Rodux package is really weird and fiddly.
// Should be fine, can revisit later.
export const ClientStore = new Rodux.Store<IClientStore, StoreActions>(StoreReducer, {}, [
    Rodux.thunkMiddleware,
] as never);
