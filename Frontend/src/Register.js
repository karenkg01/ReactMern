
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName]= useState("");
    const [lastName, setLastName]= useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {firstName,lastName, email, password, isAdmin};
            console.log(body)
            const response = await fetch(
                'http://localhost:8080/api/v1/users/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)

            });
            const data = await response
            console.log(data)
            history.push("/login");
        } catch (err) {
            console.log(err.message)
        }
        setFirstName('')
        setLastName('')
        setEmail('');
        setPassword('');  
    }

    console.log(setIsAdmin)
    return (
        <div id="login">
        <div className="login-left">
            <h1>Welcome To Shop 24x7</h1>
            <p>
                Zombie ipsum brains reversus ab cerebellum viral inferno, brein nam rick mend grimes malum cerveau cerebro. De carne cerebro lumbering animata cervello corpora quaeritis. Summus thalamus brains sit​​, morbo basal ganglia vel maleficia? De braaaiiiins apocalypsi gorger omero prefrontal cortex undead survivor fornix dictum mauris. Hi brains mindless mortuis limbic cortex soulless creaturas optic nerve, imo evil braaiinns stalking monstra hypothalamus adventus resi hippocampus dentevil vultus brain comedat cerebella pitiutary gland viventium. Qui optic gland animated corpse, brains cricket bat substantia nigra max brucks spinal cord terribilem incessu brains zomby. The medulla voodoo sacerdos locus coeruleus flesh eater, lateral geniculate nucleus suscitat mortuos braaaains.
            </p>
        </div>
        <div className="login-right">
            <h3 className="text-center text-black ">Register form</h3>
            <div className="container">
                <form id="login-form" className="form" method="post">
                    <div className="form-group">
                        <label htmlFor="register-first-name" className="text-Black"  >First Name:</label>
                        <input type="text" name="firstName" id="register-first-name" className="form-control" onChange={e => setFirstName(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-last-name" className="text-Black"  >Last Name:</label>
                        <input type="text" name="lastName" id="register-last-name" className="form-control" onChange={e => setLastName(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-email" className="text-Black"  >Email:</label>
                        <input type="email" name="email" id="register-email" className="form-control" onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-password" className="text-Black" >Password:</label>
                        <input type="password" name="password" id="register-password" className="form-control" onChange={e => setPassword(e.target.value)} autoComplete="off"></input>
                    </div>
                    <div className="form-group">
                        <input type="submit" name="submit" id="register-submit" className="btn btn-info " value="submit" onClick={handleSubmit}></input>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export default Register;