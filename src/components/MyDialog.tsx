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

const ShouldDisplayActions = (props: any) => {
  const { onClose, onSave, save } = props;
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
  return <div></div>;
};

const Text = (props: any) => {
  const children = props.children;
  if (typeof children === 'string') {
    return <DialogContentText>{children}</DialogContentText>;
  }
  return <div>{children}</div>;
};

const MyDialog = (props: MyDialogProps) => {
  const { children, onClose, onSave, open, save, title } = props;
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
        <Text content={children} />
      </DialogContent>
      <ShouldDisplayActions onClose={onClose} onSave={onSave} save={save} />
    </Dialog>
  );
};

export default MyDialog;
