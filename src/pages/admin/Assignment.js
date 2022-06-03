import { GoMortarBoard } from "react-icons/go";
import { useParams } from "react-router-dom";
import { HiClipboardList } from "react-icons/hi";
import { HiOutlineUpload } from "react-icons/hi";
import { IoLink } from "react-icons/io5";
import fileImg from "../../img/file.png";
import assignmentIcon from "../../img/assignment.png";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import "../../style/style.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

function Assignment() {
  const { idclass } = useParams();
  const { idAs } = useParams();
  const [user, setUser] = useState({});
  const [assignment, setAssignment] = useState({});
  const [attachments, setAttachment] = useState([]);
  const [comment, setComment] = useState([]);
  const [student, setStudent] = useState([]);
  const [dataUser, setDataUser] = useState({});
  const [dataSubmission, setDataSubmission] = useState({});
  const [assignmentStudent, setAssignmentStudent] = useState([]);
  const [privateComment, setPrivateComment] = useState([]);
  const [mark, setMark] = useState("");
  const [statsSub, setStatusSub] = useState(false);
  const [privateInput, setPrivIn] = useState("com-input");
  const [privateCom, setPrivCom] = useState("private-coms");
  const [display, setDisplay] = useState("hide");
  const [display2, setDisplay2] = useState("");
  const [privcom, setPrivComment] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [publicInput, setPubIn] = useState("com-input");
  const [pubcom, setPubComment] = useState("");
  const [tab1, setTab1] = useState("left-As");
  const [tab2, setTab2] = useState("tabs2");
  const [abc, setA] = useState([]);
  const [submission, setSubmission] = useState({});
  const [idsub, setDatasubid] = useState({});
  const [arrayBaru, setArrayBaru] = useState([]);
  const [total_mark, setMarks] = useState("");
  const [mark2, setMark2] = useState("hide");
  const [editMark2, setEditMark2] = useState("hide");
  const [buttonAdd, setButtonAdd] = useState("hide");
  const [buttonEdit, setButtonEdit] = useState("hide");
  const [marks3, setMarks3] = useState();
  let subIds = submission.submission_id;
  //define history
  const history = useHistory();

  //token
  const token = localStorage.getItem("token");

  let urlAs =
    "http://localhost:8000/api/classroom/" +
    idclass +
    "/assignments/teachers/" +
    idAs;

  let urlClass = "http://localhost:8000/api/classroom/" + idclass;

  //function "fetchData"
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://localhost:8000/api/user/").then((response) => {
      setUser(response.data.data);
    });
    await axios.get(urlAs).then((response) => {
      setAssignment(response.data.assignment);
      setAttachment(response.data.assignment_attachments);
      setSubmission(response.data.submissions);
      setTime(response.data.assignment.due_time);
      setDate(response.data.assignment.due_date);
      setComment(response.data.comments);
      setA(response.data.submissions);
      console.log(response.data);
    });

    await axios.get(urlClass).then((response) => {
      setStudent(response.data.students);
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
  let total_Marks = "belum Berhasil";

  const [profile, setProfile] = useState("profile");

  const changeDisplay2 = () => {
    if (profile === "profile") {
      setProfile("profile2");
    } else {
      setProfile("profile");
    }
  };

  const changeDisplay4 = () => {
    if (publicInput === "com-input") {
      setPubIn("public-input");
    } else {
      setPubComment("public-coms");
      setPubIn("com-input");
    }
  };

  function changePage() {
    history.push("/");
    window.location.reload(false);
  }

  const pubcomHandler = async (e) => {
    e.preventDefault();
    (async () => {
      await fetch(
        "http://localhost:8000/api/classroom/" + idclass + "/comments",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            Origin: "https://127.0.0.1:5000",
          },

          body: JSON.stringify({ assignment_id: idAs, body: pubcom }),
        }
      );
      window.location.reload(false);
    })();
  };

  const pubcomDelete = function (value) {
    return async function (e) {
      e.preventDefault();
      for (let i = 0; i < comment.length; i++) {
        let data = comment[i];
        if (data.id === value) {
          (async () => {
            await fetch(
              "http://localhost:8000/api/classroom/" + idclass + "/comments",
              {
                method: "DELETE",
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "text/plain",
                  Origin: "https://127.0.0.1:5000",
                },

                body: value,
              }
            );
            window.location.reload(false);
          })();
        }
      }
    };
  };
  let userid = user.user_id;
  let statusComment2 = [];

  for (let i = 0; i < comment.length; i++) {
    let data = comment[i];
    if (data.commenter.user_id === userid) {
      let stats = "";
      statusComment2.push(stats);
    } else {
      let stats = "hide";
      statusComment2.push(stats);
    }
  }

  for (let i = 0; i < comment.length; i++) {
    let data = comment[i];
    if (data.commenter.user_id === userid) {
      let stats = "";
      statusComment2.push(stats);
    } else {
      let stats = "hide";
      statusComment2.push(stats);
    }
  }

  let dataSubmit = "";

  for (let i = 0; i < submission.length; i++) {
    let data = submission[i];
    if (data.submission.submitted === true) {
      dataSubmit = i + 1;
    }
  }

  if (dataSubmit === "") {
    dataSubmit = 0;
  }

  let finalMark = "";
  const chooseFunction = function (value) {
    return async function (e) {
      e.preventDefault();
      for (let i = 0; i < submission.length; i++) {
        let data = submission[i];
        if (data.user.user_id === value) {
          setMarks3(data.submission.marks_allotted);
          setStatusSub(true);
          setDataUser(data.user);
          setDataSubmission(data.submission);
          setDatasubid(data.submission.submission_id);
          setDisplay("submissionStudents");
          setDisplay2("hide");
          (async () => {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            axios
              .get(
                "http://localhost:8000/api/classroom/" +
                  idclass +
                  "/assignments/teachers/" +
                  idAs +
                  "/submissions/" +
                  data.submission.submission_id
              )
              .then(function (response) {
                setAssignmentStudent(response.data.submission_attachments);
                setPrivateComment(response.data.private_comments);
              });
          })();

          console.log(data.submission.marks_allotted);

          if (data.submission.submitted === false) {
            setButtonEdit("hide");
            setButtonAdd("hide");
          } else {
            if (data.submission.marks_allotted === null) {
              setButtonEdit("hide");
              setButtonAdd("btnClass2 v2");
            } else {
              setButtonEdit("btnClass2 v2");
              setButtonAdd("hide");
            }
          }
        }
      }
    };
  };

  console.log(buttonEdit, buttonAdd);

  const privcomHandler = async (e) => {
    e.preventDefault();
    (async () => {
      await fetch(
        "http://localhost:8000/api/classroom/" + idclass + "/privatecomments",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            Origin: "https://127.0.0.1:5000",
          },

          body: JSON.stringify({ submission_id: idsub, body: privcom }),
        }
      );
      window.location.reload(false);
    })();
  };

  const privcomDelete = function (value) {
    return async function (e) {
      e.preventDefault();
      for (let i = 0; i < privateComment.length; i++) {
        let data = privateComment[i];
        if (data.id === value) {
          (async () => {
            await fetch(
              "http://localhost:8000/api/classroom/" +
                idclass +
                "/privatecomments",
              {
                method: "DELETE",
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "text/plain",
                  Origin: "https://127.0.0.1:5000",
                },

                body: value,
              }
            );
            window.location.reload(false);
          })();
        }
      }
    };
  };

  const addMark = function (value1, value2, value3) {
    return async function (e) {
      e.preventDefault();

      if (value3 === null) {
        (async () => {
          await fetch(
            "http://localhost:8000/api/classroom/" +
              idclass +
              "/submissions/" +
              value2 +
              "/mark",
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                Origin: "https://127.0.0.1:5000",
              },

              body: JSON.stringify({
                submission_id: value2,
                student_id: value1,
                value: parseInt(mark),
              }),
            }
          ).then((response) => {
            window.location.reload(false);
          });
        })();
      } else {
        (async () => {
          await fetch(
            "http://localhost:8000/api/classroom/" +
              idclass +
              "/submissions/" +
              value2 +
              "/mark",
            {
              method: "PATCH",
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                Origin: "https://127.0.0.1:5000",
              },

              body: JSON.stringify({
                submission_id: value2,
                student_id: value1,
                value: parseInt(mark),
              }),
            }
          ).then((response) => {
            window.location.reload(false);
          });
        })();
      }
    };
  };

  const changeMark = function (value1, value2) {
    return async function (e) {
      e.preventDefault();
      (async () => {
        await fetch(
          "http://localhost:8000/api/classroom/" +
            idclass +
            "/submissions/" +
            value2 +
            "/mark",
          {
            method: "PATCH",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
              Origin: "https://127.0.0.1:5000",
            },

            body: JSON.stringify({
              submission_id: value2,
              student_id: value1,
              value: parseInt(mark),
            }),
          }
        ).then((response) => {
          window.location.reload(false);
        });
      })();
    };
  };

  const changeDisplay3 = () => {
    if (privateInput === "com-input") {
      setPrivIn("private-input v2");
    } else {
      setPrivCom("private-coms");
      setPrivIn("com-input");
    }
  };

  let total = assignment.total_marks;
  let totalMark = "";
  let hour = "";
  let min = "";
  let day = "";
  let monthName = "";
  let year = "";
  let deadline = "";

  let totalMarks = "";

  if (dataSubmission.marks_allotted === null) {
    totalMarks = "0";
  } else {
    totalMarks = dataSubmission.marks_allotted;
  }

  if (total === 100) {
    totalMark = "100 point";
  }

  let marks = "";
  if (dataSubmission.submitted === true) {
    if (marks3 === null) {
      marks = 0 + "/" + totalMark;
    } else {
      marks = marks3 + "/" + totalMark;
    }
  } else {
    marks = "Belum Diserahkan";
  }

  if (time !== null) {
    let times = time.split(":");
    hour = times[0];
    min = times[1];
  }

  if (date !== null) {
    let arr = date.split("-");
    year = arr[0];
    let month = arr[1];
    day = arr[2];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Des",
    ];
    monthName = months[parseInt(month) - 1];
  }

  if (time === null && date === null) {
    deadline = "";
  } else if (time === null) {
    deadline = "Tenggat : " + day + " " + monthName + " " + year;
  } else if (date === null) {
    deadline = "Tenggat : " + hour + "." + min;
  } else if (time !== null && date === null) {
    deadline =
      "Tenggat : " +
      day +
      " " +
      monthName +
      " " +
      year +
      " " +
      hour +
      "." +
      min;
  }

  let margin = "";
  if (comment.length > 0) {
    margin = "-90px";
  }

  const changeTab1 = () => {
    if (tab1 === "tabs1") {
      setTab1("left-As");
      setTab2("tabs2");
    }
  };

  const changeTab2 = () => {
    if (tab2 === "tabs2") {
      setTab1("tabs1");
      setTab2("tab2-As");
    }
  };

  const showMark = () => {
    if (mark2 === "hide") {
      setMark2("join2 v2");
      setEditMark2("hide");
    } else {
      setMark2("hide");
      setEditMark2("hide");
    }
  };

  const showEdit = () => {
    if (editMark2 === "hide") {
      setEditMark2("edit-mark");
      setMark2("hide");
    } else {
      setMark2("hide");
      setEditMark2("hide");
    }
  };

  let statusComment = [];
  for (let i = 0; i < privateComment.length; i++) {
    let data = privateComment[i];
    if (data.user_id === userid) {
      let stats = "";
      statusComment.push(stats);
    } else {
      let stats = "hide";
      statusComment.push(stats);
    }
  }

  let register = "hide";
  if (user.status === "admin") {
    register = "btn btn-outline-primary";
  }

  return (
    <div className="wrapper-all">
      <div className="wrapper">
        <div>
          <nav className="nav fixed-top">
            <GoMortarBoard className="icon" />
            <h2 onClick={changePage} className="title">
              Thearning
            </h2>
            <div style={{ marginLeft: "100px" }}>
              <center>
                <div className="btn-nav">
                  <button className="tab" onClick={changeTab1}>
                    Petunjuk
                  </button>
                  <button className="tab" onClick={changeTab2}>
                    Tugas Siswa
                  </button>
                </div>
              </center>
            </div>
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
        <div className="container3 v4">
          <div className={tab1} style={{ width: "100%" }}>
            <HiClipboardList className="logo-As3" />
            <h1>{assignment.assignment_name}</h1>
            <div className="detail-As">
              <p>{totalMark}</p>
              <p>{deadline}</p>
            </div>
            <hr></hr>
            <p>{assignment.instructions}</p>
            <div className="upload-tab v2">
              {attachments.map((attachments) =>
                attachments.file === null ? (
                  <div className="link-tab">
                    <div className="link-info">
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
                        <p>{attachments.link.title}</p>
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
            <div className="footer">
              <hr></hr>
              <div className="public-com">
                <AiOutlineComment className="public-icon" />
                <h6>{comment.length} Komentar kelas</h6>
                <button className="btnClass3" onClick={changeDisplay4}></button>
              </div>
              <div className="public-comment" style={{ position: "relative" }}>
                {comment.map((comment, i) => (
                  <article key={comment.id} className="article-comment">
                    <img
                      src={comment.commenter.profile_photo}
                      alt="img"
                      className="prof3 v2"
                    />
                    <div className="list-comment v2">
                      <span
                        style={{
                          fontWeight: "bold",
                          margin: "0px",
                          padding: "0px",
                        }}
                      >
                        {comment.commenter.fullname}
                      </span>
                      <br></br>
                      {comment.comment.body}
                    </div>
                    <form
                      onSubmit={pubcomDelete(comment.comment.id)}
                      className={statusComment2[i]}
                    >
                      <button type="submit" className="btns v2"></button>
                    </form>
                  </article>
                ))}
              </div>
              <div className={publicInput} style={{ marginTop: margin }}>
                <img src={photo} alt="img" className="prof4" />
                <textarea
                  className="form-control"
                  placeholder="Masukkan Komentar"
                  value={pubcom}
                  onChange={(e) => setPubComment(e.target.value)}
                ></textarea>
                <form onSubmit={pubcomHandler}>
                  <button type="submit"></button>
                </form>
              </div>
            </div>
          </div>
          <div className={tab2} style={{ width: "100%" }}>
            <div className="list-student">
              <h4 style={{ marginBottom: "30px" }}>
                {assignment.assignment_name}
              </h4>
              <div>
                {student.map((student, i) => (
                  <article key={student.user_id}>
                    <div className="li-student">
                      <img
                        src={student.profile_photo}
                        alt="img"
                        className="profile-student"
                      />
                      <div>
                        <h5
                          onClick={chooseFunction(student.user_id)}
                          className="chooseName"
                        >
                          {student.fullname}
                        </h5>
                      </div>
                    </div>
                    <hr></hr>
                  </article>
                ))}
              </div>
            </div>
            <div className="student-sub">
              <div className={display}>
                <div
                  className="wrapper-submission"
                  style={{ paddingRight: "10px" }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h1 style={{ marginBottom: "10px" }}>
                      {dataUser.fullname}
                    </h1>
                    <h6>{marks}</h6>
                    <button className={buttonAdd} onClick={showMark}></button>
                    <button className={buttonEdit} onClick={showEdit}></button>
                  </div>
                  <div className={mark2}>
                    <form
                      onSubmit={addMark(
                        dataUser.user_id,
                        dataSubmission.submission_id
                      )}
                    >
                      <input
                        type="text"
                        value={mark}
                        placeholder="Masukkan Nilai"
                        className="form-control"
                        onChange={(e) => setMark(e.target.value)}
                      />
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-primary"
                      />
                    </form>
                  </div>
                  <div className={editMark2}>
                    <form
                      onSubmit={changeMark(
                        dataUser.user_id,
                        dataSubmission.submission_id,
                        dataSubmission.marks_allotted
                      )}
                    >
                      <input
                        type="text"
                        value={mark}
                        placeholder="Edit Nilai Nilai"
                        className="form-control"
                        onChange={(e) => setMark(e.target.value)}
                      />
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-primary"
                      />
                    </form>
                  </div>
                  {assignmentStudent.map((attachments) =>
                    attachments.file === null ? (
                      <div
                        className="link-tab"
                        style={{ marginBottom: "10px" }}
                      >
                        <div className="link-info">
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
                            <p className="link-title">
                              {attachments.link.title}
                            </p>
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
                      <div
                        className="link-tab"
                        style={{ marginBottom: "10px" }}
                      >
                        <div className="link-info">
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
                <div className="privatecomAs" style={{ position: "relative" }}>
                  <FaRegCommentDots className="private-icon" />
                  <h6>{privateComment.length} Komentar Pribadi</h6>
                  <button
                    onClick={changeDisplay3}
                    className="btnClass2"
                  ></button>
                  <div style={{ position: "relative" }}>
                    {privateComment.map((comment, i) => (
                      <article
                        key={comment.id}
                        style={{ position: "relative", marginBottom: "10px" }}
                      >
                        <div className="list-comment v3">
                          <span
                            style={{
                              fontWeight: "bold",
                              margin: "0px",
                              padding: "0px",
                            }}
                          >
                            {comment.user_id}
                          </span>
                          <br></br>
                          {comment.body}
                        </div>
                        <form
                          onSubmit={privcomDelete(comment.id)}
                          className={statusComment[i]}
                        >
                          <button type="submit" className="btns v2"></button>
                        </form>
                      </article>
                    ))}
                  </div>
                  <div className={privateInput}>
                    <textarea
                      className="form-control"
                      placeholder="Masukkan Komentar"
                      value={privcom}
                      onChange={(e) => setPrivComment(e.target.value)}
                    ></textarea>
                    <form onSubmit={privcomHandler}>
                      <button type="submit" className="btn"></button>
                    </form>
                  </div>
                </div>
              </div>
              <div className={display2}>
                <center>
                  <img
                    src={assignmentIcon}
                    alt=""
                    style={{
                      width: "200px",
                      height: "auto",
                      marginTop: "70px",
                      marginBottom: "20px",
                    }}
                    className="file-img v2"
                  />
                  <h3>
                    Terkumpul{" "}
                    <font style={{ color: "green" }}>{dataSubmit}</font> Dari{" "}
                    <font style={{ color: "green" }}>{student.length}</font>{" "}
                    Siswa
                  </h3>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Assignment;
