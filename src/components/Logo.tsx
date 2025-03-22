import React from 'react'
import Link from "next/link";
import {cn} from "@/lib/utils";
import {BookDashed} from "lucide-react";

function Logo({
  fontSize="2xl",
  iconSize=20,
  modalOpen
}:{
  fontSize?:string,
  iconSize?:number
  modalOpen:boolean
}){
  return (
    <Link href="/"
          className={cn("text-2xl font-extrabold flex items-center gap-2",fontSize)}>
      <div className="rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 p-2">
        <BookDashed size={iconSize} className="stroke-white" />
      </div>
      <div>
        {modalOpen &&
        <div>
        <span className="bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">Edu</span>
        <span className="text-stone700 dark:text-stone-300"> Tech</span>
        </div>
        }

      </div>
    </Link>
  )
}

export default Logo