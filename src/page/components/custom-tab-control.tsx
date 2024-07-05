import { ReactNode, useState } from 'react';

export interface TabData {
  header: string;
  content: ReactNode;
}

export default function CustomTabControl({
  tabDatas,
}: {
  tabDatas: TabData[];
}) {
  const [selectedTabIndex, setselectedTabIndex] = useState(0);

  return (
    <div className='tab-container'>
      <div className='tab-header-container'>
        {tabDatas.map((x, i) => (
          <div
            key={i}
            className={
              'tab-header' + (i === selectedTabIndex ? ' selected' : '')
            }
            onClick={() => {
              setselectedTabIndex(() => i);
            }}>
            {x.header}
          </div>
        ))}
      </div>
      <div className='tab-content-container'>
        {tabDatas.map((x, i) => (
          <div
            key={i}
            className={
              'tab-content' + (i === selectedTabIndex ? ' selected-tab' : '')
            }>
            {x.content}
          </div>
        ))}
      </div>
    </div>
  );
}
