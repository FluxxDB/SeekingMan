import Roact from "@rbxts/roact";
import { ControllerService } from "@rbxts/services";
import { makeStory } from "shared/util/story-utils";
import { BackgroundItem } from "./components/background";
import { IconsItem } from "./components/icons";
import { PercentageItem } from "./components/progress";
import { SkipItem } from "./components/skip";

// This is to fix a compatibility issue between Storybook and the roblox-ts RuntimeLib
table.clear(_G);

export = makeStory({
    controls: {
        index: 0,
        assetSize: math.random(300, 500),
        isLoading: false,
        canSkip: true,
    },

    stories: {
        BackgroundItem: ({ controls }) => {
            return (
                <frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} BorderSizePixel={0}>
                    <BackgroundItem isLoading={controls.isLoading} />
                </frame>
            );
        },
        IconsItem: () => {
            return (
                <frame Size={new UDim2(1, 0, 1, 0)} BackgroundColor3={new Color3(1, 1, 1)} BorderSizePixel={0}>
                    <IconsItem isLoading={true} />
                </frame>
            );
        },
        PercentageItem: ({ controls }) => {
            return (
                <frame Size={new UDim2(1, 0, 1, 0)} BackgroundColor3={new Color3(1, 1, 1)} BorderSizePixel={0}>
                    <PercentageItem
                        index={controls.index}
                        assetSize={controls.assetSize}
                        isLoading={controls.isLoading}
                    />
                </frame>
            );
        },
        SkipItem: ({ controls, setControls }) => {
            function onSkipped() {
                setControls({ isLoading: false, canSkip: false });
            }
            return (
                <frame Size={new UDim2(1, 0, 1, 0)} BackgroundColor3={new Color3(1, 1, 1)} BorderSizePixel={0}>
                    <SkipItem isLoading={controls.isLoading} canSkip={controls.canSkip} onSkipped={onSkipped} />
                </frame>
            );
        },
    },
});
