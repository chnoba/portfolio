import React from 'react';
import knobImg from '../assets/knob.svg'
import { Play } from "@nsmr/pixelart-react";
import {useMusic} from "../contexts/MusicContext.tsx";

export const VolumeSlider = ({ }) => {
    const {volume, updateVolume} = useMusic();
    return (
            <div className="relative flex items-center flex-1 h-6 p-1 w-full">
                <Play
                    size={24}
                    className="absolute -left-1.5 z-0"
                    style={{ transform: 'scaleX(-1)', color: "white" }}
                />
                <Play
                    size={24}
                    className="absolute -right-1.5 -z-20"
                    style={{ color: "white" }}
                />
                <div className="relative flex-1 h-1.5 mx-2 overflow-visible group">

                    <div className="absolute inset-0 bg-[#394f57] border border-[#525162] ring-2 ring-white ">
                        <div
                            className="h-full bg-[#ffe629] pointer-events-none group-hover:brightness-90"
                            style={{ width: `${volume}%` }}
                        />
                    </div>

                    {/* EL KNOB:*/}
                    <div
                        className="absolute top-1/2 flex items-center justify-center pointer-events-none z-20 flex-shrink-0 w-5 h-5"
                        style={{
                            left: `${volume}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <img
                            src={knobImg.src}
                            className="w-5 h-5 min-w-[20px] min-h-[20px] aspect-square object-contain image-rendering-pixelated flex-shrink-0 group-hover:brightness-90"
                            alt="knob"
                        />
                    </div>

                    {/* Input invisible (Hitbox) */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => updateVolume(parseInt(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-[url(/cursors/pointer.png)_0_0,_grab] active:cursor-[url(/cursors/grab.png)_0_0,_grabbing]"
                    />
                </div>


            </div>
    );
};