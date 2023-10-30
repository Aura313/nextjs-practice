import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function Practice() {
  const [posts, setPosts] = useState([]);
  const [sliceEnd, setSliceEnd] = useState(20);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      let data = res.data.slice(0, sliceEnd);
      setPosts(data);
    } catch (e) {
      console.log(e.message);
    }
  }, [sliceEnd]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setSliceEnd((prev) => prev + 20);
  };

  const handleRemoveEl = (id) => {
    console.log(id, 'dqwhkj');
    setPosts([...posts].filter((i) => i.id !== id));
  };

  const handleUpdateEl = (id) => {
    console.log('Update:', id);
    let newBody = 'NEW BODY CONTENT';
    let updatedArr = posts.map((i) => {
      if (i.id == id) {
        i.body = newBody;
      }
      return i;
    });

    setPosts(updatedArr);
  };
  useEffect(() => {
    fetchData();

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchData]);

  console.log(posts, 'popoop');
  return (
    <div className='min-h-screen bg-gray-100'>
      <h1>Practice{posts.length} </h1>

      <div className='flex items-center overflow-hidden flex-wrap justify-between '>
        {posts &&
          posts.map((i) => (
            <div
              key={i.id}
              className='p-4 w-1/6 bg-white h-64 overflow-y-auto m-4 rounded shadow-md'
            >
              <button
                onClick={() => handleUpdateEl(i.id)}
                className='p-2 bg-rose-500 rounded-lg'
              >
                {' '}
                U
              </button>
              <button
                onClick={() => handleRemoveEl(i.id)}
                className='p-2 bg-cyan-800 rounded-lg'
              >
                {' '}
                RM
              </button>
              <h1>
                {' '}
                ID: {i.id} UserID{i.userId}
              </h1>
              <h2>{i.title}</h2>
              <p>{i.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
