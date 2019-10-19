import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import styled from 'styled-components';

const Logo = styled.img`
  height: 50px;
  width: 180px;
  padding-left: 7px;
`

const ChannelList = () => {
  return (
    <div>
      チャンネル一覧
    </div>
  )
}

const ChannelPlayer = () => {
  return (
    <div>
      チャンネル再生
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Link to='/'>
        <Logo src='/images/pecalive.png' />
      </Link>
      <Link to='/'>チャンネル一覧</Link>
      <Link to='/channels/1234'>チャンネル再生</Link>
      <Route exact path='/' render={(props) => <ChannelList />} />
      <Route path='/channels/:streamId' render={(props) => <ChannelPlayer />} />
    </BrowserRouter>
  )
}

export default App;
