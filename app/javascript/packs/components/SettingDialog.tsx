import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import { updatePeerCast } from "../modules/peercastModule";
import { useDispatch } from "react-redux";

type Props = {
  open: boolean,
  onClose: () => void,
}

const SettingDialog = (props: Props) => {
  const dispatch = useDispatch();
  const { open, onClose } = props;

  const onSaveClick = () => {
    updatePeerCast(dispatch, "localhost", 7144)
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">設定</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="peercast-host"
          label="PeerCastのIP"
          size="small"
          value="localhost"
          fullWidth
        />
        <TextField
          margin="dense"
          id="peercast-port-no"
          label="PeerCastのポート番号"
          size="small"
          value="7144"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          // onClick={handleCheckPort}
          color="primary">
          ポートチェック
        </Button>
        <Button
          onClick={onSaveClick}
          color="primary">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default SettingDialog;
