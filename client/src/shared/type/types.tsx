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

export type Coords = {
    x: number,
    y: number,
    width: number,
    height: number,
  }