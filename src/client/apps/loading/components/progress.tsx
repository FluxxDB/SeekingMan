import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";

interface IProps {
    index: number;
    assetSize: number;
    isLoading: boolean;
}

function getProgress(a: number, b: number): number {
    return math.clamp(math.floor((a / b) * 100), 0, 100);
}

const Percentage: Hooks.FC<IProps> = ({ index, assetSize, isLoading }) => {
    return (
        <textlabel
            AnchorPoint={new Vector2(1, 1)}
            Position={UDim2.fromScale(0.995, 0.99)}
            Size={UDim2.fromScale(0.2, 0.09)}
            BackgroundTransparency={1}
            Visible={isLoading}
            Text={`<i>${getProgress(index, assetSize)}%</i>`}
            TextColor3={Color3.fromRGB(0, 0, 0)}
            Font={Enum.Font.Oswald}
            TextScaled={true}
            RichText={true}
            TextXAlignment={Enum.TextXAlignment.Right}
            TextYAlignment={Enum.TextYAlignment.Bottom}
        >
            <uisizeconstraint MaxSize={new Vector2(80, math.huge)} />
            <uiaspectratioconstraint AspectRatio={1.893246187363834} />
        </textlabel>
    );
};

export const PercentageItem = new Hooks(Roact)(Percentage, {
    componentType: "PureComponent",
    defaultProps: {},
});
