import React from 'react'
import {useHistory, Link} from 'react-router-dom'


function Navber() {

    const history = useHistory()

  return (
    <nav className="bg-blue-600 p-4">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        
        <div className="flex-shrink-0 text-white font-bold text-lg">Brand</div>
     
        <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Create Post
            </Link>
          </div>
        </div>
        {/* Authentication Buttons */}
        <div className="hidden sm:block sm:ml-6">
          <button className="bg-transparent text-white border border-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={()=>history.push('/signup')}>
            Sign Up
          </button>
          <button className="bg-transparent text-white border border-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium ml-4 cursor-pointer" onClick={()=>history.push('/login')}>
            Log In
          </button>
        </div>
      </div>
    </div>

    
  </nav>
  )
}

export default Navber