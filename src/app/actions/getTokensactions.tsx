"use server";
import axios from 'axios'
export const getToken=async()=>{
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const url = baseUrl + '/api/getToken'
  console.log(url)
  const result = await axios.get(url);
  return result.data
}