import "../style/index.css";
//import hook react
import React, { useState } from "react";

//import hook useHitory from react router dom
import { useHistory } from "react-router";

function Login() {
  //define state
  const [user_id, setUser] = useState("");
  const [password, setPassword] = useState("");

  //define history
  const history = useHistory();

  //function "loginHanlder"
  const loginHandler = async (e) => {
    e.preventDefault();

    let a = user_id;
    let b = password;
    let mystorage = window.localStorage;
    let url = "http://localhost:8000/api/auth";
    (async () => {
      const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://127.0.0.1:5000",
        },

        body: JSON.stringify({ key: a, password: b }),
      });
      const content = await rawResponse.json();

      mystorage.setItem("token", content["token"]);
      console.log(content);
      if (localStorage.getItem("token")) {
        history.push("/");
      }
    })();
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body" style={{ backgroundColor: "white" }}>
              <h4 className="fw-bold">HALAMAN LOGIN</h4>
              <hr />
              <form onSubmit={loginHandler}>
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
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    LOGIN
                  </button>
                </div>
              </form>
              <div className="pt-2 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    history.push("/register");
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
