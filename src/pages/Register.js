import React, { useState} from 'react';
import { useHistory } from 'react-router';
function Register() {

    const [validation, setValidation] = useState([]);
    const history = useHistory();
    const [name, setName] = useState("");
    const [key, setKey] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    
     const registerHandler = async (e) => {
        const user = { name, key, password, passwordConfirmation };
         const response =  await fetch('http://thearning.resultoption.tech/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
        
            body: JSON.stringify(user)
            .then((response) => {

                //set token on localStorage
                localStorage.setItem('token', response.data.token);
                console.log('Data Berhasil Dimasukkan');
                //redirect to dashboard
                history.push('/');
            })
            .catch((error) => {
    
                //assign error to state "validation"
                setValidation(error.response.data);
            })
          });
          const content = response.json();

          
      };


    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold">HALAMAN REGISTER</h4>
                            <hr/>
                            <form onSubmit={registerHandler}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">NAMA LENGKAP</label>
                                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan Nama Lengkap"/>
                                        </div>
                                        {
                                        validation.name && (
                                            <div className="alert alert-danger">
                                                {validation.name[0]}
                                            </div>
                                        )
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">ALAMAT EMAIL</label>
                                            <input type="text" className="form-control" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Masukkan Alamat Email"/>
                                        </div>
                                        {
                                            validation.key && (
                                                <div className="alert alert-danger">
                                                    {validation.key[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">PASSWORD</label>
                                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password"/>
                                        </div>
                                        {
                                            validation.password && (
                                                <div className="alert alert-danger">
                                                    {validation.password[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">KONFIRMASI PASSWORD</label>
                                            <input type="password" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Masukkan Konfirmasi Password"/>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">REGISTER</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;