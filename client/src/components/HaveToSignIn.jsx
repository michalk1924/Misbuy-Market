import { React, useState } from "react";
import { Link } from "react-router-dom";
import '../style/haveToSignIn.css'
function HaveToSignIn() {
    const [showBox, setShowBox] = useState(true);
    return (
        <div>
            {showBox&&<div id="messageBox">
                <h1 id="closeBox" onClick={()=>setShowBox(false)}>✖</h1>
                <h1>You have to sign in...</h1>
                <Link to="/SignIn">
                    <h2>sign in</h2>
                </Link>
            </div>}
        </div>
    );
}

export default HaveToSignIn;
