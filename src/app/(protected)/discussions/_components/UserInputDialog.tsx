"use client"
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { coachingProps, discussionProps } from "@/lib/types"
import { Textarea } from "@/components/ui/textarea"
import { CoachingExpert } from "@/lib/discussiontypes"
import { Button } from "@/components/ui/button"
import { CloudUpload, File, Loader } from "lucide-react"
import { CreateDiscussionRoom } from "@/app/actions/createDiscussionRoomaction"

const UserInputDialog = ({ children, Discussion }: { children: React.ReactNode, Discussion: discussionProps }) => {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null)
  const [selectedExpertVoice, setSelectedExpertVoice] = useState<string | null>(null)
  const [coachingOption, setCoachingOption] = useState<string | null>(null)
  const [topic, setTopic] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const router = useRouter()
  const [selectedFileField, setSelectedFileField] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<{ documentId?: number, error?: string } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setIsLoading(true)
      // Simulate file processing delay for demonstration
      setTimeout(() => {
        setSelectedFileField(file)
        setIsLoading(false)
      }, 2000)
    }
  }

  // New function for handling the PDF discussion
    const handleDiscussPDF = async () => {
    if (!selectedFileField) return

    setIsUploading(true)

    try {
      // Create form data
      const formData = new FormData()
      formData.append('file', selectedFileField)
      formData.append('title', selectedFileField.name)

      // Send to our API endpoint
      const response = await fetch('/api/uploadPdf', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      // Log the response
      console.log('API Response:', result)
      setUploadResult(result)
      // setSelectedFileField(null)

      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload PDF')
      }

    } catch (error) {
      console.error('Error uploading PDF:', error)
      setUploadResult({ error: error instanceof Error ? error.message : 'Unknown error occurred' })
    } finally {
      setIsUploading(false)
      // setSelectedFileField(null)
    }
  }


  const onSubmit = async () => {
    setLoading(true)
    console.log("Selected Expert", selectedExpert)
    console.log("Selected Voice", selectedExpertVoice)
    console.log("Topic", topic)
    console.log("Coaching Option", Discussion.name)
    const result = await CreateDiscussionRoom({
      topic: topic!,
      coachingOption: coachingOption!,
      expertName: selectedExpert!,
      expertVoice: selectedExpertVoice!,
      fileName: selectedFileField?.name || ''

    })

    console.log("Results from create", result)
    setLoading(false)
    setOpenDialog(false)
    router.push('/discussions/' + result)
  }

  useEffect(() => {
    if (Discussion) {
      setCoachingOption(Discussion.name)
    }
  }, [Discussion])

  // Adjust disable condition: if "Talk to PDF", require a selected file; otherwise require topic
  const isNextDisabled = Discussion.name === "Talk to PDF"
    ? !selectedFileField || isUploading || isLoading
    : !topic || !selectedExpert || loading

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{Discussion.name}</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-3">
              <h2 className="text-black">Dive into {Discussion.name}</h2>
              {Discussion.name === "Talk to PDF" ? (
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center border border-gray-200 rounded-lg h-[25vh] w-[25vw]">
                    {/* File upload prompt if no file selected and not loading */}
                    {!selectedFileField && !isLoading && (
                      <label htmlFor="upload-file" className="cursor-pointer flex flex-col items-center">
                        <CloudUpload className="h-16 w-16 text-gray-400" />
                        <span className="text-gray-400 mt-4">Click to Select PDF File</span>
                      </label>
                    )}
                    {/* Loading animation */}
                    {isLoading && (
                      <div className="flex flex-col items-center z-20">
                        <Loader className="h-16 w-16 text-gray-400 animate-spin" />
                        <span className="text-gray-500 mt-4">Processing file...</span>
                      </div>
                    )}
                    {/* Display selected file */}
                    {selectedFileField && !isLoading && (
                      <div className="flex flex-col items-center">
                        <File className="h-16 w-16 text-gray-400" />
                        <span className="text-gray-700 mt-2">{selectedFileField.name}</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id="upload-file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  {/* "Discuss PDF" button */}
                  {selectedFileField && !isLoading && (
                    <Button
                      className="mt-4"
                      onClick={handleDiscussPDF}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        'Discuss PDF'
                      )}
                    </Button>
                  )}
                  <Textarea
                    placeholder="Enter more info if needed ..."
                    className="mt-2"
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
              ) : (
                <>
                  <Textarea
                    placeholder="Enter your Information here to give more context to model ..."
                    className="mt-2"
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </>
              )}

              <h2 className="text-black mt-5 font-semibold text-center">Select a Professional</h2>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-6 mt-3">
                {CoachingExpert.map((expert, index) => (
                  <div key={index} onClick={() => {
                    setSelectedExpert(expert.name)
                    setSelectedExpertVoice(expert.voice)
                  }}>
                    <Image
                      src={expert.avatar}
                      alt={expert.name}
                      width={100}
                      height={100}
                      className={`rounded-2xl h-[80px] w-[80px] object-cover hover:scale-105 transition-all cursor-pointer p-1 border ${
                        selectedExpert === expert.name ? "border-black" : ""
                      }`}
                    />
                    <h2 className="text-center">{expert.name}</h2>
                  </div>
                ))}
              </div>
              <div className="flex gap-5 justify-end mt-4">
                <DialogClose asChild>
                  <Button variant={'outline'}>Cancel</Button>
                </DialogClose>
                <Button onClick={onSubmit} disabled={isNextDisabled}>
                  {loading && <Loader className="animate-spin mr-2" />}
                  Next
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default UserInputDialog
