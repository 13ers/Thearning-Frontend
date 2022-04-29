import { GoMortarBoard } from "react-icons/go";

import '../style/dashboard.css';

//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';

function Dashboard() {

    function changePage(){
        history.push('/CreateClass');
    }

    const [display, setDisplay] = useState("classOp");
  
    const changeDisplay = () => {
     if (display === "classOp")
     {
        setDisplay("classOp2");}
        else{
            setDisplay("classOp");}
    };

    const [profile, setProfile] = useState("profile");
  
    const changeDisplay2 = () => {
     if (profile === "profile")
     {
        setProfile("profile2");}
        else{
            setProfile("profile");}
    };

    //state user
    const [user, setUser] = useState({});

    

    //define history
    const history = useHistory();

    //token
    const token = localStorage.getItem("token");

    const [classList, setList] = useState([]);

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

        await axios.get('http://localhost:8000/api/classroom')
        .then((response) => {

            //set response user to state
      
            setList(response.data.class_ids);
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

    let photo = user.profile_photo;
    return (
        <div className="wrapper">
            <div>
             <nav className="nav fixed-top">
             <GoMortarBoard className='icon'/>
                <h2>Thearning</h2>
                <button className="btnClass" onClick={changeDisplay}></button>
                <img src={photo} alt='img' className='prof'onClick={changeDisplay2}/>
                <div className={display}>
                <li className='display'><button className="btnOp" onClick={changePage}>Buat Kelas</button></li>
                <li className='display'><button className="btnOp">Gabung Kelas</button></li>
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
                        <td className='email'>{user.email}</td>
                    </tr>
                    <tr>
                        <td>
                        <button onClick={logoutHandler} className="btn btn-md btn-danger">LOGOUT</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </nav>
            </div>
            <div className="container2">   
                        <h1 style={{marginBottom:'20px'}}>Kelas</h1>
                        <div className="grid-container">
                    {classList.map((student) => (   
                    <div class="card primary" style={{width:'18rem'}}>
                        <img src={student.class_image} alt='img'/>
                        <div class="card-body">
                            <h3 class="card-title">{student.class_name}</h3>
                            <h6 class="card-title">{student.section}</h6>
                            <p class="card-text">{student.class_description}</p>
                        </div>
                    </div>
                    ))}  
        </div>
        </div>
        </div>
    );

}

export default Dashboard;