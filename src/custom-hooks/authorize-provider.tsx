import { Guid } from 'guid-typescript';
import React, { ReactNode, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import ToasterMessage from '../models/client-model/ToasterMessage';
import ToasterMessageItem from '../models/client-model/ToasterMessageItem';
import Toaster from '../page/components/toaster';
import MessageDialog from '../page/modals/message-dialog';
import { userProfileAction } from '../state/reducers/user-profile-reducer';
const SetToasterMessageContext = React.createContext<
  (message: ToasterMessageItem) => void
>(() => {});
const ToasterMessageContext = React.createContext<
  [ToasterMessage[], React.Dispatch<React.SetStateAction<ToasterMessage[]>>]
>([[], () => {}]);
const SetMessageContext = React.createContext<(message: Message) => void>(
  () => {}
);
const SetCloseMessageDialogContext = React.createContext<() => void>(() => {});
const MessageContext = React.createContext<Message | undefined>(undefined);
const OpenMessageDialogContext = React.createContext<boolean>(false);
const SetBusyContext = React.createContext<(args: boolean) => void>(() => {});
export interface Message {
  message: string;
  type?: MESSAGETYPE | undefined;
  action?: MESSAGEACTION | undefined;
  okElement?: ReactNode | undefined;
  onOk?: () => void;
  onCancel?: () => void;
}
export type MESSAGETYPE = 'MESSAGE' | 'ALERT';
export type MESSAGEACTION = 'YESNO' | 'OKCANCEL';
export function useSetToasterMessage() {
  return useContext(SetToasterMessageContext);
}
export function useToasterMessage() {
  return useContext(ToasterMessageContext);
}
export function useSetCloseMessageDialog() {
  return useContext(SetCloseMessageDialogContext);
}
export function useSetMessage() {
  return useContext(SetMessageContext);
}
export function useMessage() {
  return useContext(MessageContext);
}
export function useOpenMessageDialog() {
  return useContext(OpenMessageDialogContext);
}
export function useSetBusy() {
  return useContext(SetBusyContext);
}
export function AuthorizeProvider({ children }: { children: ReactNode }) {
  const [toasterMessages, setToasterMessages] = useState<ToasterMessage[]>(
    () => []
  );
  const [openMessageDialog, setOpenMessageDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>();
  const [showLoading, setShowLoading] = useState<number>(() => 0);
  const dispatch = useDispatch();
  function showMessage(message: Message) {
    setMessage(message);
    setOpenMessageDialog(true);
  }
  function closeMessageDilaog() {
    setOpenMessageDialog(false);
  }
  function setBusy(isBusy: boolean) {
    setShowLoading((b) => b + (isBusy ? 1 : -1));
    if (showLoading + (isBusy ? 1 : -1) === 1) {
      document.body.classList.add('body-loading');
    } else {
      document.body.classList.remove('body-loading');
    }
  }
  function showToaster(message: ToasterMessageItem) {
    if (message?.content === 'Unauthorized')
      dispatch(userProfileAction.clearProfile());
    setToasterMessages((r) => [
      ...r,
      {
        id: Guid.create(),
        content: message.content,
        title: message.title,
        idle: false,
        time: 3,
      },
    ]);
  }

  return (
    <div>
      <div
        className={
          'loading-screen' + (showLoading > 0 ? ' loading-block' : '')
        }>
        <div className='loading-blocker'></div>
        <div className='loading'>
          <div className='loader'></div>
        </div>
      </div>
      <SetBusyContext.Provider value={setBusy}>
        <SetToasterMessageContext.Provider value={showToaster}>
          <OpenMessageDialogContext.Provider value={openMessageDialog}>
            <SetCloseMessageDialogContext.Provider value={closeMessageDilaog}>
              <MessageContext.Provider value={message}>
                <SetMessageContext.Provider value={showMessage}>
                  {children}
                  {openMessageDialog && <MessageDialog />}
                  <ToasterMessageContext.Provider
                    value={[toasterMessages, setToasterMessages]}>
                    <Toaster />
                  </ToasterMessageContext.Provider>
                </SetMessageContext.Provider>
              </MessageContext.Provider>
            </SetCloseMessageDialogContext.Provider>
          </OpenMessageDialogContext.Provider>
        </SetToasterMessageContext.Provider>
      </SetBusyContext.Provider>
    </div>
  );
}
