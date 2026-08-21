import React, { useState, useEffect } from "react";
import "./Profile.css";
import EditProfileModal from "../../components/EditProfileModal.jsx";
import { getProfile, updateProfile } from "../../services/profileService.js";

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const fetchProfile = async () => {
        if (!user || !user.id) return;
        try {
            setLoading(true);
            const res = await getProfile(user.id);
            if (res && res.profile) {
                setProfileData(res.profile);
            }
        } catch (err) {
            console.error(err);
            setProfileData(user);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleUpdateProfile = async (updatedData) => {
        if (!user || !user.id) return;
        try {
            const res = await updateProfile(user.id, updatedData);
            if (res && res.profile) {
                setProfileData(res.profile);
                const updatedUser = { ...user, ...res.profile };
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const displayData = profileData || user;

    return (
        <div className="profile-page">
            <h1>My Profile</h1>
            {loading ? (
                <p>Loading profile details...</p>
            ) : (
                <div className="profile-card">
                    <div className="profile-header-section">
                        <div className="avatar-circle">
                            {displayData && displayData.name ? displayData.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="user-main-info">
                            <h2>{displayData ? displayData.name : "Guest User"}</h2>
                            <span className="role-tag">{displayData ? displayData.role : "Client"}</span>
                        </div>
                    </div>

                    <div className="info-grid">
                        <div className="info-item">
                            <label>Email Address</label>
                            <p>{displayData ? displayData.email : "Not Provided"}</p>
                        </div>
                        <div className="info-item">
                            <label>Phone Number</label>
                            <p>{displayData && displayData.phone ? displayData.phone : "Not Provided"}</p>
                        </div>
                        <div className="info-item">
                            <label>Department</label>
                            <p>{displayData && displayData.department ? displayData.department : "General"}</p>
                        </div>
                        <div className="info-item">
                            <label>Designation</label>
                            <p>{displayData && displayData.designation ? displayData.designation : "Employee"}</p>
                        </div>
                        <div className="info-item">
                            <label>Location / Address</label>
                            <p>{displayData && displayData.address ? displayData.address : "Not Provided"}</p>
                        </div>
                    </div>

                    <button className="edit-profile-btn" onClick={() => setIsModalOpen(true)}>
                        Edit Profile Details
                    </button>
                </div>
            )}

            <EditProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userProfile={displayData}
                onSubmit={handleUpdateProfile}
            />
        </div>
    );
};

export default Profile;