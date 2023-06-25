import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  textAlign: 'center',
  p: 4,
};

interface LoginModalProps {
  open: boolean;
  onButtonClick: () => void;
}

const LoginModal = ({ open, onButtonClick }: LoginModalProps) => (
  <div>
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Hello, you must be logged in!
        </Typography>
        <Button type="button" variant="contained" onClick={onButtonClick}>
          Login
        </Button>
      </Box>
    </Modal>
  </div>
);

export default LoginModal;
