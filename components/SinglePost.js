import React, { useEffect, useState } from 'react'
import Input from './Input'
import Post from './Post'
import { onSnapshot, collection, query, orderBy, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from 'next/router';
import Comment from './Comment';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const SinglePost = () => {

    const [post, setPost] = useState([])
    const router = useRouter()
    const { id } = router.query;
    const [comments, setComments] = useState([])

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "posts", id, "comments"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => setComments(snapshot.docs)
            ),
        [db, id]
    )

    useEffect(
        () =>
            onSnapshot(doc(db, "posts", id), (snapshot) => {
                setPost(snapshot.data());
            }),
        [db]
    )

    return (
        <section className= "text-white flex-grow border-l border-r border-b-gray-700  sm:ml-[73px] xl:ml-[370px] max-w-2xl ">
            <div className='sticky top-0 bg-black flex items-center gap-4 font-medium text-[20px] px-4 py-2'>
                <ArrowLeftIcon className='cursor-pointer h-7' onClick={() => router.push(`/`)} />
                Twitter
            </div>

            <Post id={id} post={post} />

            <div className='border-t border-gray-700'>
                {comments.length > 0 && (
                    <div className="pb-72">
                        {comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                id={comment.id}
                                comment={comment.data()}
                            />
                        ))}
                    </div>
                )}
            </div>


        </section>
    )
}

export default SinglePost