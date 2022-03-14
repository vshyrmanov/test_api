import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({email: '', password: ''})
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    }

    return (
        <div className={"row"}>
            <div className={"col s6 offset-s3"}>
                 <h1>First app </h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorizations</span>
                        <div>
                            <div className="input-field">
                                <input id="email" type="email" className="validate" name="email" value={form.email} onChange={changeHandler}/>
                                    <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field ">
                                <input  id="password" type="password" name="password" value={form.password} onChange={changeHandler}/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className={"btn yellow darken-4"} style={{marginRight: 10}} onClick={loginHandler}>Sign in</button>
                        <button className={"btn grey lighten-1"} onClick={registerHandler}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}