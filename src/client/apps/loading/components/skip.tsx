import { SingleMotor, Spring } from "@rbxts/flipper";
import { useFlipper } from "@rbxts/hook-bag";
import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";

const scaleMin = 1.0;
const scaleMax = 1.2;

interface IProps {
    isLoading: boolean;
    canSkip: boolean;
    onSkipped: () => void;
}

function unit(scale: number): number {
    // eslint-disable-next-line prettier/prettier
	const p1 = (-1 / (scaleMin - scaleMax))
    return p1 * scale - p1;
}

function inverseUnit(scale: number): number {
    // eslint-disable-next-line prettier/prettier
	return -(-1 / (scaleMin - scaleMax)) * scale + (-1 / (scaleMin - scaleMax) + 1);
}

const Skip: Hooks.FC<IProps> = ({ isLoading, canSkip, onSkipped }, hooks) => {
    const { useEffect, useValue } = hooks;

    const statusMotor = useValue(new SingleMotor(1)).value;
    const [statusValue] = useFlipper(statusMotor)(hooks);
    const hoverMotor = useValue(new SingleMotor(1)).value;
    const [hoverScale] = useFlipper(hoverMotor)(hooks);

    useEffect(() => {
        if (!isLoading || !canSkip) {
            statusMotor.setGoal(
                new Spring(1.5, {
                    frequency: 2,
                    dampingRatio: 0.65,
                }),
            );
        } else if (isLoading && canSkip) {
            statusMotor.setGoal(
                new Spring(1, {
                    frequency: 2,
                    dampingRatio: 0.65,
                }),
            );
        }
    }, [isLoading, canSkip, statusMotor]);

    return (
        <textbutton
            AnchorPoint={new Vector2(0.5, 1)}
            Position={statusValue.map((value) => {
                return UDim2.fromScale(0.5, value);
            })}
            Size={UDim2.fromScale(0.035, 0.08)}
            BackgroundTransparency={1}
            TextTransparency={1}
            Text={""}
            Visible={isLoading}
            Event={{
                MouseButton1Click: () => {
                    if (isLoading && canSkip) onSkipped();
                },
                MouseEnter: () => {
                    hoverMotor.setGoal(
                        new Spring(scaleMax, {
                            frequency: 4.5,
                            dampingRatio: 0.8,
                        }),
                    );
                },
                MouseLeave: () => {
                    hoverMotor.setGoal(
                        new Spring(scaleMin, {
                            frequency: 4.5,
                            dampingRatio: 0.8,
                        }),
                    );
                },
            }}
        >
            <imagelabel
                AnchorPoint={new Vector2(0.5, 0.5)}
                Position={hoverScale.map((scale) => {
                    return UDim2.fromScale(0.5, 0.5 * inverseUnit(scale)); // Y: 0.5 -> 0
                })}
                Size={hoverScale.map((scale) => {
                    return UDim2.fromScale(0.75 * (-2.5 * scale + 3.5), 0.75 * (-2.5 * scale + 3.5));
                })}
                ImageTransparency={hoverScale.map((scale) => {
                    return unit(scale);
                })}
                BackgroundTransparency={1}
                Image={"rbxassetid://9086770196"}
            >
                <uiaspectratioconstraint AspectRatio={2} />
                <uisizeconstraint MaxSize={new Vector2(math.huge, 25)} />
            </imagelabel>
            <textlabel
                AnchorPoint={new Vector2(0.5, 0.5)}
                Position={hoverScale.map((scale) => {
                    return UDim2.fromScale(0.5, 1 * (-2.5 * scale + 3.5)); // Y: 1 -> 0.5
                })}
                Size={hoverScale.map((scale) => {
                    return UDim2.fromScale(1 * scale, 0.9 * scale);
                })}
                BackgroundTransparency={1}
                Text={isLoading ? `<i>Skip</i>` : `<i>Loaded</i>`}
                TextTransparency={hoverScale.map((scale) => {
                    return inverseUnit(scale);
                })}
                TextColor3={Color3.fromRGB(0, 0, 0)}
                Font={Enum.Font.Oswald}
                TextScaled={true}
                RichText={true}
                TextXAlignment={Enum.TextXAlignment.Center}
                TextYAlignment={Enum.TextYAlignment.Top}
            >
                <uisizeconstraint MaxSize={new Vector2(math.huge, 40)} />
            </textlabel>
            <uisizeconstraint MaxSize={new Vector2(math.huge, 60)} />
        </textbutton>
    );
};

export const SkipItem = new Hooks(Roact)(Skip, {
    componentType: "PureComponent",
    defaultProps: {},
});
