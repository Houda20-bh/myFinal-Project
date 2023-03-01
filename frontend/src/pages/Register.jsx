import e from 'cors';
import React from 'react'
import { useState, useEffect } from "react";
import { FaUser } from 'react-icons/fa'
import { Link} from "react-router-dom";
function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email:'',
        password:'',
        password2:'',
    })
    const {firstName,lastName,email,password, password2} = formData
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
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
          <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <input type="text" className="form-control"
                 id='firstName'
                 name="firstName" value={firstName}
                 placeholder='Please enter your firstName'
                 onChange={onChange}/>
                 </div>
                <div className="form-group">
                <input type="text" className="form-control"
                  id='lastName'
                 name="lasttName" value={lastName}
                 placeholder='Please enter your lastName'
                 onChange={onChange}/>
                 </div>
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
                <input type="password" className="form-control"
                 id='password2'
                 name="password2" value={password2}
                 placeholder='Confirm your password'
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

export default Register
