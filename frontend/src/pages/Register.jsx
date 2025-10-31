/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const Register = () => {
    const [form, setForm] = useState({userName:'', email:'', password:'', phone:'', address:''})
    const nav = useNavigate()

    const submit =async e=>{
        e.preventDefault()
        try {
            await api.post('/auth/register', form)
            alert('Registered. Please login.')
            nav('/auth/login')
            console.log('qq',form)
        } catch(e){
        // console.error('Registration error:', e.response?.data || e.message);
        alert('Registration failed')
        }
    }
  return (
    <div className='flex items-center justify-center m-7'>
        <div className='px-6 py-4 w-110 bg-white rounded-2xl'>
            <h1 className='font-bold text-xl'>Create Account</h1>
            <p className='text-zinc-500'>Sign up to start ordering</p>
            <form className='flex flex-col gap-4 my-3' onSubmit={submit}>
                <input type="text" placeholder='Name' className='p-2 rounded-xl border-gray-300 border-1 text-zinc-600' onChange={(e)=>setForm({...form,userName:e.target.value})}/>
                <input type="email" placeholder='Email' className='p-2 rounded-xl border-gray-300 border-1 text-zinc-600' onChange={(e)=>setForm({...form,email:e.target.value})}/>
                <input type="password" placeholder='Password' className='p-2 rounded-xl border-gray-300 border-1 text-zinc-600' onChange={(e)=>setForm({...form,password:e.target.value})}/>
                <input type='text' placeholder='Phone' className='p-2 rounded-xl border-gray-300 border-1 text-zinc-600' onChange={(e)=>setForm({...form,phone:e.target.value})}/>
                <textarea className='border-gray-300 border-1 text-zinc-600 p-2 rounded-xl' placeholder='address' onChange={(e)=>setForm({...form,address:e.target.value})}></textarea>
                {/* <div className='flex gap-2 text-zinc-500'>
                    Role: <input type="radio" name="" />client
                    <input type="radio" name="" />admin
                </div> */}
                <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer">Register</button>
            </form>
            <p className="text-sm text-slate-600 mt-4">Already have an account? <a href="/auth/login" className="text-pgreen-500">Login</a></p>
        </div>
    </div>
  )
}

export default Register