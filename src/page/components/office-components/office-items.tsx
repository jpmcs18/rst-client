import { useDispatch, useSelector } from 'react-redux';
import { officeActions } from '../../../state/reducers/office-reducer';
import { RootState } from '../../../state/store';

export default function OfficeItems() {
  const dispatch = useDispatch();
  const officeState = useSelector((state: RootState) => state.office);
  return (
    <div className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Abbreviation</th>
          </tr>
        </thead>
        <tbody>
          {officeState.offices.map((office) => (
            <tr
              onClick={() => dispatch(officeActions.setSelected(office))}
              key={office.id}
              className={
                officeState.selectedOffice?.id === office.id ? 'selected' : ''
              }>
              <td>{office.description}</td>
              <td>{office.abbreviation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
