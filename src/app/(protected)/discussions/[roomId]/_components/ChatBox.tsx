import React from 'react'

function ChatBox({conversation}:any) {
  return (
    <div>
      <div className=" h-[60vh] bg-secondary border rounded-xl flex flex-col relative p-4 overflow-auto">
        {/*<div>*/}
        {conversation.map((item:any,index:number)=>(
          <div key={index} className={`flex ${item.role === 'user' && 'justify-end'}`}>
            {item.role === 'assistant'?
              <h2 className="p-1 px-2 bg-primary mt-1 text-white inline-block rounded-md">{item.content}</h2>:
              <h2 className="p-1 px-2 bg-gray-300 mt-2 inline-block  justify-end rounded-md">{item.content}</h2>
            }

          </div>
        ))}
        {/*</div>*/}
      </div>
      <h2 className="mt-4 text-gray-400 text-sm">At the End of your conversation we will automatically generate feedback from your conversation</h2>
    </div>
  )
}

export default ChatBox
