    import React from "react";
    import { VolumeX, Volume1, Volume2, Volume3 } from "@nsmr/pixelart-react";
    import {useMusic} from "../contexts/MusicContext.tsx";


    const VOLUME_MAP = [
        { threshold: 0, Icon: VolumeX},
        { threshold: 33, Icon: Volume1 },
        { threshold: 66, Icon: Volume2 },
        { threshold: 100, Icon: Volume3 },
    ];

    export const VolumeIndicator = ({}) => {
        const iconSize = 24;
        const {volume, toggleMute} = useMusic();

        const { Icon } = VOLUME_MAP.find(item => volume <= item.threshold) || { Icon: Volume3 };

        return (
            <button
                onClick={toggleMute}
                className={'active:translate-y-[1px] cursor-pointer'}
            >
                <Icon size={iconSize} color="white" />
            </button>
        );
    };