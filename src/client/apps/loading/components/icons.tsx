import { RunService } from "@rbxts/services";
import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import { useFlipper } from "@rbxts/hook-bag";
import { SingleMotor, Spring } from "@rbxts/flipper";
import { HammerItem } from "./hammer";

interface IProps {
    isLoading: boolean;
}

const Icons: Hooks.FC<IProps> = ({ isLoading }, hooks) => {
    const { useEffect, useValue } = hooks;

    const hammerMotor = useValue(new SingleMotor(-15)).value;
    const [hammerRatio] = useFlipper(hammerMotor)(hooks);
    const [tickStatus, setTick] = Roact.createBinding(math.floor(os.clock()) % 4);

    useEffect(() => {
        let lastStrike = os.clock();
        let striked = true;
        let lastTick = os.clock();

        const connection = RunService.Heartbeat.Connect(() => {
            const elapsedStrike = os.clock() - lastStrike;
            if (elapsedStrike > 1) {
                striked = !striked;
                hammerMotor.setGoal(
                    new Spring(
                        striked ? -90 : -15,
                        striked ? { frequency: 4, dampingRatio: 0.7 } : { frequency: 0.7, dampingRatio: 0.6 },
                    ),
                );
                lastStrike = os.clock();
            }

            const elapsedTick = os.clock() - lastTick;
            if (elapsedTick > 0.5) {
                lastTick = os.clock();
                setTick(math.floor(lastTick) % 4);
            }
        });

        return () => {
            connection.Disconnect();
        };
    }, [isLoading, hammerMotor]);

    return (
        <frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1} Visible={isLoading}>
            <imagelabel
                Position={UDim2.fromScale(0.005, 0.99)}
                Size={UDim2.fromScale(0.2, 0.2)}
                Image={"rbxassetid://9015835523"}
                AnchorPoint={new Vector2(0, 1)}
                BackgroundTransparency={1}
            >
                <uiaspectratioconstraint AspectRatio={1.893246187363834} />
                <uisizeconstraint MaxSize={new Vector2(200, math.huge)} />

                <textlabel
                    AnchorPoint={new Vector2(0, 1)}
                    Position={UDim2.fromScale(1, 1)}
                    Size={new UDim2(1, 300, 0.45, 0)}
                    BackgroundTransparency={1}
                    Text={tickStatus.map((value: number) => {
                        return `<i>Forging Your Game${".".rep(value)}</i>`;
                    })}
                    TextColor3={Color3.fromRGB(0, 0, 0)}
                    Font={Enum.Font.Oswald}
                    TextScaled={true}
                    RichText={true}
                    TextXAlignment={Enum.TextXAlignment.Left}
                    TextYAlignment={Enum.TextYAlignment.Bottom}
                />
                <HammerItem Position={UDim2.fromScale(0.88, -0.91)} Rotation={hammerRatio} isLoading={isLoading} />
            </imagelabel>
        </frame>
    );
};

export const IconsItem = new Hooks(Roact)(Icons, {
    componentType: "PureComponent",
    defaultProps: {},
});
