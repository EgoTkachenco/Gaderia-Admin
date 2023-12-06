import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useLockedBody } from '../hooks/useBodyLock';
import { NavbarWrapper } from '../navbar/navbar';
import { SidebarWrapper } from '../sidebar/sidebar';
import { SidebarContext } from './layout-context';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const { isLogged } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  if (!isLogged)
    return (
      <SidebarContext.Provider
        value={{
          collapsed: sidebarOpen,
          setCollapsed: handleToggleSidebar,
        }}
      >
        {children}
      </SidebarContext.Provider>
    );

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <SidebarWrapper />
        <NavbarWrapper>
          <div className="p-8">{children}</div>
        </NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};
