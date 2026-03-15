interface RadioInfoProps {
    live: boolean;
    radioName: string;
}

export const RadioInfo = ({ live, radioName }: RadioInfoProps) => {
    return (
        <div className="relative flex items-center select-none h-6">
            {/* El círculo ahora flota a la izquierda del texto */}
            <div className="absolute -left-5 flex h-3 w-3 items-center justify-center">
                {live && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                )}
                <span className={`
                    relative inline-flex rounded-full h-2 w-2 
                    ${live ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}
                `}></span>
            </div>

            {/* El texto empieza exactamente donde empieza el componente */}
            <span className={`
                text-lg font-pixel tracking-wider leading-none
                ${live ? 'text-white' : 'text-gray-300'}
            `}>
                {radioName}
            </span>
        </div>
    );
};