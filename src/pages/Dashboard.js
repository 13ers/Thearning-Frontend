import { GoMortarBoard } from "react-icons/go";

import '../style/dashboard.css';
import '../style/index.css';

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
             <nav className="nav">
             <GoMortarBoard className='icon'/>
                <h2>Thearning</h2>
                <button className="btnClass" onClick={changeDisplay}></button>
                <img src={photo} alt='img' className='prof'onClick={changeDisplay2}/>
            </nav>
            <div className={display}>
                <li><button className="btnOp" onClick={changePage}>Buat Kelas</button></li>
                <li><button className="btnOp">Gabung Kelas</button></li>
            </div>
            <div className={profile}>
                <table>
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
                </table>
            </div>
        </div>
    )

}

export default Dashboard;