import e from 'cors';
import React from 'react'
import { useState, useEffect } from "react";
import {FaSignInAlt } from 'react-icons/fa'
import { Link} from "react-router-dom";
function Login() {
    const [formData, setFormData] = useState({
        email:'',
        password:'',
       
    })
    const {email,password} = formData
    const onChange =(e)=>{
 setFormData((prevState)=>({
    ...prevState,[e.target.name]:e.target.value,}))
    } 
    const onSubmit =(e)=>{
        e.preventDefault()
    }
    return  (
        <>
          <section className='heading'>
        <h1>
        <FaSignInAlt />Login
        </h1>
        <p>Please login and start posting</p>
      </section>
          <section className="form">
            <form onSubmit={onSubmit}>
                
                 <div className="form-group">
                <input type="email" className="form-control"
                 id='email'
                 name="email" value={email}
                 placeholder='Please enter your email address'
                 onChange={onChange}/>
                 </div>
                 <div className="form-group">
                <input type="password" className="form-control"
                 id='password'
                 name="password" value={password}
                 placeholder='Please enter your password'
                 onChange={onChange}/>
                 </div>
                 <div className="form-group">
                    <button type='submit' className='btn btn-block'>Submit</button>
                 </div>
            </form>

          </section>
        </>
      );
}

export default Login
