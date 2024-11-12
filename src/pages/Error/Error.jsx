import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Error component displays a 404 error page.
 * 
 * This component renders a simple error page with a 404 message,
 * an explanation, and a link to return to the home page.
 *
 * @component
 * @returns {JSX.Element} The rendered 404 error page
 */
export default function Error() {
  return (
    <div className='wrapperError'>
        <h1 className='Error404'>404</h1>
        <p className='Error404Content'>The page you are requesting does not exist.</p>
        <Link className='Error404Link' to='/'>Go back to home page</Link>
    </div> 
  )
}