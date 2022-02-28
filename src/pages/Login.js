import React, { useState} from 'react';
import { useHistory } from 'react-router';
function Login() {

    const [validation, setValidation] = useState([]);
    const history = useHistory();
    const [key, setKey] = useState("");
    const [password, setPassword] = useState("");
    
     const loginHandler = async (e) => {
         const response =  await fetch('http://thearning.resultoption.tech/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"key": "111", "password": "Student"})
            .then((response) => {

                localStorage.setItem('token', response.data.token);

                history.push('/register');
            })
            .catch((error) => {
    
                setValidation(error.response.data);
            })
          });
          return response.json();

          
      };

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold">HALAMAN LOGIN</h4>
                            <hr/>
                            {
                                validation.message && (
                                    <div className="alert alert-danger">
                                        {validation.message}
                                    </div>
                                )
                            }
                            <form onSubmit={loginHandler}>
                                <div className="mb-3">
                                    <label className="form-label">Kode</label>
                                    <input type="text" className="form-control" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Masukkan Kode"/>
                                </div>
                                {
                                    validation.key && (
                                        <div className="alert alert-danger">
                                            {validation.key[0]}
                                        </div>
                                    )
                                }
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
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">LOGIN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;