import { useParams } from "react-router-dom";
import { HiOutlineUpload } from "react-icons/hi";
import { IoLink } from "react-icons/io5";
import fileImg from "../../img/file.png";
import { Link } from "react-router-dom";

import "../../style/style.css";

//import hook react
import React, { useState, useEffect } from "react";

//import hook useHitory from react router dom
import { useHistory } from "react-router";

//import axios
import axios from "axios";

function CreateAssignment() {
  const { id } = useParams();
  const { idAs } = useParams();
  const [attachment, setAttachment] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [time2, setTime2] = useState("");
  const [instruction, setIntruction] = useState("");
  const [mark, setMark] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setSelectedFileName] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [link, setLink] = useState("");
  const [linkTab, setLinkTab] = useState("link");
  const [fileTab, setFileTab] = useState("file");

  let FileName = fileName
    .substring(fileName.lastIndexOf("\\") + 1)
    .split(".")[0];

  //define history
  const history = useHistory();

  //token
  const token = localStorage.getItem("token");
  //hook useEffect
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios
      .get(
        "http://localhost:8000/api/classroom/" +
          id +
          "/assignments/teachers/" +
          idAs
      )
      .then((response) => {
        setAttachment(response.data.assignment_attachments);
      });
  };
  //hook useEffect
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      history.push("/login");
    }

    //call function "fetchData"
    fetchData();
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("name");
    if (data !== null) setName(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("date");
    if (data !== null) setDate(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("time");
    if (data !== null) setTime(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("time2");
    if (data !== null) setTime2(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("instruction");
    if (data !== null) setIntruction(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("mark");
    if (data !== null) setMark(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("name", JSON.stringify(name));
  }, [name]);

  useEffect(() => {
    window.localStorage.setItem("date", JSON.stringify(date));
  }, [date]);

  useEffect(() => {
    window.localStorage.setItem("time", JSON.stringify(time));
  }, [time]);

  useEffect(() => {
    window.localStorage.setItem("time2", JSON.stringify(time2));
  }, [time2]);

  useEffect(() => {
    window.localStorage.setItem("instruction", JSON.stringify(instruction));
  }, [instruction]);

  useEffect(() => {
    window.localStorage.setItem("mark", JSON.stringify(mark));
  }, [mark]);

  const back = async (e) => {
    e.preventDefault();

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios.delete(
      "http://localhost:8000/api/classroom/" + id + "/assignments/" + idAs
    );
    localStorage.removeItem("name");
    localStorage.removeItem("date");
    localStorage.removeItem("time");
    localStorage.removeItem("time2");
    localStorage.removeItem("instruction");
    localStorage.removeItem("mark");
    history.goBack();
  };

  let marks2 = "";

  if (mark === "0") {
    marks2 = null;
  } else {
    marks2 = parseInt(mark);
  }

  let times2 = "";
  let date2 = "";

  if (time === "no") {
    times2 = null;
    date2 = null;
  } else if (time === "yes") {
    times2 = time2 + ":00";
    date2 = date;
  }

  console.log(times2, date2);

  const addHandler = async (e) => {
    e.preventDefault();
    (async () => {
      await fetch(
        "http://localhost:8000/api/classroom/" + id + "/assignments/",
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            Origin: "https://127.0.0.1:5000",
          },

          body: JSON.stringify({
            id: idAs,
            assignment: {
              assignment_name: name,
              class_id: id,
              due_date: date2,
              due_time: times2,
              instructions: instruction,
              total_marks: marks2,
            },
          }),
        }
      );
      localStorage.removeItem("name");
      localStorage.removeItem("date");
      localStorage.removeItem("time");
      localStorage.removeItem("time2");
      localStorage.removeItem("instruction");
      localStorage.removeItem("mark");
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

    formData.append("file", selectedFile);
    formData.append("assignment_id", idAs);
    formData.append("filename", FileName);
    //send data to server
    await axios
      .post("http://localhost:8000/api/upload/", formData)
      .then((response) => {
        setFileTab("file");
        setLinkTab("link");
        setLink("");
        window.location.reload(false);
      })
      .catch((error) => {});
  };

  const linkHandler = async (e) => {
    e.preventDefault();
    (async () => {
      await fetch("http://localhost:8000/api/links/", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          Origin: "https://127.0.0.1:5000",
        },

        body: JSON.stringify({ url: link, assignment_id: idAs }),
      });
      setFileTab("file");
      setLinkTab("link");
      setSelectedFile();
      setIsFilePicked(false);
      setSelectedFileName("");
      window.location.reload(false);
    })();
  };

  const showFile = () => {
    if (fileTab === "file") {
      setFileTab("tabs");
      setLinkTab("link");
    }
  };

  const showLink = () => {
    if (linkTab === "link") {
      setFileTab("file");
      setLinkTab("tabs v2");
    }
  };

  const hide = () => {
    setFileTab("file");
    setLinkTab("link");
    setSelectedFile();
    setIsFilePicked(false);
    setSelectedFileName("");
    setLink("");
  };

  const dellFile = function (value) {
    return async function (e) {
      e.preventDefault();
      for (let i = 0; i < attachment.length; i++) {
        let data = attachment[i];
        if (data.link === null && data.file !== null) {
          if (data.file.file_id === value) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios
              .delete(
                "http://localhost:8000/api/attachments/" +
                  data.attachment.attachment_id
              )
              .then((response) => {
                window.location.reload(false);
              });
          }
        }
      }
    };
  };

  const dellLink = function (value) {
    return async function (e) {
      e.preventDefault();
      for (let i = 0; i < attachment.length; i++) {
        let data = attachment[i];
        if (data.file === null && data.link !== null) {
          if (data.link.id === value) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios
              .delete(
                "http://localhost:8000/api/attachments/" +
                  data.attachment.attachment_id
              )
              .then((response) => {
                window.location.reload(false);
              });
          }
        }
      }
    };
  };

  return (
    <div className="wrapper-all">
      <div className="wrapper2">
        <div>
          <h4 className="fw-bold">Tambah Kelas</h4>
          <form onSubmit={back}>
            <button type="submit" className="btns"></button>
          </form>
          <hr />
          <form onSubmit={addHandler}>
            <div className="left-add" style={{ width: "75%" }}>
              <div>
                <div>
                  <label className="form-label"> Nama Tugas</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan Nama Tugas"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className="form-label">Instruksi</label>
                  <input
                    type="text"
                    className="form-control"
                    value={instruction}
                    onChange={(e) => setIntruction(e.target.value)}
                    placeholder="Masukkan Instruksi"
                    style={{ height: "100px" }}
                  />
                </div>
              </div>
            </div>
            <div className="right-add" style={{ width: "23%" }}>
              <div>
                <div>
                  <label className="form-label">Tenggat</label>
                  <select
                    name="times"
                    className="form-select"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option value="">Pilih Opsi</option>
                    <option value="no">Tanpa Tenggat</option>
                    <option value="yes">Dengan Tenggat</option>
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <label className="form-label">Tenggat Waktu</label>
                  <input
                    type="text"
                    className="form-control"
                    value={time2}
                    onChange={(e) => setTime2(e.target.value)}
                    placeholder="Isi Jika Memakai Tenggat"
                    onFocus={(e) => (e.target.type = "time")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <label className="form-label">Tenggat Tanggal</label>
                    <input
                      type="text"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Isi Jika Memakai Tenggat"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <label className="form-label">Nilai</label>
                  <select
                    name="marks"
                    className="form-select"
                    value={mark}
                    onChange={(e) => setMark(e.target.value)}
                  >
                    <option value="">Pilih Opsi</option>
                    <option value="100">Dengan Nilai (100)</option>
                    <option value="0">Tanpa Nilai</option>
                  </select>
                </div>
              </div>
              <input type="submit" value="Buat" className="btn-create" />
            </div>
          </form>
          <HiOutlineUpload className="logo-As2" onClick={showFile} />
          <IoLink className="logo-As2" onClick={showLink} />
          <div className={fileTab}>
            <form onSubmit={fileHandler}>
              <input
                type="file"
                className="form-control"
                onChange={changeHandler}
                placeholder="Pilih File"
              />
              <button
                className="btn btn-outline-primary"
                style={{ marginRight: "5px" }}
                onClick={hide}
              >
                Batal
              </button>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className={linkTab}>
            <form onSubmit={linkHandler}>
              <input
                type="text"
                className="form-control"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Salin Link Disini"
              />
              <button
                className="btn btn-outline-primary"
                style={{ marginRight: "5px" }}
                onClick={hide}
              >
                Batal
              </button>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="upload-tab">
            {attachment.map((attachments) =>
              attachments.file === null ? (
                <div className="link-tab">
                  <div className="link-info">
                    <form onSubmit={dellLink(attachments.link.id)}>
                      <button type="submit" className="btns v3"></button>
                    </form>
                    <h6>
                      <img
                        src={attachments.link.thumbnail}
                        alt=""
                        style={{
                          width: "50px",
                          height: "auto",
                          marginRight: "10px",
                        }}
                      />
                    </h6>
                    <Link
                      to={{ pathname: attachments.link.url }}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <p className="link-title">{attachments.link.title}</p>
                    </Link>
                  </div>
                  <p
                    style={{
                      position: "absolute",
                      top: "30px",
                      left: "70px",
                      textOverflow: "ellipsis",
                      width: "100px",
                    }}
                  >
                    {attachments.link.url}
                  </p>
                </div>
              ) : (
                <div className="link-tab">
                  <div className="link-info">
                    <form onSubmit={dellFile(attachments.file.file_id)}>
                      <button type="submit" className="btns v3"></button>
                    </form>
                    <h6>
                      <img
                        src={fileImg}
                        alt=""
                        style={{
                          width: "40px",
                          height: "auto",
                          marginRight: "10px",
                        }}
                        className="file-img"
                      />
                    </h6>
                    <Link
                      to={{ pathname: attachments.file.file_url }}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <p>{attachments.file.filename}</p>
                    </Link>
                  </div>
                  <p
                    style={{
                      position: "absolute",
                      top: "30px",
                      left: "60px",
                      textOverflow: "ellipsis",
                      width: "100px",
                    }}
                  >
                    {attachments.file.filetype}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAssignment;
