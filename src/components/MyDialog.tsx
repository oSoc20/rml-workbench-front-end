import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

interface MyDialogProps {
  children: string | JSX.Element;
  onClose: any;
  onSave?: any;
  open: boolean;
  save?: string;
  title: string | JSX.Element;
}

const ShouldDisplayActions = ({ onClose, onSave, save }) => {
  if (onSave) {
    return (
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={onSave}>
          {save}
        </Button>
      </DialogActions>
    );
  }
  return <></>;
};

const Text = ({ children }) => {
  if (typeof children === 'string') {
    return <DialogContentText>{children}</DialogContentText>;
  }
  return <div>{children}</div>;
};

const MyDialog = ({ children, onClose, onSave, open, save, title }: MyDialogProps) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      onClose={onClose}
      scroll={'paper'}
      aria-labelledby="settings-dialog-title"
      aria-describedby="settings-dialog-description"
    >
      <DialogTitle id="Dialog">{title}</DialogTitle>
      <DialogContent>
        <Text children={children} />
      </DialogContent>
      <ShouldDisplayActions onClose={onClose} onSave={onSave} save={save} />
    </Dialog>
  );
};

export default MyDialog;
