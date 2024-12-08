import { FunctionComponent, ReactElement } from 'react';
import ProfileDropdown from './ProfileDropdown.tsx';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../config/routes.ts';

const Header: FunctionComponent = (): ReactElement => {
  return (
    <header className='flex w-full items-center px-4 py-2 shadow-small'>
      <nav className='flex gap-6 font-bold'>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-primary' : 'hover:text-primary-400'
          }
          to={ROUTES.HOME}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-primary' : 'hover:text-primary-400'
          }
          to={ROUTES.READ_LATER}
        >
          Read Later
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-primary' : 'hover:text-primary-400'
          }
          to={ROUTES.PROFILE}
        >
          Profile
        </NavLink>
      </nav>
      <ProfileDropdown />
    </header>
  );
};

export default Header;
