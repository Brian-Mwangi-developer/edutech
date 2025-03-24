import React from 'react'

const RoomIdLayout =async ({children,params}:{children: React.ReactNode;params: {roomId: string}}) => {

  const {roomId} = await params
  return (
    <div>
      {children}
    </div>
  )
}
export default RoomIdLayout
