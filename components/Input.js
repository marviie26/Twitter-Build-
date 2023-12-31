import { XMarkIcon, ChartBarIcon, CalendarIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { db, storage } from '../firebase'
import { Session, useSession ,status } from "next-auth/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";


function Input() {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const { data: session, status } = useSession();

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };


  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const sendPost = async () => {
    if (loading) return
    setLoading(true)
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    })

    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  };

  const [showEmojis, setShowEmojis] = useState(false)

  
  return (
    <div className={`"border-b-2 border-y-2 border-gray-700 p-3 space-x-3 flex overflow-y-hidden" ${loading && "opacity-60"}`}>
      <img className='h-12 w-12 rounded-full object-contain' src={session?.user?.image} alt="" />
      <div className="w-full divide-y divide-gray-700">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            rows="2"
            className="bg-transparent outline-none text-[#d9d9d9] placeholder-gray-500 text-lg tracking-wide w-full min-h-[50px]" />

          {selectedFile && (
            <div classname="relative">
              <div classname="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor" onClick={() => setSelectedFile(null)}>
                <XMarkIcon className="h-5 text-white font-bold" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="object-contain max-h-80 rounded-2xl" />
            </div>)}
        </div>
        {!loading && (<div className="flex justify-between items-center pt-2.5">
          <div className="flex items-center">
            <div className="icon " onClick={() => filePickerRef.current.click()}>
              <PhotoIcon className=" h-[22px] text-[#1d9bf0]" />
              <input type="file"
                hidden
                onChange={addImageToPost}
                ref={filePickerRef} />
            </div>

            <div className="icon rotate-90">
              <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
              <FaceSmileIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon">
              <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>
            <span className="absolute mt-[465px] ml-[-40px] max-w-xs border-transparent ">
              {showEmojis && (<Picker data={data}
                onEmojiSelect={addEmoji}
                emojiSize={20}
                emojiButtonSize={28}
                theme="dark"

              />)}
            </span>
          </div>
          <button className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
            disabled={!input.trim() && !selectedFile}
           onClick={sendPost}
          > Tweet </button>

        </div>)}
      </div>
    </div>

  )
};

export default Input