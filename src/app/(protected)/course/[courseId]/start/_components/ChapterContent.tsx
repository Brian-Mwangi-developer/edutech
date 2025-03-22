import React from 'react'
import Youtube from "react-youtube";
import ReactMarkdown from "react-markdown";
const opts ={
  height:'400',
  width:'720',
  playerVars:{
    autoPlay:0
  }
}

const ChapterContent = ({chapter,content}: {chapter:any,content:any}) => {
  console.log("Content",content)
  return (
    <div className="p-10">
      <h2 className="font-medium text-2xl">{chapter?.ChapterName}</h2>
      <p className="text-gray-500">{chapter?.About}</p>

    {/*  Video*/}
      <div className="flex justify-center my-6">
        <Youtube
          videoId={content?.videoId}
          opts={opts}
        />
      </div>
      <div>
          <div className="p-5 bg-sky-50 mb-3 rounded-lg">
            <h2 className="font-medium text-2xl">{content?.content?.title}</h2>
            {/*<p className="whitespace-pre-wrap">{content?.content?.explanation}</p>*/}
            <ReactMarkdown>{content?.content?.explanation}</ReactMarkdown>

            {content?.content?.explanation && <div className="p-4 bg-black text-white rounded-md mt-3">
              <pre>
              <code>
                {content?.content?.code_example}
              </code>
            </pre>
            </div>}

          </div>
      </div>

    </div>
  )
}
export default ChapterContent
