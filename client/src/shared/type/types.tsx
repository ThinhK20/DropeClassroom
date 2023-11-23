export type SideNavItem = {
    name: string;
    icon: JSX.Element;
    submenu: boolean;
    title?: string;
    subMenuItems?: SideNavItem[];
    actionGoDo?: () => void;
};

export type MenuItemWithSubMenuProps = {
    item: SideNavItem;
    toggleOpen: () => void;
};