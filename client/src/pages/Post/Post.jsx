import React, { useEffect, useState } from 'react'
import love_outline from '../../assets/love_outline.png'
import love from '../../assets/love.svg'
import 'cookie-store';
import { getAllPosts, likePost, unlikePost } from '../../api/postAPI';
import { userDetailsAPI } from '../../api/userAPI';


function Post() {
  const [data,setData] = useState([])
  const [userID,setUserID] = useState('')

  function getUserDetails(token) {
    if(token){
      userDetailsAPI(token.value)
      .then(res=>{
        setUserID(res.data.user)
      })
      .catch(()=>{
        console.log("Error");
      })
      }
      
  }

  useEffect(()=>{
    

    getAllPosts()
    .then(async res=>{
      console.log(res.data);
      let token = await cookieStore.get('token')
      await getUserDetails(token)
      await setData(res.data.posts)
    })
    .catch(err=>{
      console.log(`Error: ${err}`);
    })
  },[])

  
  // Add a like function
  const addLike = (id, user) => {
    setData((prevItems) => 
      prevItems.map(item => 
        item._id === id
          ? { ...item, likes: [...item.likes, user] }
          : item
      )
    );
  };

  // Remove a like function
  const removeLike = (id, user) => {
    console.log(id,user);
    setData((prevItems) => 
      prevItems.map(item => 
        item._id === id
          ? { ...item, likes: item.likes.filter(like => like !== user) }
          : item
      )
    );
  };


  const likeAndUnlike =async(el,ID)=>{
    let token = await cookieStore.get('token');
    console.log(token);
    if(!el?.likes.includes(userID)){
      likePost(token.value,ID)
      .then(res=>{
        console.log(res.data);
        addLike(ID,userID)
        console.log(data);
      toast.success("Post Liked")

      })
      .catch(err=>{
        console.log("Error: ");
      })
    }

    if(el?.likes.includes(userID)){
      unlikePost(token.value,ID)
      .then(res=>{
        console.log(res.data);
        // el?.likes.remove(userID)
        removeLike(ID,userID)
      toast.success("Post Unliked")

      })
      .catch(err=>{
        console.log("Error: ");
      })
    }

    // console.log(isLiked,ID);
  }

  

  return (
    <>
    {data.map(el=>

<div key={el._id} className="max-w-sm mx-auto mt-7 bg-white shadow-xl rounded-lg overflow-hidden">
<div className="p-4">
  <div className="flex items-center space-x-3">
  
    <h2 className="text-xl font-semibold text-gray-900">{el.title}</h2>
  </div>
  <p className="mt-2 text-gray-700">{el.desc}</p>
  <div className="mt-4 flex justify-between items-center">
  
    <span className="text-sm font-medium text-gray-600"> By {el.user?.name}</span>
    
    <div className='flex items-center' >
    <span className="text-sm font-medium text-gray-600"> {el.likes.length}</span>

    <button className=" text-white px-4 py-2 rounded-full cursor-pointer" onClick={()=>likeAndUnlike(el,el._id)}>
      {el?.likes.includes(userID) ? <img src={love} width={35}/> :<img src={love_outline} width={30}/>}
      {/* */}
    </button>
    </div>
    

  </div>
</div>
</div>
    )}
    

    
    
    </>
  )
}

export default Post