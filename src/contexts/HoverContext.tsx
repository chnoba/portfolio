import React, { createContext, useContext, useState } from 'react';

const HoverContext = createContext(false);

export const HoverProvider = ({ children }: { children: React.ReactNode }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <HoverContext.Provider value={isHovered}>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="contents"
            >
                {children}
            </div>
        </HoverContext.Provider>
    );
};

export const useHover = () => useContext(HoverContext);