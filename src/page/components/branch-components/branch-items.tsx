import { useDispatch, useSelector } from 'react-redux';
import { branchActions } from '../../../state/reducers/branch-reducer';
import { RootState } from '../../../state/store';

export default function BranchItems() {
  const dispatch = useDispatch();
  const branchState = useSelector((state: RootState) => state.branch);
  return (
    <div className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {branchState.branchs.map((branch) => (
            <tr
              onClick={() => dispatch(branchActions.setSelected(branch))}
              key={branch.id}
              className={
                branchState.selectedBranch?.id === branch.id ? 'selected' : ''
              }>
              <td>{branch.description}</td>
              <td>{branch.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
