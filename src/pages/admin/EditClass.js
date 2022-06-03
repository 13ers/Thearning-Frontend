import "../../style/index.css";
import { ImCross } from "react-icons/im";
//import hook react
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//import hook useHitory from react router dom
import { useHistory } from "react-router";

//import axios
import axios from "axios";

function EditClass() {
  //define state
  const { ClassId } = useParams();
  const [class_name, setClass] = useState("");
  const [section, setSection] = useState("");
  const [class_description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);

  useEffect(() => {
    const data = window.localStorage.getItem("class_name");
    if (data !== null) setClass(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("section");
    if (data !== null) setSection(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("class_description");
    if (data !== null) setDescription(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("class_image");
    if (data !== null) setSelectedFile(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("class_name", JSON.stringify(class_name));
  }, [class_name]);

  useEffect(() => {
    window.localStorage.setItem("section", JSON.stringify(section));
  }, [section]);

  useEffect(() => {
    window.localStorage.setItem(
      "class_description",
      JSON.stringify(class_description)
    );
  }, [class_description]);

  useEffect(() => {
    window.localStorage.setItem("class_image", JSON.stringify(selectedFile));
  }, [selectedFile]);
  //define state validation
  const [validation, setValidation] = useState([]);

  //define history
  const history = useHistory();
  const token = localStorage.getItem("token");

  //function "registerHanlder"
  const registerHandler = async (e) => {
    e.preventDefault();

    //initialize formData
    const formData = new FormData();

    //append data to formData
    formData.append("class_name", class_name);
    formData.append("section", section);
    formData.append("class_description", class_description);
    formData.append("image", selectedFile);
    //send data to server
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .patch("http://localhost:8000/api/classroom/" + ClassId, formData)
      .then(() => {
        localStorage.removeItem("class_name");
        localStorage.removeItem("section");
        localStorage.removeItem("class_description");
        localStorage.removeItem("class_image");
        history.goBack();
      })
      .catch((error) => {
        //assign error to state "validation"
        setValidation(error.response.data.data);
      });
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  function back() {
    localStorage.removeItem("class_name");
    localStorage.removeItem("section");
    localStorage.removeItem("class_description");
    localStorage.removeItem("class_image");
    history.goBack();
  }

  return (
    <div className="wrapper v2">
      <div>
        <div>
          <div>
            <div>
              <h4 className="fw-bold">Edit Kelas</h4>
              <ImCross className="exit" onClick={back} />
              <hr />
              <form onSubmit={registerHandler}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label"> Nama Kelas</label>
                      <input
                        type="text"
                        className="form-control"
                        value={class_name}
                        onChange={(e) => setClass(e.target.value)}
                        placeholder="Masukkan Nama Kelas"
                      />
                    </div>
                    {validation.class_name && (
                      <div className="alert alert-danger">
                        {validation.class_name[0]}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Subjek</label>
                      <input
                        type="text"
                        className="form-control"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        placeholder="Masukkan Subjek"
                      />
                    </div>
                    {validation.section && (
                      <div className="alert alert-danger">
                        {validation.section[0]}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Deskripsi</label>
                      <input
                        type="text"
                        className="form-control"
                        value={class_description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Masukkan Deskripsi(Optional)"
                      />
                    </div>
                    {validation.class_description && (
                      <div className="alert alert-danger">
                        {validation.class_description[0]}
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
                  Buat
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditClass;
