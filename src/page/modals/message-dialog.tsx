import { useDispatch } from 'react-redux';
import { AppName } from '../../constant';
import {
  useMessage,
  useSetCloseMessageDialog,
} from '../../custom-hooks/authorize-provider';
import { userProfileAction } from '../../state/reducers/user-profile-reducer';
import Modal from './modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faClose,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

export default function MessageDialog() {
  const closeDialog = useSetCloseMessageDialog();
  const Message = useMessage();
  const dispatch = useDispatch();

  function handleClose() {
    closeDialog();
    Message?.onCancel?.();
  }

  function ok() {
    if (Message?.message === 'Unauthorized') {
      dispatch(userProfileAction.clearProfile());
    }
    Message?.onOk?.();
    closeDialog();
  }
  return (
    <Modal title={AppName}>
      <div className='modal-content-body'>
        <span className='message-content'>{Message?.message}</span>
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          {Message?.action === 'OKCANCEL' && (
            <button onClick={handleClose} className='btn-action   '>
              <FontAwesomeIcon icon={faClose} />
              <span className='desktop-features'>Cancel</span>
            </button>
          )}
          {(Message?.action === undefined ||
            Message?.action === 'OKCANCEL') && (
            <button onClick={ok} className='btn-action'>
              {Message?.okElement ?? (
                <>
                  <FontAwesomeIcon icon={faCheck} />
                  <span className='desktop-features'>Ok</span>
                </>
              )}
            </button>
          )}
          {Message?.action === 'YESNO' && (
            <button
              onClick={handleClose}
              className='btn-action secondary-action'>
              <FontAwesomeIcon icon={faThumbsDown} />
              <span className='desktop-features'>No</span>
            </button>
          )}
          {Message?.action === 'YESNO' && (
            <button onClick={ok} className='btn-action'>
              <FontAwesomeIcon icon={faThumbsUp} />
              <span className='desktop-features'>Yes</span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
