import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const Profile = ()=> {
    const [profile, setProfile] = useState(null);
    const [edit, setEdit] = useState(false);
    const [address, setAddress] = useState(profile?.address);
    const [city, setCity] = useState(profile?.city);
    const [state, setState] = useState(profile?.state);
    const [zipcode, setZipCode] = useState(profile?.zipcode);
    const [upload, setUpload] = useState(false);
    const [file, setFile] = useState(null);

    let formRef = useRef(null);

    async function getProfile() {
        const response = await axios.get('http://localhost:8080/api/v1/profile',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log("Got Profile", response)
        setProfile(response.data.profile)
      }
    
    
      const OnEdit = (e)=>{
        e.preventDefault()
        setEdit(true)
      }

      useEffect(()=>{
        getProfile();
      },[])

      const uploadFile = (file) => {
        const url = "http://localhost:8080/api/v1/profile/image";
        const formData = new FormData();
        formData.append('image', file);
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        return  axios.post(url, formData, config)
      }

      const handleUploadButon =  async  (e)=>{
         e.preventDefault();

        setUpload((x)=> !x) //to toggle back and forth
        
        uploadFile(file);
        // if(upload){
        //   const response = await axios.patch('http://localhost:8080/api/v1/profile/image',{
        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem('token')}`
        //         },
        //         body: {
        //             id: jwt_decode(localStorage.getItem('token'))._id,
        //             image
        //         }
        //     })
        //     console.log("Got Profile", response)
           
             
        // }
      }

      const deleteProfileImage = async ()=> {
        const response = await axios.delete('http://localhost:8080/api/v1/profile/image',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
           
        })
      }
    
      const updateAddress = async()=>{
        const response = await axios.post('http://localhost:8080/api/v1/profile/address',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: {
                id: jwt_decode(localStorage.getItem('token'))._id,
                address, city, state, zipcode
            }
           
        })
      }

  
      

    return (
    <>
    <h1>Profile</h1>
    <div id="profile-card" className="card">
        <div id="profile-card-body" className="card-body">
            <div className="Profile-Row">
            <section className="profileImage">
                <form ref={ref=> formRef = ref}  className="form" action="http://localhost:8080/api/v1/profile/image" method="patch" enctype="multipart/form-data">
                    <div className="form-group">
                        <img className="profile-image" src="#" />
                        {upload? 
                            <div>
                                <input type="file" onChange={(e) => {
                                setFile(e.target.files[0]);
                                 }} />                               
                                <button  onClick={handleUploadButon}>Submit</button>
                            </div>
                            :
                            <div className='profile-buttons'>
                                <button onClick={deleteProfileImage} id="profile-delete-button" >Delete Image</button>
                                <button id="profile-upload-button" onClick={handleUploadButon}>Upload</button>
                            </div>
                        }
                    </div>
                </form>
            </section>
            <section className="ProfileInfo">
                <div id="“" className="">
                    <div>
                        <div>
                            <label>First Name</label>
                            <p><strong>{profile?.firstName}</strong></p>
                        </div>
                        <div>
                            <label>Last Name</label>
                            <p><strong>{profile?.lastName}</strong></p>   
                        </div>
                    </div>
                    <div>
                        <label>Email</label>
                        <p><strong>{profile?.email}</strong></p>
                    </div>
                </div>
                <div>
                    { edit ? 
                        <form id="" className="form"  method="post" enctype="multipart/form-data">
                            <div className="form-group">
                                <label >Street Address</label>
                                <input type="text" className="form-control" value={address} id="address" name="address"  onChange={e => setAddress(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <label >City</label>
                                <input type="text" className="form-control" value={city} id="city" name="city"  onChange={e => setCity(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <label >State</label>
                                <input type="text" className="form-control" value={state} id="state" name="state"  onChange={e => setState(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <label >Zip Code</label>
                                <input type="text" className="form-control" value={zipcode} id="zipcode" name="zipcode"  onChange={e => setZipCode(e.target.value)}></input>
                            </div>
                            <input style={{height:'45px', width:'85px'}} onClick={updateAddress} name="save" className="btn btn-info " value="save" ></input>
                        </form>
                        :   
                        <div>
                            <label>Address</label>
                            <p><strong>{profile?.address}</strong></p>
                            <button onClick={(e)=> OnEdit(e)}>Edit</button>
                        </div>
                    }
                </div>
            </section>
            </div>
        </div>
    </div>
    </>
    
    );
  
}

  export default Profile;