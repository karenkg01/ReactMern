import React from 'react';
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

const Footer = ()=> {



    return (
     <div id="footer" style={{marginTop:'300px'}}>
        <footer className="footer-copyright text-center py-1 ">
        &copy; {new Date().getFullYear()} Copyright: <a href="https://www.karenGomez.com"> KGomez.com </a>
        </footer>
        <div style={{display: "flex", justifyContent: "center"}}>
        <a href="https://www.facebook.com/"><FaFacebookSquare className="social-medial" size={30} color={'#2962ff'}/></a>
        <a href="https://www.instagram.com/"><FaInstagramSquare className="social-medial" size={30} color={'#2962ff'} /></a>
        <a href="https://es.linkedin.com/"><FaLinkedin className="social-medial" size={30} color={'#2962ff'} /></a>
        </div>
     </div>
    );
  
}

  export default Footer;