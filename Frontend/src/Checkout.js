import React, {useState} from 'react';
import axios from 'axios'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

const Checkout = ()=> {
    const [profile, setProfile] = useState(null);
    const [address, setAddress] = useState(profile?.address);
    const [city, setCity] = useState(profile?.city);
    const [state, setState] = useState(profile?.state);
    const [zipcode, setZipCode] = useState(profile?.zipcode);
    const [firstName, setFirstName] = useState(profile?.firstName);
    const [lastName, setLastName] = useState(profile?.lastName);
    const [email, setEmail] = useState(profile?.email);

    // async function getProfile() {
    //     const response = await axios.get('http://localhost:8080/api/v1/profile',{
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         }
    //     })
    //     console.log("Got Profile", response)
    //     setProfile(response.data.profile)
    //   }

    const onCheckout = async ()=> {
        const response = await axios.post('http://localhost:8080/api/v1/checkout',{
            body: {
                user: {
                    firstName: "john",
                    lastName: "gomez",
                    password: "test",
                    email: "karenkg03@gmail"
                } ,
                cart:[
                    {
                        productId: "dhaar",
                        quantity:1
                    }
                ]
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log("Checkout response ",response)
        return response;
    }

    console.log("Checkout ")
    return (
     <> 
        <h1>User Info</h1>
        <form id="" className="form"  method="post" enctype="multipart/form-data">
            <div className="form-group">
                <label >First Name</label>
                <input type="text" className="form-control" value={firstName} id="firstName" name="firstName"  onChange={e => setFirstName(e.target.value)}></input>
            </div>
            <div className="form-group">
                <label >Last Name</label>
                <input type="text" className="form-control" value={lastName} id="lastName" name="lastName"  onChange={e => setLastName(e.target.value)}></input>
            </div>
            <div className="form-group">
                <label >Email</label>
                <input type="email" className="form-control" value={email} id="email" name="email"  onChange={e => setEmail(e.target.value)}></input>
            </div>
            <div className="form-group">
                <label >Zip Code</label>
                <input type="text" className="form-control" value={zipcode} id="zipcode" name="zipcode"  onChange={e => setZipCode(e.target.value)}></input>
            </div>
       
            <h1>Shipping Address</h1>
        
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
        </form>
        <input onClick={()=> onCheckout()} style={{height:'45px', width:'85px'}} type="submit" name="save" className="btn btn-info " value="save" ></input>

     </>
    );
  
}

  export default Checkout;