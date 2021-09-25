import React from 'react'
import { Content } from './components/Content'
import { Header } from './components/Header'

const MasterLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className="b-example-divider"></div>
      <div className="container-fluid">
        <div className="row" >
          <main className="col-md-9  col-lg-10 px-md-4">
            <Content>{children}</Content>
          </main>
        </div>
      </div>
    </>
  )
}

export { MasterLayout }
