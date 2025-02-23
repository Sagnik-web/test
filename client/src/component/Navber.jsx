import React, { useEffect, useState } from 'react'
import {useHistory, Link} from 'react-router-dom'
import 'cookie-store';


function Navber() {

    const history = useHistory()
    const [isLiggedIn,setIsLoggedIn] = useState(false)

    useEffect(()=>{
      cookieStore.get('token')
      .then(res=>{
        console.log(res);
        if(res.value != ''){
          setIsLoggedIn(true)
          console.log(res);

        }
      })

      .catch(()=>{
        console.log("Error");
      })

    },[])


    const logout = async()=>{
      await cookieStore.set('token','')
      setIsLoggedIn(false)
      history.push('/login')
    }

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
        {!isLiggedIn?
        <><button className="bg-transparent text-white border border-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={()=>history.push('/signup')}>
        Sign Up
      </button>
      <button className="bg-transparent text-white border border-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium ml-4 cursor-pointer" onClick={()=>history.push('/login')}>
        Log In
      </button>
      </>:  <button className="bg-transparent text-white border border-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium ml-4 cursor-pointer" onClick={logout}>
            Logout
          </button>
      }  
          
          
        </div>
      </div>
    </div>

    
  </nav>
  )
}

export default Navber