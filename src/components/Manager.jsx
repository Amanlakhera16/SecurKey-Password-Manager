import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

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

  const showPassword = () => {
    if (ref.current.src.includes("resour/hidden.png")) {
      ref.current.src = "resour/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "resour/hidden.png";
      passwordRef.current.type = "password";
    }
  };

  const savePass = async () => {
    
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      // If any such id exists in the db, delete it 
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: uuidv4() }) })

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: form.id }) })
      
      toast('Password saved!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
  }
  else {
      toast('Error: Password not saved!');
  }
  };

  const deletePassword = async (id) => {
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    toast(" Password Deleted Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const editPassword = (id) => {
    setForm({ ...passwordArray.filter((item) => item.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
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
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      {/* bg-gray-500 below will contain this */}
      <div className="  p-2 md:p-0 md:myContainer ">
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
          <div className="flex flex-col w-full md:flex-row gap-5">
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
            Save
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
                {passwordArray.map((item,index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center cursor-pointer   py-3">
                        <div className="justify-center items-center flex gap-1">
                          <span>{item.site}</span>
                          <div onClick={() => copyText(item.site)}>
                            <lord-icon
                              style={{
                                width: "22px",
                                height: "29px",
                                top: "5px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center cursor-pointer   py-3">
                        <div className="justify-center items-center gap-1 flex">
                          <span>{item.username}</span>
                          <div onClick={() => copyText(item.username)}>
                            <lord-icon
                              style={{
                                width: "22px",
                                height: "29px",
                                top: "5px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="text-center cursor-pointer  py-3">
                        <div className="justify-center items-center gap-1 flex">
                          <span>{item.password}</span>
                          <div
                            className=""
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              style={{
                                width: "22px",
                                height: "29px",
                                top: "5px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center cursor-pointer gap-4  justify-center items-center flex   py-3">
                        <span
                          className=" cursor-pointer"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            style={{ width: "22px", height: "29px" }}
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                        <span
                          className=" cursor-pointer"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            style={{ width: "22px", height: "29px" }}
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
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
