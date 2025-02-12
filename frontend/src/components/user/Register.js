import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {register,clearAuthError} from "../../actions/userAction";
import {toast}  from "react-toastify";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const [avatar, setavatar] = useState("");
  const [avatarPreview, setavatarPeview] = useState(
    "/images/default_avatar.png"
  );
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading , error , isAuthenticated }= useSelector(state => state.authState)

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
            setavatarPeview(reader.result)
          setavatar(e.target.files[0]);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }else{

        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };
const submitHandler = (e)=>{
     e.preventDefault();
     const formData = new FormData();
     formData.append('name', userData.name)
     formData.append('email', userData.email)
     formData.append('password', userData.password)
     formData.append('avatar', avatar)
     dispatch(register(formData))
}

useEffect(()=>{
    if (isAuthenticated) {
        navigate('/')
        return
    }
    
    if (error) {
        toast(error,{
        position: "bottom-center",
        type:error,
        onOpen:()=>{ dispatch(clearAuthError)}
        })
        return
     }

},[error,isAuthenticated,navigate,dispatch])


  return (
    <div>
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler} className="shadow-lg" encType="multipart/form-data">
              <h1 className="mb-3">Register</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  name="name"
                  onChange={onChange}
                  type="name"
                  id="name_field"
                  className="form-control"
                 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  onChange={onChange}
                  id="password_field"
                  className="form-control"

                  name="password"
                 
                />
              </div>

              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="avatar"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>

              <button
              disabled={loading}
                id="register_button"
                type="submit"
                className="btn btn-block py-3"
              >
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Register;
