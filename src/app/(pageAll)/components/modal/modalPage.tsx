import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

type Props = {
  modalElement?: JSX.Element | JSX.Element[];
  title?: string;
  handleClose: () => void;
  open: boolean;
  style: React.CSSProperties;
};

const ModalPage: React.FC<Props> = ({ modalElement, title, handleClose, open, style }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography mb={3} id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            {modalElement}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalPage;
