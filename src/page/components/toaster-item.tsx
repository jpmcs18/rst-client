import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ToasterItem({
  time,
  title,
  content,
  onMouseOver,
  onMouseLeave,
  onClose,
}: {
  time: number;
  title: string;
  content: string;
  onMouseOver: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className='toaster-container'
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}>
      <div className='toaster-title-container'>
        <span className='title'>{title}</span>
        <FontAwesomeIcon className='close' icon={faClose} onClick={onClose} />
      </div>
      <div className='progress' style={{ width: `${100 / time}%` }}></div>
      <div className='content'>
        <span className='message-content'>{content}</span>
      </div>
    </div>
  );
}
