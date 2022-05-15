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

function UserAssignment() {
  const { idClass } = useParams();
  const { idAs } = useParams();
  const [user, setUser] = useState({});
  const [assignment, setAssignment] = useState({});
  const [attachments, setAttachment] = useState([]);
  const [submissionData, setSubmissionData] = useState([]);
  const [comment, setComment] = useState([]);
  const [privateComment, setPrivateComment] = useState([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [privateInput, setPrivIn] = useState("com-input");
  const [privateCom, setPrivCom] = useState("private-coms");
  const [publicInput, setPubIn] = useState("com-input");
  const [publicCom, setPubCom] = useState("public-coms");
  const [privcom, setPrivComment] = useState("");
  const [pubcom, setPubComment] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setSelectedFileName] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [link, setLink] = useState("");
  const [linkTab, setLinkTab] = useState("hide");
  const [fileTab, setFileTab] = useState("hide");
  const [listOp, setListOp] = useState("hide");
  const [statusSub, setStatusSub] = useState("");
  const [subMenu, setSubMenu] = useState("hide");
  const [unsubMenu, setUnsubMenu] = useState("hide");
  const [colorStatus, setColorStatus] = useState("");
  const [delAtt, setDelAtt] = useState("");
  const [submission, setSubmission] = useState({});
  const [datacoba, setDataCoba] = useState({});
  let subIds = submission.submission_id;

  let FileName = fileName
    .substring(fileName.lastIndexOf("\\") + 1)
    .split(".")[0];
  //define history
  const history = useHistory();

  //token
  const token = localStorage.getItem("token");

  let urlAs =
    "http://localhost:8000/api/classroom/" +
    idClass +
    "/assignments/students/" +
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
      setSubmission(response.data.submission);
      setTime(response.data.assignment.due_time);
      setDate(response.data.assignment.due_date);
      setSubmissionData(response.data.submission_attachments);
      setComment(response.data.comments);
      setPrivateComment(response.data.private_comments);

      if (response.data.submission.submitted === true) {
        setDelAtt("hide");
        setUnsubMenu("btn-unsubmit");
        setSubMenu("hide");
        if (response.data.submission.on_time === true) {
          setStatusSub("Diserahkan");
          setColorStatus("black");
        } else if (response.data.submission.on_time === false) {
          setStatusSub("Terlambat");
          setColorStatus("red");
        }
      } else if (response.data.submission.submitted === false) {
        setDelAtt("");
        setUnsubMenu("hide");
        setSubMenu("btn-submit");
        if (response.data.submission.on_time === false) {
          setStatusSub("Terlambat");
          setColorStatus("red");
        } else {
          setStatusSub("Ditugaskan");
          setColorStatus("green");
        }
      }
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

  const changeDisplay3 = () => {
    if (privateInput === "com-input") {
      setPrivIn("private-input");
    } else {
      setPrivCom("private-coms");
      setPrivIn("com-input");
    }
  };

  const changeDisplay4 = () => {
    if (publicInput === "com-input") {
      setPubIn("public-input");
    } else {
      setPubCom("public-coms");
      setPubIn("com-input");
    }
  };

  function changePage() {
    history.push("/");
    window.location.reload(false);
  }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    setSelectedFileName(event.target.files[0].name);
  };

  const fileHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("submission_id", subIds);
    formData.append("filename", FileName);
    //send data to server
    await axios
      .post("http://localhost:8000/api/upload/", formData)
      .then((response) => {
        setFileTab("hide");
        setLinkTab("hide");
        setSelectedFile();
        setIsFilePicked(false);
        setSelectedFileName("");
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

        body: JSON.stringify({ url: link, submission_id: subIds }),
      });
      setFileTab("hide");
      setLinkTab("hide");
      setLink("");
      window.location.reload(false);
    })();
  };

  const privcomHandler = async (e) => {
    e.preventDefault();
    (async () => {
      await fetch(
        "http://localhost:8000/api/classroom/" + idClass + "/privatecomments",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            Origin: "https://127.0.0.1:5000",
          },

          body: JSON.stringify({ submission_id: subIds, body: privcom }),
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
        if (data.comment.id === value) {
          (async () => {
            await fetch(
              "http://localhost:8000/api/classroom/" +
                idClass +
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

  const pubcomHandler = async (e) => {
    e.preventDefault();
    (async () => {
      await fetch(
        "http://localhost:8000/api/classroom/" + idClass + "/comments",
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
        if (data.comment.id === value) {
          (async () => {
            await fetch(
              "http://localhost:8000/api/classroom/" + idClass + "/comments",
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

  const showOp = () => {
    if (listOp === "hide") {
      setListOp("classOp2 v2");
      setFileTab("hide");
      setLinkTab("hide");
    } else {
      setListOp("hide");
      setFileTab("hide");
      setLinkTab("hide");
    }
  };

  const showFile = () => {
    if (fileTab === "hide") {
      setFileTab("tabs v4");
      setListOp("hide");
      setLinkTab("hide");
    }
  };

  const showLink = () => {
    if (linkTab === "hide") {
      setListOp("hide");
      setFileTab("hide");
      setLinkTab("tabs v4");
    }
  };

  const hide = () => {
    setFileTab("hide");
    setLinkTab("hide");
    setListOp("hide");
    setSelectedFile();
    setIsFilePicked(false);
    setSelectedFileName("");
    setLink("");
  };

  const dellFile = function (value) {
    return async function (e) {
      e.preventDefault();
      for (let i = 0; i < submissionData.length; i++) {
        let data = submissionData[i];
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
      for (let i = 0; i < submissionData.length; i++) {
        let data = submissionData[i];
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

  const submitSub = async (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/classroom/" +
          idClass +
          "/submissions/" +
          submission.submission_id +
          "/submit"
      )
      .then((response) => {
        window.location.reload(false);
        setUnsubMenu("btn-unsubmit");
        setSubMenu("hide");
      });
  };

  const unsubmitSub = async (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/classroom/" +
          idClass +
          "/submissions/" +
          submission.submission_id +
          "/unsubmit"
      )
      .then((response) => {
        window.location.reload(false);
        setSubMenu("btn-submit");
        setUnsubMenu("hide");
      });
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
  let userid = user.user_id;
  let statusComment = "";
  let statusComment2 = "";

  for (let i = 0; i < comment.length; i++) {
    let data = comment[i];
    if (data.commenter.user_id === userid) {
      statusComment = "";
    } else {
      statusComment = "hide";
    }
  }

  for (let i = 0; i < privateComment.length; i++) {
    let data = privateComment[i];
    if (data.commenter.user_id === userid) {
      console.log(data.commenter.user_id, userid);
    } else {
      console.log(data.commenter.user_id, userid);
    }
  }

  console.log(statusComment2);

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
                <h6>{comment.length} Komentar kelas</h6>
                <button className="btnClass3" onClick={changeDisplay4}></button>
              </div>
              <div className="public-comment" style={{ position: "relative" }}>
                {comment.map((comment) => (
                  <article key={comment.id} style={{ position: "relative" }}>
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
                      className={statusComment}
                    >
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
          <div className="right-As">
            <div className="submission">
              <div className="title-sub">
                <h5>Tugas Anda</h5>
                <p className={colorStatus}>{statusSub}</p>
              </div>
              {submissionData.map((attachments) =>
                attachments.file === null ? (
                  <div className="sub-container v2">
                    <div className="link-info">
                      <form
                        onSubmit={dellLink(attachments.link.id)}
                        className={delAtt}
                      >
                        <button type="submit" className="btns v2"></button>
                      </form>
                      <img
                        src={attachments.link.thumbnail}
                        alt="img"
                        style={{
                          width: "50px",
                          height: "auto",
                          marginRight: "10px",
                        }}
                      />
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
                        top: "20px",
                        left: "10px",
                      }}
                      className="url"
                    >
                      {attachments.link.url}
                    </p>
                  </div>
                ) : (
                  <div className="sub-container v2">
                    <div className="link-info">
                      <form
                        onSubmit={dellFile(attachments.file.file_id)}
                        className={delAtt}
                      >
                        <button type="submit" className="btns v2"></button>
                      </form>
                      <img
                        src={fileImg}
                        alt="img"
                        style={{
                          width: "30px",
                          height: "auto",
                          marginRight: "10px",
                        }}
                        className="file-img"
                      />
                      <Link
                        to={{ pathname: attachments.file.file_url }}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <p className="file-info">{attachments.file.filename}</p>
                      </Link>
                    </div>
                    <p
                      style={{ position: "absolute", top: "20px", left: "7px" }}
                      className="file-info"
                    >
                      {attachments.file.filetype}
                    </p>
                  </div>
                )
              )}
              <div className={subMenu}>
                <button
                  className="btn btn-outline-primary"
                  style={{ marginBottom: "5px" }}
                  onClick={showOp}
                >
                  Tambah Data
                </button>
                <br></br>
                <form onSubmit={submitSub}>
                  <button className="btn btn-primary">Submit</button>
                </form>
                <div className={listOp}>
                  <button onClick={showLink} className="btn-op">
                    <IoLink style={{ marginRight: "10px" }} />
                    Link
                  </button>
                  <button onClick={showFile} className="btn-op">
                    <HiOutlineUpload style={{ marginRight: "10px" }} />
                    File
                  </button>
                </div>
                <div className={fileTab}>
                  <form onSubmit={fileHandler}>
                    <input
                      type="file"
                      className="form-control"
                      onChange={changeHandler}
                      placeholder="Pilih File"
                    />
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </form>
                  <button
                    className="btn btn-outline-primary"
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "85px",
                    }}
                    onClick={hide}
                  >
                    Batal
                  </button>
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
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </form>
                  <button
                    className="btn btn-outline-primary"
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "85px",
                    }}
                    onClick={hide}
                  >
                    Batal
                  </button>
                </div>
              </div>
              <div className={unsubMenu}>
                <form onSubmit={unsubmitSub}>
                  <button className="btn btn-primary">Batalkan</button>
                </form>
              </div>
            </div>
            <div className="private-com">
              <FaRegCommentDots className="private-icon" />
              <h6>Komentar Pribadi</h6>
              <button className="btnClass2" onClick={changeDisplay3}></button>
              <div style={{ position: "relative" }}>
                {privateComment.map((comment) => (
                  <article
                    key={comment.comment.id}
                    style={{ position: "relative", marginBottom: "10px" }}
                  >
                    <img
                      src={comment.commenter.profile_photo}
                      alt="img"
                      className="prof3"
                    />
                    <div className="list-comment">
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
                      onSubmit={privcomDelete(comment.comment.id)}
                      className={statusComment2}
                    >
                      <button type="submit" className="btns v2"></button>
                    </form>
                  </article>
                ))}
              </div>
              <div className={privateInput}>
                <img src={photo} alt="img" className="prof3" />
                <textarea
                  className="form-control"
                  placeholder="Masukkan Komentar"
                  value={privcom}
                  onChange={(e) => setPrivComment(e.target.value)}
                ></textarea>
                <form onSubmit={privcomHandler}>
                  <button type="submit" className="btn btn-primary"></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserAssignment;
