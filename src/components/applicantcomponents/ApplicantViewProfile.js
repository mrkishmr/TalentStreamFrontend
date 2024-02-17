import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApplicantAPIService, { apiUrl } from '../../services/ApplicantAPIService';
import { useUserContext } from '../common/UserProvider';
import { Link } from 'react-router-dom';
const ApplicantViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertShown, setAlertShown] = useState(false);
  const { user } = useUserContext();
  const id = user.id;
  
  const checkAndShowAlert = (message) => {
    const alertShownBefore = localStorage.getItem('alertShown');

    if (!alertShownBefore && !loading) {
      const userResponse = window.confirm(message);
      if (userResponse) {
        localStorage.setItem('alertShown', 'true');
        setAlertShown(true);
      }
    }
  };
  useEffect(() => {
    let count = 0;
    let profileResponse = null;
    let isMounted = true;
  
    const fetchData = async () => {
      try {
        profileResponse = await axios.get(`${apiUrl}/applicantprofile/${id}/profile-view`);
        setProfileData(profileResponse.data);
        count = 1;
        const imageResponse = await axios.get(`${apiUrl}/applicant-image/getphoto/${id}`, { responseType: 'arraybuffer' });
        const base64Image = btoa(
          new Uint8Array(imageResponse.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        setImageSrc(`data:${imageResponse.headers['content-type']};base64,${base64Image}`);
  
        setLoading(false);
        
      } catch (error) {
        setLoading(false);
        if (count === 0 && isMounted) {
          window.alert('Profile not found. Please fill in your profile');
          window.location.href = '/applicant-update-profile';
        }
        
      }
    };
  
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [user]);  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!profileData ||  alertShown) {
    return (
      <div>
        {(!profileData ) && <p>Please fill in your bio data and upload a profile pic.</p>}
        {alertShown && <p>Alert already shown.</p>}
      </div>
    );
  }
 
  return (
    <div className="dashboard__content">
  <section className="page-title-dashboard">
    <div className="themes-container">
      <div className="row">
        <div className="col-lg-12 col-md-12 ">
          <div className="title-dashboard">
            <div className="title-dash flex2">Overview</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="flat-dashboard-user flat-dashboard-profile">
    <div className="themes-container">
      <div className="row">
        <div className="col-lg-12 col-md-12 ">
          <div className="wrap-profile flex2 bg-white">
            <div className="box-profile flex2">
              <div className="images">
                {/* <img src={imageSrc} alt="" width="130px" height="40px"/> */}

                <img width="130px" height="40px" src={imageSrc || '../images/user/avatar/profile-pic.png'} alt="Profile" onError={() => setImageSrc('../images/user/avatar/profile-pic.png')} />
              </div>
              <div className="content">
                <h5 style={{ fontSize: '24px' }} className="fw-6 color-3 ">{profileData.applicant.name}</h5>
               
              </div>
            </div>
            <div className="tt-button">
            <Link to="/applicant-edit-profile">Edit Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="flat-dashboard-overview flat-dashboard-about">
    <div className="themes-container">
      <div className="row">
        <div className="col-lg-12 col-md-12 ">
          <div className="wrap-about flex">
            <div className="side-bar">
              <div className="sidebar-map bg-white">
              <div className="title-box flex">
                  <div className="p-16">Email</div>
                  <h4>{profileData.applicant.email} </h4>
                </div>
                 <div className="title-box flex">
                  <div className="p-16">Location</div>
                  <h4>{profileData.basicDetails.city} ,{profileData.basicDetails.state}</h4>
                </div>
                <div className="title-box flex">
                  <div className="p-16">Mobile Number</div>
                  <h4>{profileData.applicant.mobilenumber} </h4>
                </div>
                {/* <div className="title-box flex">
                  <div className="p-16">Experience time</div>
                  <h4>2</h4>
                </div> */}
                               
                <div className="title-box flex">
                  <div className="p-16">Qualification</div>
                  <h4> {profileData.graduationDetails.gprogram}</h4>
                </div>      
                <div className="title-box flex">
                <div className="p-16">Skills</div>
                <h4>
    {profileData.skillsRequired.map((skill, index) => (
      <React.Fragment key={skill.id}>
        <span>
          <a href="#">
            <ul className="job-tag">
              <li>{skill.skillName}</li>
            </ul>
          </a>
        </span>
        {index < profileData.skillsRequired.length - 1 && ", "}
      </React.Fragment>
    ))}
  </h4>
                  </div>     
              </div>
           
            </div>
            <div className="post-about widget-dash-video bg-white">
                <h3 class="title-education">Education</h3>
                <div class="education-wrap">
                  <div class="education-box">
                    <h4 class="fw-7"><h4 style={{fontWeight:'bold',color:'#1967d2'}}> Graducation:</h4></h4>
                    <div style={{marginLeft:'20px'}}>
                    <div className="subtitle-1 fw-7">University: {profileData.graduationDetails.gboard}</div>
                    <div className="subtitle-1 fw-7">Branch: {profileData.graduationDetails.gprogram}</div>
                   
                    <div className="subtitle-2 fw-7 fw-5">Percentage: {profileData.graduationDetails.gpercentage}</div>
                    <div className="subtitle-2 fw-7 fw-5">Year of Passing: {profileData.graduationDetails.gyearOfPassing}</div>
                  </div>
                  <h4 class="fw-7"><h4 style={{fontWeight:'bold',color:'#1967d2'}}> Intermediate Details:</h4></h4>
                    <div style={{marginLeft:'20px'}}>
                    <div className="subtitle-1 fw-7">Board: {profileData.intermediateDetails.iboard} </div>
                    <div className="subtitle-1 fw-7">Branch: {profileData.intermediateDetails.iprogram} </div>
                    <div className="subtitle-1 fw-7">Percentage: {profileData.intermediateDetails.ipercentage} </div>
                    <div className="subtitle-1 fw-7">Year of Passing: {profileData.intermediateDetails.iyearOfPassing} </div>
                  </div>
                  <h4 class="fw-7"><h4 style={{fontWeight:'bold',color:'#1967d2'}}> SSC Details:</h4></h4>
                    <div style={{marginLeft:'20px'}}>
                    <div className="subtitle-1 fw-7">Board: {profileData.xClassDetails.xboard} </div>
                    <div className="subtitle-1 fw-7">Branch: SSC/CBSE/ICSE {profileData.xClassDetails.xprogram} </div>
                    <div className="subtitle-1 fw-7">Percentage: {profileData.xClassDetails.xpercentage} </div>
                    <div className="subtitle-1 fw-7">Year of Passing: {profileData.xClassDetails.xyearOfPassing} </div>
                  </div>
                  </div>
                </div>
         </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
  ); 
}; 
export default ApplicantViewProfile;
