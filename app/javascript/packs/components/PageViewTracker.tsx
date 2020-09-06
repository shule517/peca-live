import React, { useEffect, useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import ReactGA from 'react-ga'

type Props = {
  children: React.ReactNode
}

const PageViewTracker = (props: Props) => {
  const { children } = props
  const [initilized, setInitilized] = useState<boolean>(false)

  if (!initilized) {
    ReactGA.initialize('UA-46281082-3')
    setInitilized(true)
  }

  useEffect(() => {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  })

  return <Route children={children} />
}

export default withRouter(PageViewTracker)
