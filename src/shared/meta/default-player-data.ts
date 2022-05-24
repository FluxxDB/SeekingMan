import { Profile } from "@rbxts/profileservice/globals";

const DefaultPlayerData = {
    highestDifficulty: 1,
};

export default DefaultPlayerData;

export type IPlayerData = typeof DefaultPlayerData;
export type PlayerDataProfile = Profile<IPlayerData>;
