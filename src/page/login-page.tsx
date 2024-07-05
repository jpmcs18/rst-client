import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../custom-hooks/authorize-provider';
import logo from '../icons/RAON SA TONDO PNG.png';
import CustomReturn from '../models/client-model/CustomReturn';
import LoginRequest from '../models/request-model/LoginRequest';
import { getDistinctModuleRights } from '../repositories/module-right-queries';
import { authenticate } from '../repositories/security-queries';
import { getData } from '../repositories/system-user-queries';
import { userProfileAction } from '../state/reducers/user-profile-reducer';
import CustomPassword from './components/custom-password';
import CustomTextBox from './components/custom-textbox';
export default function LoginPage() {
  const [user, setUser] = useState<LoginRequest>({
    username: '',
    password: '',
  });
  const setToasterMessage = useSetToasterMessage();
  const setBusy = useSetBusy();
  const dispatch = useDispatch();
  const isSuccess = useRef(false);
  async function signIn(isKiosk: boolean) {
    setBusy(true);
    await authenticate(user)
      .then(async (res) => {
        if (res) {
          await getProfile(isKiosk).then(async () => {
            if (isSuccess.current) {
              if (!isKiosk) {
                await getDistinctAccess();
              }
              dispatch(userProfileAction.setAuthorize(res));
            }
          });
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function getDistinctAccess() {
    setBusy(true);
    await getDistinctModuleRights()
      .then(async (res) => {
        if (res !== undefined) {
          dispatch(userProfileAction.setAccess(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function getProfile(isKiosk: boolean) {
    setBusy(true);
    await getData()
      .then(async (res) => {
        if (res !== undefined) {
          isSuccess.current = true;
          dispatch(userProfileAction.setProfile(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  function onTextChange({ elementName, value }: CustomReturn) {
    setUser({ ...user, [elementName]: value });
  }
  function onKeyPress(key: React.KeyboardEvent<HTMLDivElement>) {
    if (key.key === 'Enter') {
      if (user.username === '') {
        document.getElementById('username')?.focus();
        return;
      }
      if (user.password === '') {
        document.getElementById('password')?.focus();
        return;
      }

      signIn(false);
    }
  }
  return (
    <section className='login-base-container'>
      <div className='login-container'>
        <div className='login-header'>
          <img src={logo} alt='logo' className='login-logo' />
        </div>
        <div className='login-content'>
          <h1 className='content-header'>Login</h1>
          <CustomTextBox
            title='Username'
            name='username'
            id='username'
            value={user.username}
            onChange={onTextChange}
            onKeyPress={onKeyPress}
          />
          <CustomPassword
            title='Password'
            name='password'
            id='password'
            value={user.password}
            onChange={onTextChange}
            onKeyPress={onKeyPress}
          />
          <div className='btn-actions-group full-width'>
            <button
              onClick={() => signIn(false)}
              className='btn-action full-width'>
              <FontAwesomeIcon icon={faSignIn} />
              <span className='btn-desc'>Login</span>
            </button>
          </div>
          {/* <div className='btn-actions-group full-width'>
            <button
              onClick={() => signIn(true)}
              className='btn-action full-width'>
              <FontAwesomeIcon icon={faCartShopping} />
              <span className='btn-desc'>POS Login</span>
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
