'use client';

import { createContext, useState } from 'react';
import AlertModal from './modalAlert';

type AlertContextType = {
  modal: any;
  setModal: React.Dispatch<React.SetStateAction<any>>;
  infoModal: infoModalType;
  setInfoModal: React.Dispatch<React.SetStateAction<infoModalType>>;
  handleContinue: () => void;
  openAlertModal: (objectInfo: any) => void;
  closeAlertModal: () => void;
};

type alertContextProps = {
  children: React.ReactNode;
};

type infoModalType = {
  title: string;
  description: string;
  callback: () => Promise<void>;
};

export const AlertContext = createContext<AlertContextType>({
  modal: false,
  setModal: () => {},
  infoModal: {
    title: '',
    description: '',
    callback: async () => {},
  },
  setInfoModal: () => {},
  handleContinue: () => {},
  openAlertModal: () => {},
  closeAlertModal: () => {},
});

export function AlertContextProvider({ children }: alertContextProps) {
  const [modal, setModal] = useState(false);
  const [infoModal, setInfoModal] = useState<infoModalType>({
    title: '',
    description: '',
    callback: async () => {},
  });

  const openAlertModal = (objectInfo: infoModalType) => {
    setInfoModal({
      title: objectInfo.title,
      description: objectInfo.description,
      callback: objectInfo.callback,
    });
    setModal(true);
  };

  const closeAlertModal = () => {
    setModal(false);
    setInfoModal({
      title: '',
      description: '',
      callback: async () => {},
    });
  };

  const handleContinue = async () => {
    try {
      setModal(false);
      await infoModal.callback();
      setInfoModal({
        title: '',
        description: '',
        callback: async () => {},
      });
    } catch (error) {}
  };

  return (
    <AlertContext.Provider
      value={{
        modal,
        setModal,
        infoModal,
        setInfoModal,
        handleContinue: handleContinue,
        openAlertModal: (objectInfo) => openAlertModal(objectInfo),
        closeAlertModal,
      }}
    >
      {children}
      <AlertModal />
    </AlertContext.Provider>
  );
}
