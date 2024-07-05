import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import {
  insertOffice,
  updateOffice,
} from '../../../repositories/office-queries';
import { officeModalActions } from '../../../state/reducers/office-modal-reducer';
import { officeActions } from '../../../state/reducers/office-reducer';
import { RootState } from '../../../state/store';
import CustomTextBox from '../../components/custom-textbox';
import Modal from '../modal';

export default function ManageOffice() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const officeModalState = useSelector((state: RootState) => state.officeModal);
  // useEffect(
  //   () => {
  //     getDes();
  //   },
  //   //eslint-disable-next-line
  //   []
  // );

  function onModalClose(hasChange: boolean) {
    dispatch(officeModalActions.setShowModal(false));
    if (hasChange) dispatch(officeActions.setInitiateSearch(true));
  }
  // async function getDes() {
  //   setBusy(true);
  //   await getPositions()
  //     .then((res) => {
  //       if (res) {
  //         dispatch(officeModalActions.setPositions(res));
  //       }
  //     })
  //     .catch((err) => {
  //       setToasterMessage({ content: err.message });
  //     })
  //     .finally(() => setBusy(false));
  // }
  async function saveData() {
    setBusy(true);
    if (officeModalState.office.id > 0) {
      await updateOffice(
        officeModalState.office,
        officeModalState.newPosition,
        officeModalState.deletedPosition
      )
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Office has been updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertOffice(officeModalState.office, officeModalState.newPosition)
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New office has been added.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
  }
  return (
    <Modal
      className='office-modal'
      onClose={() => onModalClose(false)}
      title='Manage Office'>
      <div className='modal-content-body'>
        <CustomTextBox
          title='Description'
          name='description'
          value={officeModalState.office?.description}
          onChange={(ret) => {
            dispatch(officeModalActions.updateOffice(ret));
          }}
        />
        <CustomTextBox
          title='Abbreviation'
          name='abbreviation'
          value={officeModalState.office?.abbreviation}
          onChange={(ret) => {
            dispatch(officeModalActions.updateOffice(ret));
          }}
        />
        {/* <CustomDropdown
          selectorOnly={true}
          title='Position'
          onChange={(ret) => {
            dispatch(officeModalActions.addNewPosition(ret.value));
          }}
          itemsList={officeModalState.positions.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
        <ManageOfficePositionsTable /> */}
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button onClick={saveData} className='btn-action'>
            <FontAwesomeIcon icon={faSave} />
            <span className='desktop-features'>Save</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
