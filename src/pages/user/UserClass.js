import { GoMortarBoard } from "react-icons/go";
import { useParams } from "react-router-dom";

import '../../style/dashboard.css';

//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';

function Class() {
    const { id } = useParams();
    const [classRoom, SetClass] = useState({});

    const [display2, setDisplay2] = useState("join");

    function changeDisplay3() {
        if (display2 === "join")
     {
        setDisplay2("join2");
        setProfile("profile");
        setDisplay("classOp");}
        else{
            setDisplay2("join");
            setProfile("profile");
            setDisplay("classOp");}
    }

    const [display, setDisplay] = useState("classOp");
  
    const changeDisplay = () => {
     if (display === "classOp")
     {
        setProfile("profile");
        setDisplay("classOp2");
        setDisplay2("join");}
        else{
            setProfile("profile");
            setDisplay("classOp");
            setDisplay2("join");}
    };

    const [profile, setProfile] = useState("profile");
  
    const changeDisplay2 = () => {
     if (profile === "profile")
     {
        setProfile("profile2");
        setDisplay("classOp");
        setDisplay2("join");}
        else{
            setProfile("profile");
            setDisplay("classOp");
            setDisplay2("join");}
    };
    //state user
    const [user, setUser] = useState({});

    const [code, setCode] = useState("");

    //define history
    const history = useHistory();

    //token
    const token = localStorage.getItem("token");

    let urlClass = 'http://localhost:8000/api/classroom/'+id;
    console.log(urlClass);
    //function "fetchData"
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('http://localhost:8000/api/user')
        .then((response) => {

            //set response user to state
            setUser(response.data.data);
        })

        await axios.get(urlClass)
        .then((response) => {
            SetClass(response.data.class);
        })
    }
    
    //hook useEffect
    useEffect(() => {

        //check token empty
        if(!token) {

            //redirect login page
            history.push('/login');
        }
        
        //call function "fetchData"
        fetchData();
    }, []);

    //function logout
    const logoutHandler = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            //remove token from localStorage
            localStorage.removeItem("token");

            //redirect halaman login
            history.push('/login');
    };

    let url='http://localhost:8000/api/classroom/'+code;

    let photo = user.profile_photo;

    const joinHandler = async (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: url
        });

        window.location.reload(false);
    }


    return (
        <div className="wrapper">
            <div>
             <nav className="nav fixed-top">
             <GoMortarBoard className='icon'/>
                <h2>Thearning</h2>
                <img src={photo} alt='img' className='prof'onClick={changeDisplay2}/>
                <div className={display}>
                <li className='display'><button className="btnOp" onClick={changeDisplay3}>Gabung Kelas</button></li>
                </div>
                <div className={profile}>
                <table>
                    <tbody>
                    <tr>
                        <td><img src={photo} alt='img'className='prof2'/></td>
                    </tr>
                    <tr>
                        <td className='name'>{user.fullname}</td>
                    </tr>
                    <tr>
                        <td className='email'>{user.status}</td>
                    </tr>
                    <tr>
                        <td>
                        <button onClick={logoutHandler} className="btn btn-md btn-danger">LOGOUT</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div className={display2}>
                    <form onSubmit={joinHandler}>
                    <input type='text' value={code} placeholder='Masukkan Code' className='form-control' onChange={e => setCode(e.target.value)}/>
                    <input type='submit' value='Submit' className='btn btn-primary'/>
                    </form>
                </div>
            </nav>
            </div>
            <div className="container3">   
                <center>
                    <div className="photoClass">
                        <img src={classRoom.class_image} alt='img'/>
                        <div className="about">
                            <h1>{classRoom.class_name}</h1>
                            <h3>{classRoom.section}</h3>
                        </div>
                            <h5 className="codeClass" onClick={() =>  navigator.clipboard.writeText(classRoom.class_id)}>
                                {classRoom.class_id}
                            </h5>
                    </div>
                </center>
                <div className="content">
                <div className="left-content">
                <h3>adadad</h3>
                </div>
                <div className="right-content">
                    <h3>fafbfdsdfsd</h3>
                </div>
                </div>
            </div>
        </div>
    );

}

export default Class;