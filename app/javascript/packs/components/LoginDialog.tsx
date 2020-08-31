import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import React, { useEffect, useState } from 'react'
import SignInScreen from './SignInScreen'
import { signOutUser, useSelectorUser } from '../modules/userModule'
import Button from '@material-ui/core/Button'
import firebase from '../firebase'
import { useDispatch } from 'react-redux'

type Props = {
  open: boolean
  onClose: () => void
}

const LoginDialog = (props: Props) => {
  const dispatch = useDispatch()
  const { open, onClose } = props
  const currentUser = useSelectorUser()

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
      <DialogTitle>ログイン</DialogTitle>
      <DialogContent dividers>
        {currentUser.isLogin ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              onClose()
              firebase.auth().signOut()
              signOutUser(dispatch)
            }}
          >
            ログアウト
          </Button>
        ) : (
          <>
            <SignInScreen />
            ログインするとお気に入り機能が使えます！
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
