import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import {useDispatch} from 'react-redux'

function useGetCurrentUser() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const getCurrentUser = async()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/user/me`,{withCredentials: true});
            dispatch(setUserData(result.data))
        } catch (error) {
            console.log(error)
        }
    }
    getCurrentUser();
  },[])
}

export default useGetCurrentUser