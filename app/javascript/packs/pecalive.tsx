import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { Provider } from 'react-redux'
import { setupStore } from './store'
import { CookiesProvider } from 'react-cookie'

const store = setupStore()

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  )
})
