import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { Provider } from 'react-redux'
import { setupStore } from './store'

const store = setupStore()

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  )
})
