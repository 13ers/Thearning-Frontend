import { GoMortarBoard } from "react-icons/go";
import { useParams } from "react-router-dom";
import { HiClipboardList } from "react-icons/hi";
import { Link } from "react-router-dom";
import IconAn from "../../img/add2.png";
import { HiOutlineUpload } from "react-icons/hi";
import { IoLink } from "react-icons/io5";

import "../../style/style.css";

//import hook react
import React, { useState, useEffect } from "react";

//import hook useHitory from react router dom
import { useHistory } from "react-router";

//import axios
import axios from "axios";

function Class() {
  const { id } = useParams();
  const [classRoom, SetClass] = useState({});
  const [user, setUser] = useState({});
  let [assignment, setAssignment] = useState([]);
  const [student, setStudent] = useState([]);
  const [teacher, setTeacher] = useState([]);
  let [announcement, setAnnouncement] = useState([]);
  const [tab1, setTab1] = useState("tab1");
  const [tab2, setTab2] = useState("tabs2");
  const [tab3, setTab3] = useState("tabs3");
  const [tab4, setTab4] = useState("tabs4");
  const [tabAn, setTabAn] = useState("hide");
  const [buttonAn, setButtonAn] = useState("right-content v2");
  const [idAn, setIdAn] = useState("");
  const [link, setLink] = useState("hide");
  const [file, setFile] = useState("hide");
  const [bodyAn, setBody] = useState("");

  //define history
  const history = useHistory();

  //token
  const token = localStorage.getItem("token");

  let urlClass = "http://localhost:8000/api/classroom/" + id;
  let urlAn = "http://localhost:8000/api/classroom/" + id + "/announcements";
  //function "fetchData"
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://localhost:8000/api/user/").then((response) => {
      //set response user to state
      setUser(response.data.data);
    });

    await axios.get(urlClass).then((response) => {
      SetClass(response.data.class);
      setAssignment(response.data.assignments.reverse());
      setStudent(response.data.students);
      setTeacher(response.data.teachers);
      console.log(response.data);
    });
    await axios.get(urlAn).then((response) => {
      setAnnouncement(response.data.reverse());
    });
  };

  const arr3 = [...announcement, ...assignment];

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
    window.localStorage.setItem(
      "class_name",
      JSON.stringify(classRoom.class_name)
    );
  }, [classRoom.class_name]);

  useEffect(() => {
    window.localStorage.setItem("section", JSON.stringify(classRoom.section));
  }, [classRoom.section]);

  useEffect(() => {
    window.localStorage.setItem(
      "class_description",
      JSON.stringify(classRoom.class_description)
    );
  }, [classRoom.class_description]);

  useEffect(() => {
    window.localStorage.setItem(
      "class_image",
      JSON.stringify(classRoom.class_image)
    );
  }, [classRoom.class_image]);

  useEffect(() => {
    const data = window.localStorage.getItem("stats2");
    if (data !== null) setButtonAn(JSON.parse(data));
  }, []);

  function changePage2() {
    history.push(`/EditClass/${id}`);
  }
  //function logout
  const logoutHandler = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //remove token from localStorage
    localStorage.removeItem("token");

    //redirect halaman login
    history.push("/login");
  };

  let photo = user.profile_photo;

  const changeTab1 = () => {
    if (tab1 === "tabs1") {
      setTab1("tab1");
      setTab2("tabs2");
      setTab3("tabs3");
      setTab4("tabs4");
    }
  };

  const changeTab2 = () => {
    if (tab2 === "tabs2") {
      setTab1("tabs1");
      setTab2("tab2");
      setTab3("tabs3");
      setTab4("tabs4");
    }
  };

  const changeTab3 = () => {
    if (tab3 === "tabs3") {
      setTab3("tab3");
      setTab1("tabs1");
      setTab2("tabs2");
      setTab4("tabs4");
    }
  };

  const changeTab4 = () => {
    if (tab4 === "tabs4") {
      setTab4("tab4");
      setTab1("tabs1");
      setTab2("tabs2");
      setTab3("tabs3");
    }
  };

  const linkTab = () => {
    if (link === "hide") {
      setLink("tabs v3");
      setFile("hide");
    } else {
      setLink("hide");
      setFile("hide");
    }
  };

  const fileTab = () => {
    if (file === "hide") {
      setLink("hide");
      setFile("tabs v3");
    } else {
      setLink("hide");
      setFile("hide");
    }
  };

  const [profile, setProfile] = useState("profile");

  const changeDisplay2 = () => {
    if (profile === "profile") {
      setProfile("profile2");
    } else {
      setProfile("profile");
    }
  };

  const getId = async (e) => {
    e.preventDefault();
    let idAnnouncement = "";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .post("http://localhost:8000/api/classroom/" + id + "/announcements/", {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response) {
        if (response.data.announcement_id !== "") {
          idAnnouncement = response.data.announcement_id;
        }
      })
      .catch(function (error) {});

    axios
      .post("http://localhost:8000/api/classroom/" + id + "/assignments/", {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response) {
        if (response.data.assignment_id !== "") {
          history.push(
            `/${id}/CreateAssignment/${response.data.assignment_id}/${idAnnouncement}`
          );
        }
      })
      .catch(function (error) {});
  };
  function changePage() {
    history.push("/");
    window.location.reload(false);
  }

  let numOfStud = student.length;
  let register = "hide";
  if (user.status === "admin") {
    register = "btn btn-outline-primary";
  }

  const showTabAn = async (e) => {
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .post("http://localhost:8000/api/classroom/" + id + "/announcements/", {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response) {
        if (response.data.announcement_id !== "") {
          setIdAn(response.data.announcement_id);
        }
        if (tabAn === "hide") {
          setTabAn("right-content v3");
          setButtonAn("hide");
        } else {
          setTabAn("hide");
          setButtonAn("right-content v2");
        }
      })
      .catch(function (error) {});
  };

  const hideTabAn = async (e) => {
    e.preventDefault();

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .delete(
        "http://localhost:8000/api/classroom/" + id + "/announcements/" + idAn
      )
      .then(function (response) {
        if (buttonAn === "hide") {
          setTabAn("hide");
          setButtonAn("right-content v2");
        } else {
          setTabAn("right-content v3");
          setButtonAn("hide");
        }
      })
      .catch(function (error) {});
  };

  const addHandler = async (e) => {
    e.preventDefault();
    (async () => {
      await fetch(
        "http://localhost:8000/api/classroom/" + id + "/announcements/",
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            Origin: "https://127.0.0.1:5000",
          },

          body: JSON.stringify({
            announcement_id: idAn,
            announcement_name: user.fullname,
            class_id: id,
            body: bodyAn,
          }),
        }
      );
      window.location.reload(false);
    })();
  };

  return (
    <div className="wrapper-all">
      <div className="wrapper">
        <div>
          <nav className="nav fixed-top">
            <GoMortarBoard className="icon" />
            <h2 onClick={changePage} className="title">
              Thearning
            </h2>
            <center>
              <div className="btn-nav">
                <button className="tab" onClick={changeTab1}>
                  Forum
                </button>
                <button className="tab" onClick={changeTab2}>
                  Tugas Kelas
                </button>
                <button className="tab" onClick={changeTab3}>
                  Anggota
                </button>
              </div>
            </center>
            <img
              src={photo}
              alt="img"
              className="prof"
              onClick={changeDisplay2}
            />
            <div className={profile}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <img src={photo} alt="img" className="prof2" />
                    </td>
                  </tr>
                  <tr>
                    <td className="name">{user.fullname}</td>
                  </tr>
                  <tr>
                    <td className="email">{user.status}</td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        onClick={() => {
                          history.push("/register");
                        }}
                        className={register}
                        style={{ padding: "5px", marginRight: "10px" }}
                      >
                        Register
                      </button>
                      <button
                        onClick={logoutHandler}
                        className="btn btn-md btn-danger"
                      >
                        LOGOUT
                      </button>
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
                <img src={classRoom.class_image} alt="img" />
                <div className="about">
                  <h1>{classRoom.class_name}</h1>
                  <h3>{classRoom.section}</h3>
                </div>
                <h5
                  className="codeClass"
                  onClick={() =>
                    navigator.clipboard.writeText(classRoom.class_id)
                  }
                >
                  {classRoom.class_id}
                </h5>
                <button
                  className={"btnClass2 v3 v2"}
                  onClick={changePage2}
                ></button>
              </div>
            </center>
            <div className="content">
              <div className="left-content">
                <h6 style={{ textAlign: "left", marginBottom: "20px" }}>
                  Mendatang
                </h6>
                <p style={{ textAlign: "left", fontSize: "0.75em" }}>
                  Tidak ada tugas yang perlu segera diselesaikan
                </p>
              </div>
              <div className={buttonAn} style={{ textAlign: "center" }}>
                <img
                  src={IconAn}
                  alt=""
                  style={{ width: "30px", color: "#7AABD9" }}
                />
                <h5 onClick={showTabAn}>Tambahkan Pengumuman</h5>
              </div>
              <div className={tabAn}>
                <textarea
                  className="form-control"
                  placeholder="Masukkan Komentar"
                  value={bodyAn}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "20px",
                  }}
                >
                  <button
                    className="btn btn-outline-primary"
                    onClick={hideTabAn}
                    style={{
                      padding: "3px",
                      marginRight: "10px",
                      marginLeft: "10px",
                      zIndex: "5",
                    }}
                  >
                    Batal
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ padding: "3px" }}
                    onClick={addHandler}
                  >
                    Kirim
                  </button>
                </div>
                <div className={file}>
                  <form>
                    <input
                      type="file"
                      className="form-control"
                      placeholder="Pilih File"
                      style={{ marginBottom: "10px" }}
                    />
                    <button
                      className="btn btn-outline-primary"
                      style={{ marginRight: "5px" }}
                      onClick={fileTab}
                    >
                      Batal
                    </button>
                    <button className="btn btn-primary">Submit</button>
                  </form>
                </div>
                <div className={link}>
                  <form>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Salin Link Disini"
                      style={{ marginBottom: "10px" }}
                    />
                    <button
                      className="btn btn-outline-primary"
                      style={{ marginRight: "5px" }}
                      onClick={linkTab}
                    >
                      Batal
                    </button>
                    <button className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
              {assignment.map((assignment) => (
                <article key={assignment.assignment_id}>
                  <div className="right-content">
                    <HiClipboardList className="icons" />
                    <div className="infoAssignment">
                      <Link
                        to={`/${id}/Assignment/${assignment.assignment_id}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <h6>{assignment.assignment_name}</h6>
                      </Link>
                      <p>
                        {assignment.due_date === null
                          ? "Tanpa tenggat"
                          : "Tenggat : " + assignment.due_date}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className={tab2}>
            <div className="title-student v3">
              <h3>Tugas Kelas</h3>
              <form onSubmit={getId}>
                <button type="submit" className="btn-add"></button>
              </form>
            </div>
            <hr></hr>
            <div className="listAs">
              {assignment.map((assignment) => (
                <article key={assignment.assignment_id}>
                  <div className="listItem">
                    <HiClipboardList className="icons" />
                    <div className="infoAssignment">
                      <Link
                        to={`/${id}/Assignment/${assignment.assignment_id}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <h6>{assignment.assignment_name}</h6>
                      </Link>
                      <p>
                        {assignment.due_date === null
                          ? "Tanpa tenggat"
                          : "Tenggat : " + assignment.due_date}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div
            className={tab3}
            style={{ paddingLeft: "200px", paddingRight: "200px" }}
          >
            <div className="title-student">
              <h3 style={{ marginBottom: "30px", marginTop: "20px" }}>
                Pengajar
              </h3>
            </div>
            <hr
              style={{ border: "1px solid #0d6efd", borderRadius: "5px" }}
            ></hr>
            <br></br>
            {teacher.map((teacher) => (
              <article key={teacher.user_id}>
                <div className="list-student">
                  <img
                    src={teacher.profile_photo}
                    alt="img"
                    className="profile-student"
                  />
                  <div className="info-student">
                    <h5>{teacher.fullname}</h5>
                  </div>
                </div>
                <hr></hr>
              </article>
            ))}
            <div className="title-student v2">
              <h3>Anggota</h3>
              <h6>{numOfStud} Siswa</h6>
            </div>
            <hr
              style={{ border: "1px solid #0d6efd", borderRadius: "5px" }}
            ></hr>
            <br></br>
            {student.map((student) => (
              <article key={student.user_id}>
                <div className="list-student">
                  <img
                    src={student.profile_photo}
                    alt="img"
                    className="profile-student"
                  />
                  <div className="info-student">
                    <h5>{student.fullname}</h5>
                  </div>
                </div>
                <hr></hr>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Class;
