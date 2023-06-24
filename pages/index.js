
import { Inter } from 'next/font/google'
import Login from '@/components/Login'
import { getSession, useSession } from 'next-auth/react'
import SidebarLayout from '@/components/SidebarLayout'
import FeedLayout from '@/components/Feed'
import { useContext } from 'react'
import { AppContext } from '@/contexts/AppContext'
import Modal from '@/components/Modal'
import Trending from '@/components/TrendLayout'
import SinglePost from '@/components/SinglePost'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()
  const [appContext] = useContext(AppContext)

  if (!session) return <Login />
  return (
    <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto text-slate-300 " >
      <SidebarLayout />
      <FeedLayout />
   
      <Trending />
      {appContext?.isModalOpen && <Modal />}
    </main>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
