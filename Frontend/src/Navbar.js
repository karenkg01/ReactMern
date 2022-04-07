
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {

 

   console.log(`Navbar:  user: ${props.state.user} admin: ${props.state.verifiedAdmin}`)
    
    const [loggedIn, setLoggedIn]= useState(false);

    useEffect(()=>{ 
        setLoggedIn(localStorage.getItem('token') ? true : false) 
        console.log(loggedIn)
    },[props.state])
    
    return (
        <Fragment>
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                    {!loggedIn &&
                        <>  
                            <div className='nav-left'>
                            <Link to="/" className="navBarLink" style={{fontSize: '25px'}} ><strong>Shop 24x7</strong></Link>
                                <Link to="/" className="navBarLink" style={{fontSize: '25px'}} >Home</Link>
                            </div>
                            <div className='nav-right'>
                            <input type="text" className="site-search" name="q" aria-label="Search through site content" />
                            <i class="fas fa-shopping-cart"></i>
                                <Link to="/login"  style={{fontSize: '25px'}} ><strong>Login</strong></Link>
                                <Link to="/register" id="register" style={{fontSize: '25px'}}><strong>Register</strong></Link>
                            </div>
                        </>
                    }
                                        {/* <Link to="/admin" id="admin" style={{fontSize: '25px'}}>Admin</Link> */}
                    {loggedIn && 
                    <>  
                        {props.state.verifiedAdmin && 
                        <>
                           <div className='nav-left'>
                            <Link to="/" id="homepage" style={{fontSize: '25px'}} ><strong>Homepage</strong></Link>
                            <Link to="/departments" className="navBarLink" style={{fontSize: '25px'}} >Departments</Link>
                            <Link to="/categories" className="navBarLink" style={{fontSize: '25px'}} >Offers</Link>
                            <Link to="/profile" className="navBarLink" style={{fontSize: '25px'}} >Profile</Link>
                            {/* <Link to="/categories" className="navBarLink" style={{fontSize: '25px'}} >Categories</Link> */}
                            <Link to="/checkout" className="navBarLink" style={{fontSize: '25px'}} >Checkout</Link>
                           
                        </div>
                        <div className='nav-right'>
                            <Link  onClick={props.logout}  id="logout" style={{fontSize: '25px'}}>Logout </Link>
                        </div> 
                        </>
                        }
                   
                        {!props.state.verifiedAdmin && 
                        <>
                            <div className='nav-left'>
                            <Link to="/" id="homepage" style={{fontSize: '25px'}} ><strong>Homepage</strong></Link>
                            <Link to="/departments" className="navBarLink" style={{fontSize: '25px'}} >Departments</Link>
                            <Link to="/categories" className="navBarLink" style={{fontSize: '25px'}} >Offers</Link>
                            <Link to="/profile" className="navBarLink" style={{fontSize: '25px'}} >Profile</Link>
                            {/* <Link to="/categories" className="navBarLink" style={{fontSize: '25px'}} >Categories</Link> */}
                       
                        </div>
                        <div className='nav-right'>
                            <Link  onClick={props.logout}  id="logout" style={{fontSize: '25px'}}>Logout </Link>
                        </div> 
                        </>
                        }
   
                    </>
                    }
                   
            </div>

        </Fragment>
    );
}

export default Navbar;