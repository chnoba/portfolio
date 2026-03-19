import { Icon } from './Icon';

type SpecificIconProps = Omit<Parameters<typeof Icon>[0], 'children'>;

export const Play = (props: SpecificIconProps) => (
    <Icon {...props}>
        M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2v2z
    </Icon>
);

export const Prev = (props: SpecificIconProps) => (
    <Icon {...props}>
        M6 4h2v16H6V4zm12 0h-2v2h-2v3h-2v2h-2v2h2v3h2v2h2v2h2V4z
    </Icon>
);

export const Next = (props: SpecificIconProps) => (
    <Icon {...props}>
        M6 4h2v2h2v2h2v2h2v4h-2v2h-2v2H8v2H6V4zm12 0h-2v16h2V4z
    </Icon>
);

export const Pause = (props: SpecificIconProps) => (
    <Icon {...props}>
        M10 4H5v16h5V4zm9 0h-5v16h5V4z
    </Icon>
);