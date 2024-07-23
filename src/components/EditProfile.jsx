
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { updateUserProfile } from "../utils/firebaseUtils"; 

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [bio, setBio] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (user) {
      try {
        await updateUserProfile(user.uid, {
          name,
          email,
          profilePictureUrl,
          bio,
          updatedAt: new Date()
        });
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile: ", error);
      }
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Profile Picture URL:
          <input type="text" value={profilePictureUrl} onChange={(e) => setProfilePictureUrl(e.target.value)} />
        </label>
        <label>
          Bio:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
