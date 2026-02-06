import React from "react";
import {Prev, Pause, Play, Next} from "@nsmr/pixelart-react";
import {useMusic} from "../contexts/MusicContext.tsx";

export const PlayerControls = ({}) => {
    const iconSize = 32;
    const {next, prev, togglePlay, isPlaying} = useMusic();
    return (
        <div className="flex items-center gap-1 scale-75 origin-left">
            <button
                className="hover:brightness-125 transition-all active:translate-y-[1px] "
                onClick={prev}
            >
                <Prev color="white" size={iconSize}/>
            </button>

            <button
                className="hover:brightness-125 transition-all active:translate-y-[1px]"
                onClick={togglePlay}
            >
                {isPlaying ? (
                    <Pause color="white" size={iconSize}/>
                ) : (
                    <Play color="white" size={iconSize}/>
                )}
            </button>

            <button
                className="hover:brightness-125 transition-all active:translate-y-[1px]"
                onClick={next}
            >
                <Next color="white" size={iconSize}/>
            </button>
        </div>
    );
};