import { Instant, SingleMotor, Spring } from "@rbxts/flipper";
import { useFlipper } from "@rbxts/hook-bag";
import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";

interface IProps {
    isLoading: boolean;
}

const Background: Hooks.FC<IProps> = (props, hooks) => {
    const { isLoading } = props;
    const { useEffect, useValue } = hooks;

    const closingMotor = useValue(new SingleMotor(0)).value;
    const [closingValue] = useFlipper(closingMotor)(hooks);

    useEffect(() => {
        if (!isLoading) {
            closingMotor.setGoal(
                new Spring(1, {
                    frequency: 1,
                    dampingRatio: 0.6,
                }),
            );
        } else {
            closingMotor.setGoal(new Instant(0));
        }
    }, [isLoading]);

    return (
        <imagelabel
            Size={UDim2.fromScale(1, 1)}
            BorderSizePixel={0}
            BackgroundColor3={Color3.fromRGB(255, 255, 255)}
            BackgroundTransparency={closingValue.map((value) => {
                return value * 1.25;
            })}
            Image={"rbxassetid://9711225137"}
            ImageTransparency={closingValue.map((value) => {
                return value;
            })}
            ZIndex={-1}
        >
            {props[Roact.Children]}
        </imagelabel>
    );
};
// running out of ideas LOL
export const BackgroundItem = new Hooks(Roact)(Background, {
    componentType: "PureComponent",
    defaultProps: {},
});
