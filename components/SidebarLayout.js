
import React from 'react'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react';
import { HomeIcon } from '@heroicons/react/24/solid'
import SideIcons from './SideIcons'
import {
    HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, ClipboardDocumentIcon, UserIcon, EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from 'next/router';

export default function SidebarLayout() {
    const router = useRouter()
    const { data: session } = useSession();
    return (
        <main>
            <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
                <div className="flex items-center justify-center w-12 h-20 hoverAnimation p-2 xl:ml-25 rounded-full ">
                    <Image alt="twitter logo" src="https://img.icons8.com/?size=1x&id=5MQ0gPAYYx7a&format=png" width={30} height={30} />
                </div>
                <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
                  <div onClick={() => router.push(`/`)} > <SideIcons text="Home" Icon={HomeIcon} active  /></div> 
                    <SideIcons text="Explore" Icon={HashtagIcon} />
                    <SideIcons text="Notifications" Icon={BellIcon} />
                    <SideIcons text="Messages" Icon={InboxIcon} />
                    <SideIcons text="Bookmarks" Icon={BookmarkIcon} />
                    <SideIcons text="List" Icon={ClipboardDocumentIcon} />
                    <SideIcons text="Profile" Icon={UserIcon} />
                    <SideIcons text="More" Icon={EllipsisHorizontalCircleIcon} />
                </div>
                <button className=" hidden xl:inline ml-auto text-white text-lg bg-sky-600 rounded-full w-56 h-[52] hoverAnimation font-bold shadow-md hover:bg-sky-800">Tweet</button>
                <div
                    className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation xl:ml-auto xl:-mr-10"
                    onClick={() => signOut()}
                >  <img
                        src={session?.user?.image}
                        alt=""
                        className="h-10 w-10 rounded-full xl:mr-2.5"
                    />
                    <div className="hidden xl:inline leading-5">
                        <h4 className="font-bold">{session?.user?.name}</h4>
                        <p className="text-[#6e767d]">@{session?.user?.tag}</p>
                    </div>
                    <EllipsisHorizontalCircleIcon className="h-5 hidden xl:inline ml-10" />
                </div>
            </div>
        </main>
    )
}