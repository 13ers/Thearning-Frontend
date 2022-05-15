import { GoMortarBoard } from "react-icons/go";
import { useParams } from "react-router-dom";
import { HiClipboardList, HiOutlineUpload } from "react-icons/hi";
import { Link } from "react-router-dom";

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
  const [assignment, setAssignment] = useState([]);
  const [student, setStudent] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [tab1, setTab1] = useState("tab1");
  const [tab2, setTab2] = useState("tabs2");
  const [tab3, setTab3] = useState("tabs3");
  const [tab4, setTab4] = useState("tabs4");

  //define history
  const history = useHistory();

  //token
  const token = localStorage.getItem("token");

  let urlClass = "http://thearning.resultoption.tech/api/classroom/" + id;
  //function "fetchData"
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://thearning.resultoption.tech/api/user/").then((response) => {
      //set response user to state
      setUser(response.data.data);
    });

    await axios.get(urlClass).then((response) => {
      SetClass(response.data.class);
      setAssignment(response.data.assignments);
      setStudent(response.data.students);
      setTeacher(response.data.teachers);
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

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .post("http://thearning.resultoption.tech/api/classroom/" + id + "/assignments/", {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response) {
        if (response.data.assignment_id !== "") {
          history.push(
            `/${id}/CreateAssignment/${response.data.assignment_id}`
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
                <button className="tab" onClick={changeTab4}>
                  Nilai
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
                      <p>Tenggat : {assignment.due_date}</p>
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
          <div className={tab4}>
            <h1>Nilai</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Class;
