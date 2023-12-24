import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// eslint-disable-next-line react/prop-types
export default function Modal({ children, open, handleClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            Detalle del restaurante
          </DialogTitle>
          <Button
            onClick={handleClose}
            aria-labelledby="responsive-dialog-title"
            autoFocus
            sx={{ marginRight: 2, border: "none", color: theme.palette.grey }}
          >
            <CloseIcon />
          </Button>
        </Box>
        <DialogContent>
          <DialogContentText>
            {children}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
