import { Controller, OnStart } from "@flamework/core";
import { CollectionService, ContentProvider, Lighting, TweenService } from "@rbxts/services";
import { Events } from "client/events";
import { ClientStore } from "client/rodux/rodux";
import { grabOrCreate } from "shared/util/grab-or-create";

@Controller({})
export default class LoadingController implements OnStart {
    private blur = grabOrCreate(Lighting, "Blur", "BlurEffect");
    private Default_Blur = Lighting.GetAttribute("Default_Blur") as number;

    /** @hidden */
    public onStart() {
        ClientStore.changed.connect((state) => {
            if (!state.loadingState.isLoading) {
                const tween = TweenService.Create(
                    this.blur,
                    new TweenInfo(2.5, Enum.EasingStyle.Quint, Enum.EasingDirection.Out),
                    { Size: this.Default_Blur },
                );
                tween.Play();
            }
        });

        task.wait(2.25); // Forces loading screen to stall for ascetics
        this.loadAssets(CollectionService.GetTagged("Priority Preload"), CollectionService.GetTagged("Preload"));
        task.delay(2.35, () => {
            // this.sceneController.setScene(Scene.Menu);
            Events.Ready.fire(); // Spawn Character
        });
    }

    public loadAssets(priorityAssets: Instance[], assets: Instance[]) {
        ClientStore.dispatch({ type: "SetPrioritySize", prioritySize: priorityAssets.size() });
        ClientStore.dispatch({ type: "SetAssetSize", assetSize: priorityAssets.size() + assets.size() });

        let assetIndex = 0;

        // eslint-disable-next-line roblox-ts/no-array-pairs
        for (const [index, item] of ipairs(priorityAssets)) {
            ContentProvider.PreloadAsync([item]);
            ClientStore.dispatch({ type: "SetIndex", index });
            assetIndex = index;
        }

        ClientStore.dispatch({ type: "SetCanSkip", canSkip: true });

        // eslint-disable-next-line roblox-ts/no-array-pairs
        for (const [, item] of ipairs(assets)) {
            if (!ClientStore.getState().loadingState.isLoading) return;
            ContentProvider.PreloadAsync([item]);
            assetIndex++;
            ClientStore.dispatch({ type: "SetIndex", index: assetIndex });
        }

        ClientStore.dispatch({ type: "SetCanSkip", canSkip: false });
        task.wait(2.25);
        ClientStore.dispatch({ type: "SetIsLoading", isLoading: false });
    }
}
