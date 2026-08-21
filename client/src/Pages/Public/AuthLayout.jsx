import { Outlet } from "react-router-dom";
import productivityImg from "../../assets/employee-productivity.jpg";
import RippleDistortion from "../../components/RippleDistortion.jsx";
import "./Auth.css";

function AuthLayout() {
    return (
        <div className="signUpPage">
            <div className="main">
                <div className="productivity-img">
                    <RippleDistortion
                        src={productivityImg}
                        brushSize={150}
                        strength={0.2}
                        swirl={1}
                        rings={4}
                        grayscale={false}
                        spread={5}
                        fade={3}
                        spacing={15}
                        dispersion={0}
                        glint={0}
                        tint="#a855f7"
                        tintAmount={0.1}
                        highlightColor="#ffffff"
                        trigger="hover"
                        clickStrength={2}
                        quality="low"
                        enabled
                    />
                </div>
                {/* Outlet renders either AuthForm(Login) or AuthForm(SignUp) depending on the route */}
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
