import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";

interface IProps {
    Position: UDim2;
    Rotation: Roact.Binding<number>;
    isLoading: boolean;
}

const Hammer: Hooks.FC<IProps> = ({ Position, Rotation, isLoading }) => {
    const ref = Roact.createRef<ImageLabel>();

    return (
        <frame
            Position={Position}
            Size={UDim2.fromScale(1.25, 1.25)}
            Rotation={Rotation.map((value) => value)}
            BackgroundTransparency={1}
            Visible={isLoading}
        >
            <uiaspectratioconstraint AspectRatio={0.4795539033457249} />
            <imagelabel
                Ref={ref}
                AnchorPoint={new Vector2(0, 0.25)}
                Image={"http://www.roblox.com/asset/?id=9041685726"}
                Size={UDim2.fromScale(1, 1)}
                BackgroundTransparency={1}
            />
        </frame>
    );
};

export const HammerItem = new Hooks(Roact)(Hammer, {
    componentType: "PureComponent",
    defaultProps: {},
});
