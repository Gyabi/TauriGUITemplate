"use client";
import { AiFillDashboard } from 'react-icons/ai';
import { BsGraphUpArrow } from 'react-icons/bs';
import { NavigationItem } from './NavigationItem';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { CiSettings } from "react-icons/ci";

type SidebarProps = {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({ isMenuOpen, setIsMenuOpen }:SidebarProps) => {
  return (
    <>
      <nav
        className={`${
          isMenuOpen ? '' : 'fixed right-[-100%]'
        } h-full w-100 bg-gray-900 p-5 duration-300 flex flex-col space-y-2 justify-between items-center`}
      >
        <div className='flex flex-col space-y-2'>
            <NavigationItem Icon={AiFillDashboard} href={'/'} name={'HOME'} />
            <NavigationItem
            Icon={HiOutlineUserGroup}
            href={'/sample1'}
            name={'Sample1'}
            />
        </div>
        <NavigationItem Icon={CiSettings} href={'/setting'} name={'Setting'} />
      </nav>
    </>
  );
};