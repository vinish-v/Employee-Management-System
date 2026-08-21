import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser, LoginUser } from "../../services/authService.js";
import "./Auth.css";

function AuthForm({ type }) {
    const navigate = useNavigate();
    const isLogin = type === "login";

    const [formData, setFormData] = useState({
        name: "", // Only used for signup, but fine to keep in state
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Clear form and messages when switching between Login and Sign Up
    useEffect(() => {
        setError("");
        setMessage("");
        setFormData({ name: "", email: "", password: "" });
    }, [isLogin]);

    // Auto-dismiss messages and errors after 3 seconds
    useEffect(() => {
        if (error || message) {
            const timer = setTimeout(() => {
                setError("");
                setMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, message]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            if (isLogin) {
                const loginResponse = await LoginUser(formData);
                if (!loginResponse) {
                    setError("Invalid email or password");
                } else {
                    setMessage("Login successful!");
                    localStorage.setItem("user", JSON.stringify(loginResponse.user));
                    if (loginResponse.user?.role === "admin") {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/dashboard');
                    }
                }
            } else {
                const signupResponse = await signUpUser(formData);
                setMessage(signupResponse.message);
                // Clear form on signup success
                setFormData({
                    name: "",
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            setError(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signupBox">
            <h1 className="title">{isLogin ? "Login" : "Create Account"}</h1>
            <p className="subtitle">
                {isLogin
                    ? "Login to your employee management account"
                    : "Create your employee management account"}
            </p>
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}

                {!isLogin && (
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your Name"
                            required
                        />
                    </div>
                )}

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading
                        ? (isLogin ? "Logging in..." : "Creating Account...")
                        : (isLogin ? "Login" : "Sign Up")}
                </button>

                {isLogin ? (
                    <Link to="/signUp" className="loginlink">Don't have an account? Sign Up</Link>
                ) : (
                    <Link to="/login" className="loginlink">Already a user? Login</Link>
                )}
            </form>
        </div>
    );
}

export default AuthForm;
