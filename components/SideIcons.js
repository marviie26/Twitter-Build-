import React from 'react'

function SideIcons({ Icon, text, active}) {
  return (
    <div className = {`text-white flex justify-center items-center xl:justify-start text-xl space-x-3 hoverAnimation ${active && 'font-bold'}`}>
      <Icon className="h-7" />
      <span className= "hidden xl:inline">{text}</span>
    </div>
  )
}

export default SideIcons