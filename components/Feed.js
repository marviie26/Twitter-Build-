import { SparklesIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Input from './Input'
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from 'react';
import { useState } from 'react';
import Post from './Post';
function FeedLayout() {
  const [posts, setPosts] = useState([])

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),[db]
  )
  return (
    <div className="text-white flex-grow border-l border-r border-b-gray-700  sm:ml-[73px] xl:ml-[370px] max-w-2xl ">
        <div className="text-slate-200 flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700 ">
        <h2 className="text-lg font-bold sm:text-xl " >Home</h2>
        <div className="hoverAnimation items-center justify-center flex w-9 h-9 xl:px-0 ml-auto">
            <SparklesIcon className="h-5 text-white" />
        </div>
        </div>

        <Input />
        {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post.data()} />
      ))}
        </div>
  )
}

export default FeedLayout