import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image";


function LoadingDialog({loading}:{loading:boolean}) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent >
        <AlertDialogTitle></AlertDialogTitle>
        <AlertDialogHeader>
          <AlertDialogDescription>
            <div className="flex flex-col items-center py-10">
              <Image src={'/loader.gif'} alt="Loader" width={100} height={100}/>
              <h2>Please wait as Ai is Working on your Course</h2>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default LoadingDialog
