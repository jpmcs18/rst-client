import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import Office from '../../../models/entities/Office';
import { searchOffice } from '../../../repositories/office-queries';
import { officeSearchableActions } from '../../../state/reducers/searchables/office-searchable-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../../components/pagination';
import SearchBar from '../../components/searchbar';
import Modal from '../modal';

export default function OfficeSearchable({
  onModalClose,
}: {
  onModalClose: (office?: Office) => void;
}) {
  const officeSearchableState = useSelector(
    (state: RootState) => state.officeSearchable
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchDes();
    },
    //eslint-disable-next-line
    [officeSearchableState.initiateSearch]
  );

  async function searchDes() {
    if (!officeSearchableState.initiateSearch) return true;
    setBusy(true);
    dispatch(officeSearchableActions.setInitiateSearch(false));
    await searchOffice(
      officeSearchableState.key,
      officeSearchableState.currentPage
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(officeSearchableActions.fill(res.results));
          dispatch(officeSearchableActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }
  async function search(key: string) {
    dispatch(officeSearchableActions.setkey(key));
    dispatch(officeSearchableActions.setCurrentPage(1));
    dispatch(officeSearchableActions.setInitiateSearch(true));
  }
  function onClose(hasReturn: boolean) {
    dispatch(officeSearchableActions.setShowModal(false));
    onModalClose(hasReturn ? officeSearchableState.selectedOffice : undefined);
  }
  async function nextPage(page: number) {
    dispatch(officeSearchableActions.setCurrentPage(page));
    dispatch(officeSearchableActions.setInitiateSearch(true));
  }
  return (
    <Modal
      className='searchable-modal'
      onClose={() => onClose(false)}
      title={'Search Office'}>
      <div className='modal-content-body office-searchable-content-body'>
        <section>
          <SearchBar
            search={search}
            placeholder='Search Key'
            value={officeSearchableState.key}
          />
        </section>
        <section>
          <Pagination
            pages={officeSearchableState.pageCount}
            currentPageNumber={officeSearchableState.currentPage}
            goInPage={nextPage}></Pagination>
        </section>
        <section className='searchable-table'>
          <table className='item-table'>
            <thead>
              <tr>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {officeSearchableState.offices.map((office) => (
                <tr
                  onDoubleClick={() => onClose(true)}
                  onClick={() =>
                    dispatch(officeSearchableActions.setSelected(office))
                  }
                  key={office.id}
                  className={
                    officeSearchableState.selectedOffice?.id === office.id
                      ? 'selected'
                      : ''
                  }>
                  <td>{office.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button
            disabled={!officeSearchableState.selectedOffice}
            onClick={() => onClose(true)}
            className='btn-action'>
            <FontAwesomeIcon icon={faCheck} />
            <span className='desktop-features'>Select</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
