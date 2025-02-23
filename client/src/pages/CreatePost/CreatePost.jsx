import React, {useState,useEffect} from 'react'
import 'cookie-store';
import { createPost } from '../../api/postAPI';
import { toast } from 'react-toastify';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  

  

    const handleSubmit = async() => {
      let token = await cookieStore.get('token');
      // console.log(token);

        if(!title || !description){
            return
        }
     
      createPost(token.value,{title:title, desc:description})
      .then(res=>{
        console.log(res.data);
        toast.success("Message Posted Successfully")
      }).catch(()=>{
        console.log('Error: Post Not ');
        toast.error("Message is not Posted yet. try again")
      })
      

      // console.log({ title, description });

      setTitle('')
      setDescription('')
    };
  
    return (
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          {/* Form Title */}
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create a New Post</h2>
  
          {/* Form */}
          {/* <form onSubmit={handleSubmit}> */}
            {/* Title Field */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter title"
                required
              />
            </div>
  
            {/* Description Field */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter description"
                required
              />
            </div>
  
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          {/* </form> */}
        </div>
      </div>
    );
}

export default CreatePost