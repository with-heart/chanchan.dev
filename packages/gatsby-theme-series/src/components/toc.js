import React from 'react'
import {Link} from 'gatsby'
import SeriesList from './series-list'

export default ({currentPost, series}) => {
  return (
    <>
      <p>
        This post is part of the <Link to={series.slug}>{series.name}</Link>{' '}
        series.
      </p>

      <SeriesList currentPost={currentPost} series={series} />
    </>
  )
}
