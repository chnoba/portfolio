import React from 'react';
import { useHover } from '../contexts/HoverContext';
import { MarqueeText } from './MarqueeText';

interface TrackInfoProps {
    title: string;
    author: string;
    id: string;
}

export const TrackInfo = ({ title, author, id }: TrackInfoProps) => {
    const isHovered = useHover();

    return (
        <div>
            <div className="flex flex-col flex-1 font-munro">
                <MarqueeText play={isHovered} key={`${id}-${title}`} className={"text-2xl text-white"} gradient={true}>
                    {title}
                </MarqueeText>
                <span className="text-gray-300 text-lg truncate">
                    {author}
                </span>
            </div>
        </div>
    );
};