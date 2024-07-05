import { BrowserRouter, NavLink } from 'react-router-dom';
import { useSetMessage } from '../custom-hooks/authorize-provider';
import LoginPage from './login-page';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleRight,
  faBars,
  faHome,
  faSignOut,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../icon';
import { HeadModules, SystemModules } from '../routes';
import { userProfileAction } from '../state/reducers/user-profile-reducer';
import { RootState } from '../state/store';
import ManageProfile from './modals/manage-profile';
import PageRoutes from './page-routes';
export default function HomePage() {
  const [showProfile, setShowProfile] = useState(false);
  const setMessage = useSetMessage();
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  function logoutUser() {
    setMessage({
      message: 'Continue to logout?',
      action: 'YESNO',
      onOk: () => {
        dispatch(userProfileAction.clearProfile());
        setShowProfile(false);
      },
    });
  }
  return (
    <>
      {userProfileState.authorize === undefined ? (
        <div></div>
      ) : userProfileState.authorize ? (
        <BrowserRouter>
          <header>
            <nav>
              <div className='menu-container'>
                <>
                  {!userProfileState.isKiosk && (
                    <div className='nav-menu-container'>
                      <button
                        className='main-nav-icon'
                        onClick={() => setShowMenu(() => true)}>
                        <FontAwesomeIcon icon={faBars} />
                      </button>
                      <div className={'menus ' + (showMenu ? 'menu-show' : '')}>
                        <div className='menu-item-container'>
                          <div className='menu-item-header'>
                            <NavLink
                              onClick={() => setShowMenu(() => false)}
                              to={SystemModules[0].route!}
                              className='nav-icon home-icon'>
                              <FontAwesomeIcon icon={faHome as IconProp} />
                            </NavLink>
                            <button
                              className='nav-icon close-nav-menu'
                              onClick={() => setShowMenu(() => false)}>
                              <FontAwesomeIcon icon={faTimes as IconProp} />
                            </button>
                          </div>
                          <div className='menu-container mobile-profile'>
                            <div className='name'>
                              <label
                                className='nav-menu'
                                onClick={() => {
                                  setShowProfile(true);
                                  setShowMenu(() => false);
                                }}>
                                {userProfileState.systemUser?.displayName}
                              </label>
                              <span className='name-subtitle'>
                                {userProfileState.systemUser?.username}
                              </span>
                            </div>
                            <button
                              onClick={logoutUser}
                              className='nav-menu logout'>
                              <FontAwesomeIcon icon={faSignOut} />
                            </button>
                          </div>
                          <div className='menus-main-container'>
                            {HeadModules.filter(
                              (x) =>
                                x.moduleIds.some((e) =>
                                  userProfileState.module.includes(e)
                                ) || userProfileState.isAdmin
                            ).map((head, i) => (
                              <div className='menus-container' key={i}>
                                <div className='menu-item main-menus menu-head'>
                                  <label>{head.title}</label>
                                </div>
                                {SystemModules.filter(
                                  (x) =>
                                    x.display &&
                                    head.moduleIds.includes(x.id ?? 0) &&
                                    (userProfileState.isAdmin ||
                                      !!userProfileState.module.filter(
                                        (y) => y === x.id
                                      ).length)
                                )
                                  .sort((a, b) =>
                                    (a.pageName ?? '') > (b.pageName ?? '')
                                      ? 1
                                      : 0
                                  )
                                  .map((menu) => (
                                    <div
                                      className='menu-items'
                                      key={menu.pageName}>
                                      <div className='menu-item main-menus'>
                                        <NavLink
                                          onClick={() =>
                                            setShowMenu(() => false)
                                          }
                                          to={menu.route ?? ''}
                                          className='nav-menu'>
                                          {menu.pageName}
                                          <FontAwesomeIcon
                                            className='menu-icon'
                                            icon={faAngleRight as IconProp}
                                          />
                                        </NavLink>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div
                          className='menu-content-blocker'
                          onClick={() => setShowMenu(() => false)}></div>
                      </div>
                    </div>
                  )}
                  <NavLink to={SystemModules[1].route!} className='nav-icon'>
                    <Icon />
                  </NavLink>
                </>
              </div>
              <div
                className={
                  'menu-container desktop-profile' +
                  (userProfileState.isKiosk ? '' : ' desktop-features')
                }>
                <div className='name'>
                  <label
                    className='nav-menu'
                    onClick={() => setShowProfile(true)}>
                    {userProfileState.systemUser?.displayName ?? '---'}
                  </label>
                  <span className='name-subtitle'>
                    {userProfileState.systemUser?.username}
                  </span>
                </div>
                <button onClick={logoutUser} className='main-nav-icon'>
                  <FontAwesomeIcon icon={faSignOut} />
                </button>
              </div>
            </nav>
          </header>
          <PageRoutes />
          <div>
            {showProfile && (
              <ManageProfile onClose={() => setShowProfile(false)} />
            )}
          </div>
        </BrowserRouter>
      ) : (
        <LoginPage />
      )}
    </>
  );
}
