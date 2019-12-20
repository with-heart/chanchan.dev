import React from 'react'

export default ({title, children}) => {
  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '640px',
      }}
    >
      <header>
        <h1>{title}</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}
