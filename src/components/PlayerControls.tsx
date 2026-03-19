import React from "react";
import {Prev, Pause, Play, Next} from "../assets/icons/MusicPlayerIcons.tsx";
import {useMusic} from "../contexts/MusicContext.tsx";
/*TODO:
* averiguar que hace el classname
* mejor ui de botones
* */
export const PlayerControls = ({}) => {
    const iconSize = 24;
    const {next, prev, togglePlay, isPlaying} = useMusic();
    const buttonClassname = "transition-all active:translate-y-[1px]"
    return (
        <div className="flex items-center gap-2 origin-left">
            <button
                className={buttonClassname}
                onClick={prev}
                aria-label="Previous Song"
            >
                <Prev color="white" size={iconSize}/>
            </button>

            <button
                className={buttonClassname}
                onClick={togglePlay}
                aria-label="Play Song"
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
                aria-label="Next Song"
            >
                <Next color="white" size={iconSize}/>
            </button>
        </div>
    );
};