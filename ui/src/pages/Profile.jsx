import React from 'react';
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { selectUser } from'../store/index';
import Navbar from '../components/Navbar';
import { signOut} from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import Payment from '../components/Payment';


const ProfileScreen = () => {
  const user = useSelector(selectUser);

  return (
    <Container>
      <div className='profileScreen'>
        <Navbar />
        <div className='profileScreen-body'>
          <h1>Edit Profile</h1>
          <div className='profileScreen-info'>
            <img 
              src='https://avatars.githubusercontent.com/u/110757279?v=4' 
              alt='avatar' 
            />
            <div className='profileScreen-details'>
              <h2>{user.email}</h2>
              <div className='profileScreen-plans'>
                <Payment />
                {/* Plans */}
                <button 
                className='profileScreen-signOut' 
                onClick={() => signOut(firebaseAuth)}>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
.profileScreen {
    height: 100vh;
    color: white;
    margin-top: 100px;
    
}

.profileScreen-body {
  position: fixed;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 8%;
    max-width: 100%;
    align-items: center;
    justify-content: center;
}

.profileScreen-body > h1 {
    font-size: 40px;
    font-weight: 400;
    border-bottom: 1px solid #282c2d;
    margin-bottom: 20px;
}

.profileScreen-info {
    display: flex;
}

.profileScreen-info > img {
    height: 100px;
    border-radius: 50%;
}

.profileScreen-details {
    color: white;
    margin-left: 25px;
    flex: 1;
}

.profileScreen-details >h2 {
    background-color: grey;
    padding: 15px;
    font-size: 15px;
    padding-left: 20px;
    border-radius: 3px;
}

.profileScreen-plans {
    margin-top: 20px;
}

.price-button {
    width: 50px;
    height: 30px;
    justify-content: right;
}

.profileScreen-plans > pre {
    border-bottom: 1px solid #282c2d;
    padding-bottom: 10px;
    font-size: 15px;
}

.profileScreen-signOut {
    padding: 10px 20px;
    font-size: 1rem;
    margin-top: 5%;
    width: 100%;
    color: #fff;
    background-color: #e50914;
    cursor: pointer;
    border: none;
    border-radius: 3px;
}
`;

export default ProfileScreen;