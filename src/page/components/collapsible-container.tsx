import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useState } from 'react';

export default function CollapsibleContainer({
  title,
  header,
  content,
  isBoldTitle,
  isOpen,
}: {
  title?: string;
  isBoldTitle?: boolean;
  header?: ReactNode;
  content: ReactNode;
  isOpen?: boolean;
}) {
  const [collapse, setCollapse] = useState(() => !isOpen);
  return (
    <div className='collapsible-container'>
      <div className='header' onClick={() => setCollapse((x) => !x)}>
        <div className='title'>
          {title && (
            <div className={'title-text' + (isBoldTitle ? ' title-bold' : '')}>
              <label>{title}</label>
            </div>
          )}
          {header}
        </div>
        <button className={'icon' + (collapse ? ' collapse-icon' : '')}>
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
      </div>
      <div className={'content' + (collapse ? ' collapse' : ' vissible')}>
        {content}
      </div>
    </div>
  );
}
