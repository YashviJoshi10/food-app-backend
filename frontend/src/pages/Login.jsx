/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const Login = () => {

    const [form, setForm] = useState({email:'',password:''})
    const {login} = useContext(AuthContext)
    const nav = useNavigate()

    const submit = async(e)=>{
        e.preventDefault()
        try {
            const res = await api.post('/auth/login',form)
            const token = res.data?.token || res.data
            if (token) {
                login(token)
                nav('/')
            } else {
                alert('No token received from backend')
            }
        } catch (e) {
            alert("login failed")
        }
    }

  return (
    <div className='flex items-center justify-center m-7'>
        <div className='px-6 py-4 w-110 bg-white rounded-2xl'>
            <h1 className='font-bold text-xl'>Welcome back</h1>
            <p className='text-zinc-500'>Login to continue ordering delicious meals.</p>
            <form className='flex flex-col gap-4 my-3' onSubmit={submit}>
                <input type="email" placeholder='Email' className='p-2 rounded-xl border-gray-300 border-1 text-zinc-600' onChange={(e)=>setForm({...form,email:e.target.value})}/>
                <input type="password" placeholder='Password' className='p-2 rounded-xl border-gray-300 border-1 text-zinc-600' onChange={(e)=>setForm({...form,password:e.target.value})}/>
                <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer">Login</button>
            </form>
            <p className="text-sm text-slate-600 mt-4">Don't have an account? <a href="/auth/register" className="text-pgreen-500">Register</a></p>
        </div>
    </div>
  )
}

export default Login