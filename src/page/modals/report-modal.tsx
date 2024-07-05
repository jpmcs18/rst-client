import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import printJS from 'print-js';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reportModalActions } from '../../state/reducers/report-modal-reducer';
import { RootState } from '../../state/store';
import Modal from './modal';

export default function ReportModal({ onClose }: { onClose?: () => void }) {
  const dispatch = useDispatch();
  const reportModalState = useSelector((state: RootState) => state.reportModal);
  const embedRef = useRef<any>(null);
  function onModalClose() {
    dispatch(reportModalActions.setShowModal(false));
    onClose?.();
  }
  function print() {
    printJS({
      printable: reportModalState.pdfBase64.replace(
        'data:application/pdf;base64,',
        ''
      ),
      type: 'pdf',
      base64: true,
    });
    console.log(reportModalState.pdfBase64);
  }
  return (
    <Modal
      className='report-modal'
      onClose={onModalClose}
      title={
        reportModalState.reportTitle
          ? reportModalState.reportTitle
          : 'Print Report'
      }>
      <div className='modal-content-body report-modal-body'>
        <object
          type='application/pdf'
          ref={embedRef}
          data={reportModalState.pdfBase64}
          className='pdf-viewer'
          id='pdfDocument'
          title='100'></object>
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button onClick={print} className='btn-action'>
            <FontAwesomeIcon icon={faPrint} />
            <span className='desktop-features'>Print</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
