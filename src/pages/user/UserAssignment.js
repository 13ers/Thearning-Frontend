import { GoMortarBoard } from "react-icons/go";
import { useParams } from "react-router-dom";
import { HiClipboardList } from "react-icons/hi";
import fileImg from '../../img/file.png';
import linkImg from '../../img/link.png';
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { IoSend} from "react-icons/io5";
import '../../style/style.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

function UserAssignment() {


    const { id } = useParams();
    const [user, setUser] = useState({});
    const [assignment, setAssignment] = useState({});
    const [attachments, setAttachment] = useState([]);
    const [time ,setTime]= useState("");
    const [date ,setDate]= useState("");
    const [privateInput,setPrivIn]= useState("com-input");
    const [privateCom,setPrivCom]= useState("private-coms");
    const [publicInput,setPubIn]= useState("com-input");
    const [publicCom,setPubCom]= useState("public-coms");
    
    //define history
    const history = useHistory();

    //token
    const token = localStorage.getItem("token");

    let urlAs = 'http://localhost:8000/api/assignments/'+id;
    //function "fetchData"
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('http://localhost:8000/api/user/')
        .then((response) => {
            setUser(response.data.data);
        })

        await axios.get(urlAs)
        .then((response) => {
            setAssignment(response.data.assignment);
            setAttachment(response.data.attachments);
            setTime(response.data.assignment.due_time);
            setDate(response.data.assignment.due_date)
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

    const [profile, setProfile] = useState("profile");
  
    const changeDisplay2 = () => {
     if (profile === "profile")
     {
        setProfile("profile2");}
        else{
            setProfile("profile");  
}
    };

    const changeDisplay3 = () => {
        if (privateCom === "private-coms")
        {
            setPrivCom("com-input");
            setPrivIn("private-input")}
           else{
            setPrivCom("private-coms");
            setPrivIn("com-input");  
   }
       };

       const changeDisplay4 = () => {
        if (publicCom === "public-coms")
        {
            setPubCom("com-input");
            setPubIn("public-input")}
           else{
            setPubCom("public-coms");
            setPubIn("com-input");  
   }
       };

    function changePage(){
history.push('/');
window.location.reload(false);
    }

    let total = assignment.total_marks;
    let totalMark ="";

    if(total === 100){
        totalMark = "0/100";
    }
    let times = time.split(':');
    let hour = times[0];
    let min = times[1];
    let arr = date.split('-');
    let year = arr[0];
    let month = arr[1];
    let day = arr[2];
    let  months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"];
    let monthName=months[parseInt(month)-1];
    let deadline ="Tenggat : "+day+" "+monthName+" "+year+" "+hour+"."+min;

    return (
        <div className="wrapper-all">
        <div className="wrapper">
            <div>
             <nav className="nav fixed-top">
             <GoMortarBoard className='icon'/>
                <h2 onClick={changePage} className="title">Thearning</h2>
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
            <div className="container3 v2"> 
            <div className="left-As">
                <HiClipboardList className="logo-As"/>
        <h1>{assignment.assignment_name}</h1>
        <div className="detail-As">
        <p>{totalMark}</p>
        <p>{deadline}</p>
        </div>
        <hr></hr>
        <p>{assignment.instructions}</p>
        <div className="upload-tab v2">
        {attachments.map((attachments) => ( attachments.file === null ? (
            <div className="link-tab">
            <div className="link-info">
            <h6><img src={attachments.link.thumbnail} alt="" style={{width:"50px",height:"auto",marginRight:"10px"}} /></h6>
            <p>{attachments.link.title}</p>
            </div>
            <p style={{position: "absolute",top: "30px",left: "70px",textOverflow: "ellipsis",width: "100px"}}>{attachments.link.url}</p>
        </div>
          ) : (
            <div className="link-tab">
                <div className="link-info">
                <h6><img src={fileImg} alt="" style={{width:"40px",height:"auto",marginRight:"10px"}} className="file-img" /></h6>
                <p>{attachments.file.filename}</p>
                </div>
                <p style={{position: "absolute",top: "30px",left: "60px",textOverflow: "ellipsis",width: "100px"}}>{attachments.file.filetype}</p>
            </div>
        )))}
            </div>
            <div className="footer">
            <hr></hr>
            <div className="public-com">
            <AiOutlineComment className="public-icon"/>
            <h6>Komentar kelas</h6>
            <div className={publicCom} >
            <p onClick={changeDisplay4}>Tambahkan Komentar Kelas</p>
            </div>
            </div>
            <div className={publicInput}>
            <img src={photo} alt='img'className='prof4'/>
            <textarea className="form-control" placeholder="Masukkan Komentar"></textarea>
            <IoSend className="public-send"/>
            </div>
            </div>
            </div>
            <div className="right-As">
            <div className="submission">
            <h5>Tugas Anda</h5>
            <center>
            <button className="btn btn-outline-primary">Tambah Data</button><br></br>
            <button className="btn btn-primary">Submit</button>
            </center>
            </div>
            <div className="private-com">
            <FaRegCommentDots className="private-icon"/>
            <h6>Komentar Pribadi</h6>
            <div className={privateCom}>
            <center >
                <p onClick={changeDisplay3}>Tambahkan Komentar Pribadi</p>
            </center>
            </div>
            <div className={privateInput}>
            <img src={photo} alt='img'className='prof3'/>
            <textarea className="form-control" placeholder="Masukkan Komentar"></textarea>
            <IoSend className="private-send"/>
            </div>
            </div>
            </div>
            </div>
        </div>
        </div>
    );
}
export default UserAssignment;