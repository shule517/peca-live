import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import React, { useEffect, useState } from 'react'
import SignInScreen from './SignInScreen'
import { signOutUser, useSelectorUser } from '../modules/userModule'
import Button from '@material-ui/core/Button'
import firebase from '../firebase'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import FavoriteIcon from '@material-ui/icons/Favorite'

type Props = {
  open: boolean
  onClose: () => void
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

const LoginDialog = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { open, onClose } = props
  const currentUser = useSelectorUser()

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
      <DialogTitle>
        {currentUser.isLogin ? 'ログイン' : 'ログインしてもっと便利に！'}
      </DialogTitle>
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
            <List className={classes.root}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FavoriteIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="お気に入りをPC/スマホで共有！" />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <NotificationsActiveIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="お気に入り配信のはじまりを通知！" />
              </ListItem>
            </List>

            <SignInScreen />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
