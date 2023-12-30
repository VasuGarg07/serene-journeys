import React, { createContext, useContext, ReactNode, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TransitionProps } from '@mui/material/transitions';
import Zoom from '@mui/material/Zoom';
import './DialogProvider.styles.scss'

// Dialog Transition
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Zoom {...props} ref={ref} />;
});

// Context Properties
interface DialogContextProps {
  openDialog: (content: ReactNode) => void;
  closeDialog: () => void;
  formImageLink: string;
  setFormImageLink: React.Dispatch<React.SetStateAction<string>>;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);


// Dialog Provider
const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);
  const [formImageLink, setFormImageLink] = useState<string>('');

  const openDialog = (content: ReactNode) => {
    setDialogContent(content);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setDialogContent(null);
    setIsOpen(false);
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, formImageLink, setFormImageLink }}>
      {children}
      <Dialog open={isOpen} onClose={closeDialog} TransitionComponent={Transition} keepMounted>
        <DialogContent sx={{ padding: "0px" }}>{dialogContent}</DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};

// Custom useContext Hook
const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

export { DialogProvider, useDialog };
