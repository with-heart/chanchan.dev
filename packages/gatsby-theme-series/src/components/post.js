import React from 'react'

export default ({title, content}) => {
  return (
    <article>
      <h2>{title}</h2>
      <section dangerouslySetInnerHTML={{__html: content}} />
    </article>
  )
}
