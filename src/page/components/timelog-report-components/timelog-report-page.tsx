import { useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import { hasAccess } from '../../../helper';
import { RootState } from '../../../state/store';
import DTRReport from './dtr-report';

export default function TimelogReportPage() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  return (
    <div className='main-container'>
      <div className='title-container'>
        <div className='title'>{Pages.TimelogReports}</div>
      </div>
      {hasAccess(
        userProfileState.moduleRights,
        Pages.TimelogReports,
        'Export DTR',
        userProfileState.isAdmin
      ) && <DTRReport />}
    </div>
  );
}
