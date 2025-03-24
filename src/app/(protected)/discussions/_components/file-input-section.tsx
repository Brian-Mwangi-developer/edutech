// "use client"
// import React, { useState } from 'react'
// import { CloudUpload, File, Loader } from 'lucide-react'
// import { Button } from '@/components/ui/button'
//
// const FileInputSection = () => {
//   const [selectedFile, setSelectedFile] = useState<any| null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [isUploading, setIsUploading] = useState(false)
//   const [uploadResult, setUploadResult] = useState<{documentId?: number, error?: string} | null>(null)
//
//   const handleFileChange = (e:any) => {
//     const file = e.target.files[0]
//     if (file && file.type === "application/pdf") {
//       setIsLoading(true)
//
//       setTimeout(() => {
//         setSelectedFile(file)
//         setIsLoading(false)
//       }, 2000)
//     }
//   }
//   const handleDiscussPDF = async () => {
//     if (!selectedFile) return
//
//     setIsUploading(true)
//
//     try {
//       // Create form data
//       const formData = new FormData()
//       formData.append('file', selectedFile)
//       formData.append('title', selectedFile.name)
//
//       // Send to our API endpoint
//       const response = await fetch('/api/uploadPdf', {
//         method: 'POST',
//         body: formData,
//       })
//
//       const result = await response.json()
//
//       // Log the response
//       console.log('API Response:', result)
//       setUploadResult(result)
//       setSelectedFile(null)
//
//       if (!response.ok) {
//         throw new Error(result.error || 'Failed to upload PDF')
//       }
//
//     } catch (error) {
//       console.error('Error uploading PDF:', error)
//       setUploadResult({ error: error instanceof Error ? error.message : 'Unknown error occurred' })
//     } finally {
//       setIsUploading(false)
//       setSelectedFile(null)
//     }
//   }
//
//   return (
//     <div className="mt-20 flex flex-col items-center justify-center">
//       <div className="flex flex-col items-center justify-center border border-gray-200 h-[40vh] w-[40vw] rounded-lg">
//         {/* Show file upload prompt if no file is selected and not loading */}
//         {!selectedFile && !isLoading && (
//           <label htmlFor="upload-file" className="cursor-pointer flex flex-col items-center">
//             <CloudUpload className="h-16 w-16 text-gray-400" />
//             <span className="text-gray-400 mt-4">Click to Select PDF File</span>
//           </label>
//         )}
//         {/* Show loading animation */}
//         {isLoading && (
//           <div className="flex flex-col items-center">
//             <Loader className="h-16 w-16 text-gray-400 animate-spin" />
//             <span className="text-gray-500 mt-4">Processing file...</span>
//           </div>
//         )}
//
//         {selectedFile && !isLoading && (
//           <div className="flex flex-col items-center">
//             <File className="h-16 w-16 text-gray-400" />
//             <span className="text-gray-700 mt-2">{selectedFile.name}</span>
//           </div>
//         )}
//         <input
//           type="file"
//           id="upload-file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           className="hidden"
//         />
//       </div>
//
//       {selectedFile && !isLoading && (
//         <Button
//           className="mt-4"
//           onClick={handleDiscussPDF}
//           disabled={isUploading}
//         >
//           {isUploading ? (
//             <>
//               <Loader className="mr-2 h-4 w-4 animate-spin" />
//               Uploading...
//             </>
//           ) : (
//             'Discuss PDF'
//           )}
//         </Button>
//       )}
//     </div>
//   )
// }
//
// export default FileInputSection
