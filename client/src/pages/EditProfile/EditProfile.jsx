import React, { useEffect, useState } from 'react';
import './EditProfile.css';
import SidebarLeft from '../../components/SidebarLeft/SidebarLeft';
import Grid from "@mui/material/Grid";
import userApi from '../../api/userApi';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const [userData, setUserData] = useState({
        username: '',
        bio: '',
        avatar: null,
    });
    const [avatarPreview, setAvatarPreview] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        userApi.account().then(response => {
            const { userName, userBio, userAvatar } = response.data;
            setUserData({
                username: userName,
                bio: userBio,
                avatar: null,
            });
            setAvatarPreview(userAvatar);
        }).catch(error => {
            console.error("Error fetching account data:", error);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setUserData(prevState => ({
            ...prevState,
            avatar: file,
        }));
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        try {
            const data = {
                userName: userData.username,
                userBio: userData.bio,
            };
            console.log(data); // Log dữ liệu để kiểm tra
            await userApi.updateUser(data, userData.avatar);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await userApi.deleteAccount();
            alert("Account deactivated successfully!");
            navigate('/login');
        } catch (error) {
            console.error("Error deactivating account:", error);
            alert("Failed to deactivate account.");
        }
    };

    return (
        <div id="main">
            <Grid container spacing={30}>
                <Grid item xs={3}>
                    <SidebarLeft />
                </Grid>
                <Grid item xs={8}>
                    <div id="editProfile"
                        style={{ backgroundColor: "#fefefe", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
                    >
                        <div className='editProfileGroup' style={{ display: "flex", flexDirection: "row" }}>
                            <img src={avatarPreview} alt="" className='editProfileAvatar' />
                            <p style={{ alignSelf: "center", fontWeight: 500, fontSize: 14 }}>{userData.username}</p>
                            <input type="file" onChange={handleAvatarChange} className="changeAvatar" />
                        </div>

                        <div className='editProfileGroup'>
                            <p className="editLabel">Username</p>
                            <input className="editData" type="text" name="username" value={userData.username} onChange={handleChange} placeholder='username' />
                        </div>

                        <div className='editProfileGroup'>
                            <p className="editLabel bio">Bio</p>
                            <textarea name="bio" id="bio" className='editData' value={userData.bio} onChange={handleChange} placeholder='bio'></textarea>
                        </div>

                        <div className='editProfileGroup'>
                            <button className="submitEditProfile" onClick={handleSubmit}>Submit</button>
                            <button className="deleteAccount" onClick={handleDeleteAccount}>Temporarily deactivate my account</button>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <div id="footer"></div>
        </div>
    );
}

export default EditProfile;
