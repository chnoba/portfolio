import React from 'react';
import {motion} from 'framer-motion';
import {VolumeSlider} from "./VolumeSlider.tsx";
import {VolumeIndicator} from "./VolumeIndicator.tsx";
import {Vinyl} from "./Vinyl.tsx";
import {TrackInfo} from "./TrackInfo.tsx";
import {PlayerControls} from "./PlayerControls.tsx";
import type { RadioStation } from '../data/stations';
import {MusicProvider, useMusic} from "../contexts/MusicContext.tsx";
import ReactPlayer from "react-player";
import {useNowPlaying} from "../hooks/useNowPlaying.ts"
import {HoverProvider} from "../contexts/HoverContext.tsx";
import {RadioInfo} from "./RadioInfo.tsx";
import {getVinylStatus} from "../utils/player-utils.ts";


interface Props {
    stations: RadioStation[];
}

export const MusicPlayer = ({ stations }: Props) => {
    return (
        <MusicProvider stations={stations}>
            <HoverProvider>
            <PlayerUI />
            </HoverProvider>
        </MusicProvider>
    );
};

const PlayerUI = () => {
    const { current, isPlaying, volume } = useMusic();
    const {title, author, artwork } = useNowPlaying(current.id);

    const [mediaPlaying, setMediaPlaying] = React.useState(false);
    const [debouncedUrl, setDebouncedUrl] = React.useState<string | null>(null);
    const status = getVinylStatus(isPlaying, mediaPlaying);

    React.useEffect(() => {
        setMediaPlaying(false);
        const timer = setTimeout(() => {
            setDebouncedUrl(current.url);
        }, 800);
        return () => clearTimeout(timer);
    }, [current.url]);

    return (
        <motion.div
            initial={{y: 50, opacity: 0}}
            animate={{y: 0, opacity: 0.6}}
            whileHover={{opacity: 1, y: -2}}
            transition={{duration: 0.3}}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-3 bg-background-dark-green dark:bg-scene-black pixel-border-2 w-115 font-pixel"
        >
            <div style={{ display: "none" }}>
                <ReactPlayer
                    key={debouncedUrl}
                    src={debouncedUrl ?? undefined}
                    playing={isPlaying }
                    volume={volume/100}
                    controls={false}
                    onPlaying={() => setMediaPlaying(true)}
                    onPause={() => setMediaPlaying(false)}
                    config={{
                        hls: {
                            autoStartLoad: true,
                            maxBufferLength: 15,
                            maxMaxBufferLength: 30,
                        }
                    }}
                />
            </div>
            <Vinyl artwork={artwork} status={status}/>

            <div className="flex flex-col flex-1 gap-4 overflow-hidden w-full min-w-0 pl-6">
                <div className="flex flex-col gap-4">
                    <RadioInfo live={mediaPlaying} radioName={current.title}/>
                    <TrackInfo title={title} author={author} id={current.id}/>
                </div>

                <div className="flex items-start gap-5">
                    <PlayerControls/>
                    <div className="flex items-center gap-2 flex-1 ml-2 select-none">
                        <VolumeIndicator/>
                        <VolumeSlider />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};