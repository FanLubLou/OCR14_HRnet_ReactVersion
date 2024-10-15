import React from 'react'

export default function Error() {
  return (
    <div className='wrapperError'>
        <h1 className='Error404'>404</h1>
        <p className='Error404Content'>The page you are requesting does not exist.</p>
        <Link className='Error404Link' to='/'>Go back to home page</Link>
    </div> 
  )
}
