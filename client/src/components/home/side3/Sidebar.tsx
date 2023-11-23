
interface SidebarProps {
  isOpen: boolean;
  children?: React.ReactNode
}

function Sidebar({isOpen, children}: SidebarProps) {
  return (
    <aside className={`fixed -translate-x-72 md:-translate-x-0 left-0 md:top-16 z-30 ${(isOpen ? 'md:w-80':'md:w-20')} md:h-[calc(100vh-theme(space.14))] bg-white border-r border-gray-200 transition-[width,transform] duration-300 ease-in-out flex flex-col group`}>
      <div className="overflow-x-hidden overflow-y-auto hide-scrollbar h-full w-full flex flex-col space-y-6">
        <nav className="mt-1">
          {children}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar