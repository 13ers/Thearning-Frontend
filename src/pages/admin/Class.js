import { GoMortarBoard } from "react-icons/go";
import { useParams } from "react-router-dom";
import { HiClipboardList } from "react-icons/hi";
import { ImCross } from "react-icons/im";

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
    const [user, setUser] = useState({});
    const [assignment, setAssignment] = useState([]);
    const [idAs, setId] = useState("");
    const [main, setMain] = useState("wrapper");
    const [add, setAdd] = useState("wrappers2");
    const [name, setName] = useState("");
    const [date,setDate] = useState("");
    const [time, setTime] = useState("");
    const [instruction, setIntruction] = useState("");
    const [mark, setMark] = useState("");
    
    
    
    //define history
    const history = useHistory();

    //token
    const token = localStorage.getItem("token");

    let urlClass = 'http://localhost:8000/api/classroom/'+id;
    //function "fetchData"
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('http://localhost:8000/api/user/')
        .then((response) => {

            //set response user to state
            setUser(response.data.data);
        })

        await axios.get(urlClass)
        .then((response) => {
            SetClass(response.data.class);
            setAssignment(response.data.assignments);
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

    
    const [tab1, setTab1] = useState('tab1');
    const [tab2, setTab2] = useState('tabs2');
    const [tab3, setTab3] = useState('tabs3');
    const [tab4, setTab4] = useState('tabs4');

    const changeTab1 = () => {
        if(tab1 === 'tabs1'){
            setTab1('tab1');
            setTab2('tabs2');
            setTab3('tabs3');
            setTab4('tabs4');
        }
    }

    const changeTab2 = () => {
        if(tab2 === 'tabs2'){
            setTab1('tabs1');
            setTab2('tab2');
            setTab3('tabs3');
            setTab4('tabs4');
        }
    }

    const changeTab3 = () => {
        if(tab3 === 'tabs3'){
            setTab3('tab3');
            setTab1('tabs1');
            setTab2('tabs2');
            setTab4('tabs4');
        }
    }

    const changeTab4 = () => {
        if(tab4 === 'tabs4'){
            setTab4('tab4');
            setTab1('tabs1');
            setTab2('tabs2');
            setTab3('tabs3');
        }
    }


    const [profile, setProfile] = useState("profile");
  
    const changeDisplay2 = () => {
     if (profile === "profile")
     {
        setProfile("profile2");}
        else{
            setProfile("profile");  
}
    };

    const getId = async (e) => {
        e.preventDefault();

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        axios.post('http://localhost:8000/api/assignments/',{
            "headers": {
            "content-type": "application/json",
            },
            })
            .then(function(response) {
            setId(response.data.assignment_id);
            if (main === "wrapper")
        {
        setMain("wrappers");
        setAdd("wrapper2");
        }else{
            setMain("wrapper");
            setAdd("wrappers2");
        };
            })
            .catch(function(error) {
            console.log(error);
            });
            };

            console.log(idAs);
            console.log(id);

        const back = async (e) => {
            e.preventDefault();
    
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
            axios.delete('http://localhost:8000/api/assignments/'+idAs,{
                "headers": {
                "content-type": "application/json",
                },
                })
                setId("");
                if (main === "wrapper")
            {
            setMain("wrappers");
            setAdd("wrapper2");
            }else{
                setMain("wrapper");
                setAdd("wrappers2");
            };
        }

    const addHandler = async (e) => {
        e.preventDefault();
        (async () => {
          await fetch("http://localhost:8000/api/assignments/", {
            method: "PATCH",
            headers: {
                'Authorization': 'Bearer ' + token,
              "Content-Type": "application/json",
              Origin: "https://127.0.0.1:5000",
            },

            body: JSON.stringify({ id: idAs, assignment: {
                assignment_name: name,
                class_id : id,
                due_date : date,
                due_time : time+":00",
                instructions : instruction,
                total_marks : parseInt(mark)
            }}),
        });
        })();
    };

    function changePage(){
history.push('/');
    }
    return (
        <div className="wrapper-all">
        <div className={main}>
            <div>
             <nav className="nav fixed-top">
             <GoMortarBoard className='icon'/>
                <h2 onClick={changePage} className="title">Thearning</h2>
                <center>
                <div className="btn-nav">
                    <button className="tab" onClick={changeTab1}>Forum</button>
                    <button className="tab" onClick={changeTab2}>Tugas Kelas</button>
                    <button className="tab" onClick={changeTab3}>Anggota</button>
                    <button className="tab" onClick={changeTab4}>Nilai</button>
                </div>
                </center>
                <img src={photo} alt='img' className='prof'onClick={changeDisplay2}/>
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
            </nav>
            </div>
            <div className="container3"> 
            <div className={tab1}>
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
                    <div className="left-content" >
                    <h6 style={{textAlign: 'left',marginBottom:'20px'}}>Mendatang</h6>
                    <p style={{textAlign: 'left', fontSize:'0.75em'}}>Tidak ada tugas yang perlu segera diselesaikan</p>
                </div>
                {assignment.map((assignment) => (   
                    <article key={assignment.assignment_id}>
                        <div className="right-content">
                            <HiClipboardList className="icons"/>
                            <div className="infoAssignment">
                            <h6>{assignment.assignment_name}</h6>
                            <p>Tenggat : {assignment.due_date}</p>
                            </div>
                        </div>
                    </article>
                    ))}
                    </div>
                </div>  
                <div className={tab2}>
                    <h3 style={{marginBottom:'30px',marginTop:'20px'}}>Tugas Kelas</h3>
                    <hr></hr>
                    <form onSubmit={getId}>
                    <button type="submit" className="btn-add"></button>
                    </form>
                <div className="listAs">
                {assignment.map((assignment) => (   
                    <article key={assignment.assignment_id}>
                        <div className="listItem">
                            <HiClipboardList className="icons"/>
                            <div className="infoAssignment">
                            <h6>{assignment.assignment_name}</h6>
                            <p>Tenggat : {assignment.due_date}</p>
                            </div>
                        </div>
                    </article>
                    ))}
                </div>
                </div>
                <div className={tab3}>
                    <h1>Anggota</h1>
                </div>
                <div className={tab4}>
                    <h1>Nilai</h1>
                </div>
            </div>
        </div>
        <div className={add}>
                        <div>
                            <h4 className="fw-bold">Tambah Kelas</h4>
                            <form onSubmit={back}>
                                <button type="submit" className="btns"></button>
                            </form>
                            <hr/>
                            <form onSubmit={addHandler}>
                                <div className="left-add" style={{width:'75%'}}>
                                    <div>
                                        <div>
                                            <label className="form-label"> Nama Tugas</label>
                                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan Nama Tugas"/>
                                        </div>
                                    </div>
                                    <div >
                                        <div>
                                            <label className="form-label">Instruksi</label>
                                            <input type="text" className="form-control" value={instruction} onChange={(e) => setIntruction(e.target.value)} placeholder="Masukkan Instruksi" style={{height:'100px'}}/>
                                        </div>
                                        </div>
                                </div>
                                <div className="right-add" style={{width:'23%'}}>
                                <div >
                                    <div>
                                    <label className="form-label">Tenggat Waktu</label>
                                            <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} placeholder=""/>
                                        </div>
                                    </div>
                                    <div >
                                    <div>
                                    <label className="form-label">Tenggat Tanggal</label>
                                            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} placeholder=""/>
                                        </div>
                                    </div>
                                    <div >
                                    <div>
                                    <label className="form-label">Nilai</label>
                                    <select name="marks" className="form-select"value={mark} onChange={(e) => setMark(e.target.value)}>
                                        <option value="">Pilih Opsi</option>
                                        <option value="100">Dengan Nilai (100)</option>
                                        <option value="0">Tanpa Nilai</option>
                                    </select>
                                        </div>
                                    </div>
                                    <input type="submit" value="Buat" className="btn-create"/>
                                </div>
                            </form>
                        </div>
        </div>
        </div>
    );

}

export default Class;