
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const body = { email, password };

            const response = await fetch(
                'http://localhost:8080/api/v1/users/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)

            });

            let myResult = await response.json()
            //setData(myResult)
            console.log(myResult)
            props.setLogin({ user: true, verifiedAdmin: myResult.admin })
            localStorage.setItem('token', myResult.token) //left side is variable in the front end, that will show in browser local storage
            localStorage.setItem('verifiedAdmin', myResult.admin)
            history.push("/");
            //console.log(`login.js Result: ${myResult.admin}`)
            //console.log("myResult: ", myResult)
        } catch (err) {
            console.log(err)
        }

    }


    return (
        <div id="login">
            <div className="login-left">
                <h1>Welcome To Shop 24x7</h1>
                <p>
                    Zombie ipsum brains reversus ab cerebellum viral inferno, brein nam rick mend grimes malum cerveau cerebro. De carne cerebro lumbering animata cervello corpora quaeritis. Summus thalamus brains sit​​, morbo basal ganglia vel maleficia? De braaaiiiins apocalypsi gorger omero prefrontal cortex undead survivor fornix dictum mauris. Hi brains mindless mortuis limbic cortex soulless creaturas optic nerve, imo evil braaiinns stalking monstra hypothalamus adventus resi hippocampus dentevil vultus brain comedat cerebella pitiutary gland viventium. Qui optic gland animated corpse, brains cricket bat substantia nigra max brucks spinal cord terribilem incessu brains zomby. The medulla voodoo sacerdos locus coeruleus flesh eater, lateral geniculate nucleus suscitat mortuos braaaains.
                </p>
            </div>
            <div className="login-right">
                <h3 className="text-center text-black ">Login</h3>
                <div className="container">
                    <form id="login-form" className="form" method="post">
                        <div className="form-group">
                            <label htmlFor="login-email" className="text-Black"  >Email:</label>
                            <input type="email" name="email" id="login-email" className="form-control" onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password" className="text-Black" >Password:</label>
                            <input type="password" name="password" id="login-password" className="form-control" onChange={e => setPassword(e.target.value)} autoComplete="off"></input>
                        </div>
                        <div className="form-group">
                            <input type="submit" name="submit" id="“login-submit" className="btn btn-info " value="submit" onClick={handleSubmit}></input>
                        </div>
                        <div id="register-link" className="text-right">
                            <a href="/register" className="text-Black">Register here</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;