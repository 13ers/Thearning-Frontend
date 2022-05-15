import { GoMortarBoard } from "react-icons/go";
import { useParams } from "react-router-dom";
import { HiClipboardList } from "react-icons/hi";
import { HiOutlineUpload } from "react-icons/hi";
import { IoLink } from "react-icons/io5";
import fileImg from "../../img/file.png";
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
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [publicInput, setPubIn] = useState("com-input");
  const [pubcom, setPubComment] = useState("");

  const [submission, setSubmission] = useState({});
  console.log(submission);
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

  let total = assignment.total_marks;
  let totalMark = "";
  let hour = "";
  let min = "";
  let day = "";
  let monthName = "";
  let year = "";
  let deadline = "";

  if (total === 100) {
    totalMark = "0/100";
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

  console.log(assignment);

  return (
    <div className="wrapper-all">
      <div className="wrapper">
        <div>
          <nav className="nav fixed-top">
            <GoMortarBoard className="icon" />
            <h2 onClick={changePage} className="title">
              Thearning
            </h2>
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
        <div className="container3 v2">
          <div className="left-As">
            <HiClipboardList className="logo-As" />
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
                <h6>Komentar kelas</h6>
                <button className="btnClass3" onClick={changeDisplay4}></button>
              </div>
              <div className="public-comment" style={{ position: "relative" }}>
                {comment.map((comment) => (
                  <article key={comment.id} style={{ position: "relative" }}>
                    <div className="list-comment v2">
                      <img src={photo} alt="img" className="prof3" />
                      <textarea
                        className="form-control"
                        placeholder="Masukkan Komentar"
                        value={comment.body}
                        readOnly
                      ></textarea>
                    </div>
                    <form onSubmit={pubcomDelete(comment.id)}>
                      <button type="submit" className="btns v2"></button>
                    </form>
                  </article>
                ))}
              </div>
              <div className={publicInput}>
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
        </div>
      </div>
    </div>
  );
}
export default Assignment;
