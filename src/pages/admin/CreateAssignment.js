import { useParams } from "react-router-dom";
import { HiOutlineUpload } from "react-icons/hi";
import { IoLink } from "react-icons/io5";
import linkImg from '../../img/link.png';
import fileImg from '../../img/file.png';

import '../../style/style.css';

//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';

function CreateAssignment() {


    const { id } = useParams();
    const {idAs} = useParams();
    const [main, setMain] = useState("wrapper");
    const [add, setAdd] = useState("wrappers2");
    const [name, setName] = useState("");
    const [date,setDate] = useState("");
    const [time, setTime] = useState("");
    const [instruction, setIntruction] = useState("");
    const [mark, setMark] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [fileName, setSelectedFileName] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [linkUp,setLinkUp] = useState([]);
    const [fileUp, setFileUp] = useState([]);
    const [link, setLink] = useState("");
    const [linkTab, setLinkTab] = useState('link');
    const [fileTab, setFileTab] = useState('file');

    let FileName = fileName.substring(fileName.lastIndexOf("\\") + 1).split(".")[0];
    
    //define history
    const history = useHistory();

    //token
    const token = localStorage.getItem("token");

    //hook useEffect
    useEffect(() => {

        //check token empty
        if(!token) {

            //redirect login page
            history.push('/login');
        };
    }, []);

        const back = async (e) => {
            e.preventDefault();
    
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
            axios.delete('http://localhost:8000/api/classroom/'+id+'/assignments/'+idAs,{
                "headers": {
                "content-type": "application/json",
                },
                })
                history.goBack();
        }

    const addHandler = async (e) => {
        e.preventDefault();
        (async () => {
        await fetch("http://localhost:8000/api/classroom/"+id+"/assignments/", {
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
        history.goBack();
        })();
    };

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        setSelectedFileName(event.target.files[0].name);
        };
        
        const fileHandler = async (e) => {
            e.preventDefault();
            const formData = new FormData();

            formData.append('file', selectedFile);
            formData.append('assignment_id', idAs);
            formData.append('filename', FileName);
            //send data to server
            await axios.post('http://localhost:8000/api/upload/', formData)
            .then((response) => {
                const fileData = response.data.file;
                setFileUp(fileUp => fileUp.concat(fileData));
            setFileTab('file');
            setLinkTab('link');
            })
            .catch((error) => {
            })
            };
    
        const linkHandler = async (e) => {
            e.preventDefault();
            (async () => {
            const res = await fetch("http://localhost:8000/api/links/", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json",
                Origin: "https://127.0.0.1:5000",
                },
    
                body: JSON.stringify({ url: link, assignment_id: idAs}),
            });
            const content = await res.json();
            const links = content.link;
            setLinkUp(linkUp => linkUp.concat(links));
            setFileTab('file');
            setLinkTab('link');
            })();
            };

        const showFile = () => {
            if(fileTab === 'file'){
                setFileTab('tabs');
                setLinkTab('link');
            }
        }

        const showLink = () => {
            if(linkTab === 'link'){
                setFileTab('file');
                setLinkTab('tabs v2');
            }
        }

        const hide = () => {
            setFileTab('file');
            setLinkTab('link');
        }

        function defSrc(ev){
            ev.target.src = linkImg;
        }

    return (
        <div className="wrapper-all">
        <div className="wrapper2">
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
                            <HiOutlineUpload className="logo-As2" onClick={showFile}/>
                            <IoLink className="logo-As2" onClick={showLink}/>
                            <div className={fileTab}>
                                <form onSubmit={fileHandler}>
                                <input type="file" className="form-control" onChange={changeHandler} placeholder="Pilih File"/>
                                <button className="btn btn-outline-primary" style={{marginRight:'5px'}} onClick={hide}>Batal</button>
                                <button className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                            <div className={linkTab}>
                                <form onSubmit={linkHandler}>
                                <input type="text" className="form-control" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Salin Link Disini"/>
                                <button className="btn btn-outline-primary" style={{marginRight:'5px'}} onClick={hide}>Batal</button>
                                <button className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                            <div className="upload-tab">
                            {linkUp.map((link) => (   
                        <div className="link-tab">
                            <div className="link-info">
                            <h6><img src={link.thumbnail} alt={defSrc} style={{width:"50px",height:"auto",marginRight:"10px"}} /></h6>
                            <p>{link.title}</p>
                            </div>
                            <p style={{position: "absolute",top: "30px",left: "70px",textOverflow: "ellipsis",width: "100px"}}>{link.url}</p>
                        </div>
                        ))}
                    {fileUp.map((file) => (   
                        <div className="link-tab">
                            <div className="link-info">
                            <h6><img src={fileImg} alt={defSrc} style={{width:"40px",height:"auto",marginRight:"10px"}} className="file-img" /></h6>
                            <p>{file.filename}</p>
                            </div>
                            <p style={{position: "absolute",top: "30px",left: "60px",textOverflow: "ellipsis",width: "100px"}}>{file.filetype}</p>
                        </div>
                    ))}
                            </div>
                        </div>
                </div>
        </div>
    );

}

export default CreateAssignment;