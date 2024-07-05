import { faClose, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';

export default function ImagePicker({
  file,
  fileUrl,
  onChange,
  onRemove,
}: {
  file?: File;
  fileUrl?: string;
  onChange?: (file: File) => void;
  onRemove?: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  function showFileBrowser() {
    fileRef.current?.click();
  }
  function onSelectCapture() {
    if (!!fileRef.current?.files?.length) {
      onChange?.(fileRef.current.files[0]);
    }
  }
  function removeFile() {
    if (fileRef.current !== null) {
      fileRef.current.value = '';
    }
    onRemove?.();
  }
  return (
    <div>
      <input
        style={{ display: 'none' }}
        type='file'
        ref={fileRef}
        onChange={onSelectCapture}
        accept='image/png, image/jpeg'
      />
      <div className='file-upload'>
        {!!fileUrl?.length ? (
          <>
            <div className='image-container'>
              <img src={fileUrl} alt='file' onClick={showFileBrowser} />
            </div>
            <div className='icon-container' onClick={removeFile}>
              <FontAwesomeIcon icon={faClose} />
            </div>
          </>
        ) : (
          <div className='choose-image-container' onClick={showFileBrowser}>
            <FontAwesomeIcon icon={faImage} />
          </div>
        )}
      </div>
    </div>
  );
}
