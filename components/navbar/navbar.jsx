import { Input, Link, Navbar, NavbarContent, Button } from '@nextui-org/react';
import React, { useContext } from 'react';
// import { FeedbackIcon } from '../icons/navbar/feedback-icon';
// import { GithubIcon } from '../icons/navbar/github-icon';
// import { SupportIcon } from '../icons/navbar/support-icon';
// import { SearchIcon } from '../icons/searchicon';
import { BurguerButton } from './burguer-button';
// import { NotificationsDropdown } from './notifications-dropdown';
// import { UserDropdown } from './user-dropdown';
import { AuthContext } from '../../contexts/AuthContext';

export const NavbarWrapper = ({ children }) => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: 'w-full max-w-full',
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          {/* <Input
            startContent={<SearchIcon />}
            isClearable
            className="w-2/4"
            classNames={{
              input: 'w-full',
              mainWrapper: 'w-full',
            }}
            placeholder="Search..."
          /> */}
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          {/* <div className="flex items-center gap-2 max-md:hidden">
            <FeedbackIcon />
            <span>Feedback?</span>
          </div>

          <NotificationsDropdown />

          <div className="max-md:hidden">
            <SupportIcon />
          </div>

          <Link
            href="https://github.com/Siumauricio/nextui-dashboard-template"
            target={"_blank"}
          >
            <GithubIcon />
          </Link> */}
          <Button onClick={logout}>Log Out</Button>
          {/* <NavbarContent>
            <UserDropdown />
          </NavbarContent> */}
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
