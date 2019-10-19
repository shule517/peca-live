import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'

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
      <Link to='/'>チャンネル一覧</Link>
      <Link to='/channels/1234'>チャンネル再生</Link>
      <Route exact path='/' render={(props) => <ChannelList />} />
      <Route path='/channels/:streamId' render={(props) => { return <ChannelPlayer />}} />
    </BrowserRouter>
  )
}

export default App;
