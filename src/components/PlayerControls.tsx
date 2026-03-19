import React from "react";
import {Prev, Pause, Play, Next} from "@nsmr/pixelart-react";
import {useMusic} from "../contexts/MusicContext.tsx";
/*TODO:
* averiguar que hace el classname
* mejor ui de botones
* */
export const PlayerControls = ({}) => {
    const iconSize = 24;
    const {next, prev, togglePlay, isPlaying} = useMusic();
    const buttonClassname = "hover:brightness-125 transition-all active:translate-y-[1px]"
    return (
        <div className="flex items-center gap-2 origin-left">
            <button
                className={buttonClassname}
                onClick={prev}
            >
                <Prev color="white" size={iconSize}/>
            </button>

            <button
                className={buttonClassname}
                onClick={togglePlay}
            >
                {isPlaying ? (
                    <Pause color="white" size={iconSize}/>
                ) : (
                    <Play color="white" size={iconSize}/>
                )}
            </button>

            <button
                className={buttonClassname}
                onClick={next}
            >
                <Next color="white" size={iconSize}/>
            </button>
        </div>
    );
};