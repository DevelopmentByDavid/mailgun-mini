import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

interface Props {
    title: string;
    open: boolean;
    onClose: () => void;
}

export default function Request({ title, open, onClose, children }: React.PropsWithChildren<Props>) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent style={{ minWidth: 500 }}>{children}</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="primary">
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
}
