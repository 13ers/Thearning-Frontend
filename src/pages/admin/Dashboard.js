import { GoMortarBoard } from "react-icons/go";
import { ImInfo } from "react-icons/im";
import { Link } from "react-router-dom";

import '../../style/dashboard.css';

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

    let url='http://localhost:8000/api/classroom/'+code;

    let photo = user.profile_photo;

    let stats = user.status;

    if(stats==='student'){
        history.push('/User')
    }

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
                <button className="btnClass" onClick={changeDisplay}></button>
                <img src={photo} alt='img' className='prof'onClick={changeDisplay2}/>
                <div className={display}>
                <li className='display'><button className="btnOp" onClick={changePage}>Buat Kelas</button></li>
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
                <div className={display2}>
                    <form onSubmit={joinHandler}>
                    <input type='text' value={code} placeholder='Masukkan Code' className='form-control' onChange={e => setCode(e.target.value)}/>
                    <input type='submit' value='Submit' className='btn btn-primary'/>
                    </form>
                </div>
            </nav>
            </div>
            <div className="container2">   
                        <h1 style={{marginBottom:'20px'}}>Kelas</h1>
                        <div className="grid-container">
                    {classList.map((room) => (   
                    <article key={room.class_id}>
                    <div className="card primary" style={{width:'18rem'}}>
                        <img src={room.class_image} alt='img'/>
                        <div className="card-body list">
                            <Link to={`/Class/${room.class_id}`} style={{color:'white',textDecoration:'none'}}>
                            <h3 className="card-title">{room.class_name}</h3>
                            </Link>
                            <h6 className="card-title">{room.section}</h6>
                            <p className="card-text">{room.class_description}</p>
                            <ImInfo  onClick={() =>  navigator.clipboard.writeText(room.class_id)} className="info"/>
                        </div>
                    </div>
                    </article>
                    ))}  
        </div>
        </div>
        </div>
    );

}

export default Dashboard;