import React, {useEffect} from 'react'

const disableSplashScreen = () => {
  const splashScreen = document.getElementById('splash')
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'none')
  }
}

const LayoutProvider: React.FC = ({children}) => {
  useEffect(() => {
    disableSplashScreen()
  }, [])

  return <>{children}</>
}

export { LayoutProvider}


