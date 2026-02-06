import React from 'react';
import { motion } from 'framer-motion';
import {VolumeSlider} from "./VolumeSlider.tsx";
import {VolumeIndicator} from "./VolumeIndicator.tsx";
import {Vinyl} from "./Vinyl.tsx";
import {MarqueeText} from "./MarqueeText.tsx";
import {PlayerControls} from "./PlayerControls.tsx";
import ReactPlayer from 'react-player'
import type {Radio} from 'astro:db';
import {MusicProvider, useMusic} from "../contexts/MusicContext.tsx";

type RadioStation = typeof Radio.$inferSelect;

interface Props {
    stations: RadioStation[];
}

export const MusicPlayer = ({ stations }: Props) => {
    return (
        <MusicProvider stations={stations}>
            <PlayerUI />
        </MusicProvider>
    );
};

const PlayerUI = () => {
    const { current, isPlaying, volume } = useMusic();
    const [isHovered, setIsHovered] = React.useState(false);

    return (

        <motion.div
            initial={{y: 50, opacity: 0}}
            animate={{y: 0, opacity: 0.6}}
            whileHover={{opacity: 1, y: -2}}
            transition={{duration: 0.3}}

            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-3 bg-background-dark-green pixel-border-2 w-96 font-pixel"
        >
            <div style={{ display: "none" }}>
                <ReactPlayer
                    src={`https://www.youtube.com/watch?v=${current.id}`}
                    playing={isPlaying}
                    volume={volume/100}
                    controls={false}
                    config={{
                        youtube:{
                            origin: window.location.origin,
                            enablejsapi: 1,
                            iv_load_policy: 3,
                            rel: 0,
                        }
                    }}
                />
            </div>
            <Vinyl/>

            <div className="flex flex-col flex-1 gap-1 overflow-hidden w-full min-w-0">
                <MarqueeText
                    play={isHovered}
                    bounce={true}
                    gradient={true}
                    speed={35}
                    className="text-white text-[22px] leading-none ml-1"
                    key = {current.id}
                >
                    {current.title}
                </MarqueeText>

                <div className="flex items-center">
                    <PlayerControls/>
                    <div className="flex items-center gap-2 flex-1 ml-2 select-none font-pixel">
                        <VolumeIndicator/>
                        <VolumeSlider />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};