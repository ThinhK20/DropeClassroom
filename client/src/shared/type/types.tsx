export type SideNavItem = {
    name: string;
    icon?: JSX.Element;
    submenu: boolean;
    path?: string;
    title?: string;
    actionGoDo?: () => void;
};

export type Coords = {
    x: number,
    y: number,
    width: number,
    height: number,
}

export interface HeadingName  {
    name?: string,
    title?: string,
}