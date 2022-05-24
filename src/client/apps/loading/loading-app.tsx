import Roact from "@rbxts/roact";
import { App, StoreDispatch } from "client/controllers/app-controller";
import { ClientStore, IClientStore } from "client/rodux/rodux";
import { Scene } from "types/enum/scene";
import { IconsItem } from "client/apps/loading/components/icons";
import { SkipItem } from "client/apps/loading/components/skip";
import { PercentageItem } from "./components/progress";
import { BackgroundItem } from "./components/background";

type IStateProps = Roact.PropsWithChildren<{
    prioritySize: number;
    assetSize: number;
    index: number;
    isLoading: boolean;
    canSkip: boolean;
}>;

interface IDispatchProps {
    onSkipped: () => void;
}

interface IProps extends IStateProps, IDispatchProps {}

@App({
    name: "loading",
    requiredScenes: [Scene.Load],
    mapStateToProps: (store: IClientStore) => {
        return identity<IStateProps>({
            ...store.loadingState,
        });
    },
    mapDispatchToProps: (dispatch: StoreDispatch) => {
        return identity<IDispatchProps>({
            onSkipped: () => {
                print(`Old State: ${ClientStore.getState().loadingState.isLoading}`);
                dispatch({ type: "SetIsLoading", isLoading: false });
                print(`New State: ${ClientStore.getState().loadingState.isLoading}`);
            },
        });
    },
    ignoreGuiInset: true,
})
class LoadingApp extends Roact.PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <frame
                Size={UDim2.fromScale(1, 1)}
                BorderSizePixel={0}
                BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                BackgroundTransparency={1}
                Active={this.props.isLoading}
                // Visible={this.props.isLoading}
            >
                <IconsItem isLoading={this.props.isLoading} />
                <PercentageItem
                    index={this.props.index}
                    assetSize={this.props.assetSize}
                    isLoading={this.props.isLoading}
                />
                <SkipItem
                    isLoading={this.props.isLoading}
                    canSkip={this.props.canSkip}
                    onSkipped={this.props.onSkipped}
                />
                <BackgroundItem isLoading={this.props.isLoading} />
            </frame>
        );
    }
}

export default LoadingApp;
