import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const copyText = (text) => {
    toast("🦄 Copied To Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    console.log("showing the Password");
    if (ref.current.src.includes("resour/hidden.png")) {
      ref.current.src = "resour/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "resour/hidden.png";
      passwordRef.current.type = "password";
    }
  };

  const savePass = () => {
    setPasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      {/* bg-gray-500 below will contain this */}
      <div className="  myContainer ">
        <h1 className="text-4xl font-bold text-center  ">
          {" "}
          <span className="text-black font-extrabold">&lt;</span>
          <span className="font-extrabold">Secur</span>
          <span className="text-black font-extrabold">Key/&gt;</span>
        </h1>
        <p className="text-lg text-center  ">Your own Password Manager</p>
        <div className=" flex flex-col p-4  text-black gap-4 items-center  ">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URl"
            className="rounded-2xl border border-black w-full px-4 py-1"
            type="text"
            name="site"
          />
          <div className="flex w-full gap-5">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-2xl border border-black w-full px-4 py-1"
              type="text"
              name="username"
            />
            <div className=" relative items-center   flex">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-2xl border border-black w-full px-4 py-1"
                type="password"
                name="password"
              />
              <span
                className="absolute cursor-pointer right-3"
                onClick={showPassword}
              >
                <img ref={ref} src="resour\hidden.png" alt="" width={23} />
              </span>
            </div>
          </div>

          <button
            onClick={savePass}
            className="gap-1 flex items-center   justify-center   bg-black text-white rounded-full w-fit p-2 hover:text-black px-4 hover:bg-purple-200
            border-2
          hover:font-bold hover:border-black"
          >
            Add Password
            <lord-icon
              src="https://cdn.lordicon.com/rcgrnzji.json"
              trigger="hover"
              stroke="bold"
            ></lord-icon>
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-black py-4 text-2xl font-bold">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full overflow-hidden rounded-lg">
              <thead className="bg-purple-400 py-2">
                <tr>
                  <th className="py-2 text-xl">Site</th>
                  <th className="py-2 text-xl ">UserName</th>
                  <th className="py-2 text-xl ">Password</th>
                  <th className="py-2 text-xl ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item) => {
                  return (
                    <tr key={item.username}>
                      <td className="text-center py-3 items-center cursor-pointer justify-center flex gap-1">
                        <a target="_blank" href={`www.+ ${item.site} +.com`}>
                          {item.site}
                        </a>
                        <div onClick={() => copyText(item.site)}>
                          <lord-icon
                            style={{ width: "22px", height: "29px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                        {/* {item.site} */}
                      </td>
                      <td className="text-center cursor-pointer  py-3  ">
                        {item.username}
                        <span onClick={() => copyText(item.username)}>
                          <lord-icon
                            style={{ width: "22px", height: "29px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </td>

                      <td className="text-center cursor-pointer gap-1 justify-center items-center flex py-3">
                       <span>{item.password}</span> 
                        <div onClick={() => copyText(item.password)}>
                          <lord-icon
                            style={{ width: "22px", height: "29px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="text-center cursor-pointer gap-1  justify-center items-center flex   py-3">Edit
                      <lord-icon
                            style={{ width: "22px", height: "29px" }}
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                          ></lord-icon>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
