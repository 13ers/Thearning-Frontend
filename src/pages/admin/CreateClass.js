import '../../style/index.css';
import { ImCross } from "react-icons/im";
//import hook react
import React, { useState } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

//import axios
import axios from 'axios';

function CreateClass() {

    //define state
    const [class_name, setClass] = useState("");
    const [section, setSection] = useState("");
    const [class_description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = React.useState(null);

    //define state validation
    const [validation, setValidation] = useState([]);

    //define history
    const history = useHistory();

    //function "registerHanlder"
    const registerHandler = async (e) => {
        e.preventDefault();
        
        //initialize formData
        const formData = new FormData();

        //append data to formData
        formData.append('class_name', class_name);
        formData.append('section', section);
        formData.append('class_description', class_description);
        formData.append('image', selectedFile);
        //send data to server
        await axios.post('http://localhost:8000/api/classroom', formData)
        .then(() => {

            //redirect to logi page
            history.push('/');
        })
        .catch((error) => {

            //assign error to state "validation"
            setValidation(error.response.data.data);
        })
    };

    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0])
      }

      function back(){
        history.push('/');
    }
    

    return (
        <div className="wrapper v2">
            <div>
                <div>
                    <div>
                        <div>
                            <h4 className="fw-bold">Tambah Kelas</h4>
                            <ImCross className="exit" onClick={back}/>
                            <hr/>
                            <form onSubmit={registerHandler}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label"> Nama Kelas</label>
                                            <input type="text" className="form-control" value={class_name} onChange={(e) => setClass(e.target.value)} placeholder="Masukkan Nama Kelas"/>
                                        </div>
                                        {
                                        validation.class_name && (
                                            <div className="alert alert-danger">
                                                {validation.class_name[0]}
                                            </div>
                                        )
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Subjek</label>
                                            <input type="text" className="form-control" value={section} onChange={(e) => setSection(e.target.value)} placeholder="Masukkan Subjek"/>
                                        </div>
                                        {
                                        validation.section && (
                                            <div className="alert alert-danger">
                                                {validation.section[0]}
                                            </div>
                                        )
                                        }
                                    </div>
                                    
                                </div>
                                <div className="row">
                                <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Deskripsi</label>
                                            <input type="text" className="form-control" value={class_description} onChange={(e) => setDescription(e.target.value)} placeholder="Masukkan Deskripsi(Optional)"/>
                                        </div>
                                        {
                                            validation.class_description && (
                                                <div className="alert alert-danger">
                                                    {validation.class_description[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-6">
                                    <div className="mb-3">
                                            <label className="form-label">Foto Profil</label>
                                            <input type="file" className="form-control"onChange={handleFileSelect} placeholder="Masukkan Foto" accept="image/*"/>
                                        </div>
                                        {
                                        validation.image && (
                                            <div className="alert alert-danger">
                                                {validation.image[0]}
                                            </div>
                                        )
                                        }
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Buat</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CreateClass;