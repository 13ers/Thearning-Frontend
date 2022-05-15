import "../style/index.css";
import "../style/style.css";
import { ImCross } from "react-icons/im";

//import hook react
import React, { useState } from "react";

//import hook useHitory from react router dom
import { useHistory } from "react-router";

//import axios
import axios from "axios";

function Register() {
  //define state
  const [user_id, setUser] = useState("");
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birth_place, setBirth_place] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");
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
    formData.append("user_id", user_id);
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("birth_place", birth_place);
    formData.append("birth_date", birth_date);
    formData.append("bio", bio);
    formData.append("status", status);
    formData.append("image", selectedFile);
    //send data to server
    await axios
      .post("http://thearning.resultoption.tech/api/user", formData)
      .then(() => {
        //redirect to logi page
        history.push("/login");
      })
      .catch((error) => {
        //assign error to state "validation"
        setValidation(error.response.data);
      });
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  function back() {
    history.push("/login");
  }

  return (
    <div className="container" style={{ marginTop: "2px" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body" style={{ backgroundColor: "white" }}>
              <h4 className="fw-bold">HALAMAN REGISTER</h4>
              <ImCross className="back" onClick={back} />
              <hr />
              <form onSubmit={registerHandler}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        value={user_id}
                        onChange={(e) => setUser(e.target.value)}
                        placeholder="Masukkan Username"
                      />
                    </div>
                    {validation.user_id && (
                      <div className="alert alert-danger">
                        {validation.user_id[0]}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">NAMA LENGKAP</label>
                      <input
                        type="text"
                        className="form-control"
                        value={fullname}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan Nama Lengkap"
                      />
                    </div>
                    {validation.fullname && (
                      <div className="alert alert-danger">
                        {validation.fullname[0]}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">ALAMAT EMAIL</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan Alamat Email"
                      />
                    </div>
                    {validation.email && (
                      <div className="alert alert-danger">
                        {validation.email[0]}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">PASSWORD</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan Password"
                      />
                    </div>
                    {validation.password && (
                      <div className="alert alert-danger">
                        {validation.password[0]}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Tempat Lahir</label>
                      <input
                        type="text"
                        className="form-control"
                        value={birth_place}
                        onChange={(e) => setBirth_place(e.target.value)}
                        placeholder="Masukkan Tempat"
                      />
                    </div>
                    {validation.password && (
                      <div className="alert alert-danger">
                        {validation.birth_place[0]}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Tanggal Lahir</label>
                      <input
                        type="date"
                        className="form-control"
                        value={birth_date}
                        onChange={(e) => setBirth_date(e.target.value)}
                        placeholder="thn-bln-tgl"
                      />
                    </div>
                    {validation.password && (
                      <div className="alert alert-danger">
                        {validation.birth_date[0]}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Bio</label>
                      <input
                        type="text"
                        className="form-control"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Masukkan Bio"
                      />
                    </div>
                    {validation.bio && (
                      <div className="alert alert-danger">
                        {validation.bio[0]}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option selected>Pilih Status</option>
                        <option value="admin">Admin</option>
                        <option value="teacher">Guru</option>
                        <option value="student">Siswa</option>
                      </select>
                    </div>
                    {validation.status && (
                      <div className="alert alert-danger">
                        {validation.status[0]}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Foto Profil</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleFileSelect}
                        placeholder="Masukkan Foto"
                        accept="image/*"
                      />
                    </div>
                    {validation.image && (
                      <div className="alert alert-danger">
                        {validation.image[0]}
                      </div>
                    )}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  REGISTER
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
