import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApplicantAPIService, { apiUrl } from '../../services/ApplicantAPIService';
import { useUserContext } from '../common/UserProvider';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Recruiterviewapplicant.css';


const Recruiterviewapplicant = () =>{
  const [profileData, setProfileData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertShown, setAlertShown] = useState(false);
  const { user } = useUserContext();
  const { id } = useParams();

 
  
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
        profileResponse = await axios.get(`${apiUrl}/applicantprofile/${id}/profile-view1`);
        setProfileData(profileResponse.data);
        count = 1;
        const imageResponse = await axios.get(`${apiUrl}/applicant-image/getphoto1/${id}`, { responseType: 'arraybuffer' });
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
        //   window.location.href = '/applicant-update-profile';
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
                {/* <div className="title-dash flex2">Overview</div> */}
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
                    <img
                      width="130px"
                      height="40px"
                      src={imageSrc || '../images/user/avatar/profile-pic.png'}
                      alt="Profile"
                      onError={() => setImageSrc('../images/user/avatar/profile-pic.png')}
                    />
                  </div>
                  <div className="content">
                    <h5 style={{color: '#000', fontFamily: 'Inter', fontSize: '24px', fontStyle: 'normal', fontWeight: 700, lineHeight: 'normal'}} className="fw-6 color-3">
                      {profileData.applicant.name}
                    </h5>
                  </div>
                </div>
                <div className="tt-button">
                  {/* <Link to="/applicant-edit-profile">Edit Profile</Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flat-dashboard-overview flat-dashboard-about">
        <div className="themes-container">
          <div className="row">
            <div className="col-lg-10 col-md-10 ">
              <div className="wrap-about flex">
                <div className="side-bar">
                <div className="sidebar-map bg-white" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '20px',width: '100%',marginLeft: '20px',borderRadius: '10px',maxHeight: '400px', overflowY: 'auto',height:'80vh' }}>{/*sidebar-map bg-white*/}
                <h3 className="" style={{ marginTop: '-10px',marginLeft:'7px',marginBottom:'5px' ,marginBottom:'10px',color: '#1F76DC', fontFamily: 'Inter', fontSize: '24px', fontStyle: 'normal', fontWeight: 700, lineHeight: 'normal'}}>Personal Details</h3>
                <div>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
  <div style={{ fontSize: '18px', fontFamily: 'Inter', padding: 'px', marginLeft: '8px', color: '#767676', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', marginBottom: '-5px' }} className="p-16 bold-text">Email</div>
  <div style={{ fontStyle: 'normal', fontWeight: '500', lineHeight: 'normal', fontFamily: 'Inter', color: 'black', fontSize: '20px', marginLeft: '82px', fontWeight: 'bold', marginBottom: '15px' }} className="small-text">
    {profileData.applicant.email}
  </div>
</div>

<div style={{ display: 'flex', alignItems: 'baseline' }}>
  <div style={{ fontSize: '18px', fontFamily: 'Inter', padding: 'px', marginLeft: '10px', color: '#767676', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', marginBottom: '-3px' }} className="p-16 bold-text">Location</div>
  <div style={{ fontStyle: 'normal', fontWeight: '500', lineHeight: 'normal', fontFamily: 'Inter', color: 'black', fontSize: '20px', marginLeft: '60px', fontWeight: 'bold', marginBottom: '15px' }} className="small-text">
    {profileData.basicDetails.city}, {profileData.basicDetails.state}
  </div>
</div>


  <div style={{ display: 'flex', alignItems: 'baseline' }}>
  <div style={{ fontSize: '18px', fontFamily: 'Inter', padding: 'px', marginLeft: '10px', color: '#767676', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', marginBottom: '1px' }} className="p-16 bold-text">Mobile Number</div>
  <div style={{ fontStyle: 'normal', fontWeight: '500', lineHeight: 'normal', fontFamily: 'Inter', color: 'black', fontSize: '20px', marginLeft: '10px', fontWeight: 'bold', marginBottom: '15px' }} className="small-text">
    {profileData.applicant.mobilenumber}
  </div>
</div>


<div style={{ display: 'flex', alignItems: 'baseline' }}>
  <div style={{ fontSize: '18px', fontFamily: 'Inter', padding: 'px', marginLeft: '10px', color: '#767676', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', marginBottom: '-1px' }} className="p-16 bold-text">Qualification</div>
  <div style={{ fontStyle: 'normal', fontWeight: '500', lineHeight: 'normal', fontFamily: 'Inter', color: 'black', fontSize: '20px', marginLeft: '30px', fontWeight: 'bold', marginBottom: '15px' }} className="small-text">
    {profileData.graduationDetails.gprogram}
  </div>
</div>


  <div style={{ fontSize: '18px', fontFamily: 'Inter', padding: 'px', marginLeft: '10px',color: '#767676',fontstyle:'normal',fontweight: '400',lineheight: 'normal',marginBottom: '-1px'  }} className="p-16 bold-text">Skills</div>
  <div style={{ fontStyle: 'normal', fontWeight: '500', lineHeight: 'normal', fontFamily: 'Inter', color: 'black', fontSize: '20px', marginLeft: 'px', fontWeight: 'bold', marginBottom: '15px' }} className="small-text">
  {profileData.skillsRequired.map((skill, index) => (
    <div key={skill.id}>&nbsp;&bull;&nbsp;
      <span>
        <a href="#">{skill.skillName}</a>
      </span>
      {index < profileData.skillsRequired.length - 1 && <span></span>}
    </div>
  ))}
</div>

</div>
</div>
                </div>
                <div className="post-about widget-dash-video bg-white">
                <div className="sidebar-map bg-white" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '20px',width: '160%',marginLeft: '20px',height:'70vh',marginTop:'-25px',borderRadius: '10px',maxHeight: '400px', overflowY: 'auto',marginRight:'10px' }}>{/*sidebar-map bg-white*/}
                  <h3 className="" style={{ marginTop: '-10px',marginLeft:'0px',marginBottom:'5px' ,marginBottom:'10px',color: '#1F76DC', fontFamily: 'Inter', fontSize: '24px', fontStyle: 'normal', fontWeight: 700, lineHeight: 'normal'}}>Education Details</h3>
                  <div className="">
                    <div className="">
                      <h4 className="small-text1">
                        <span></span>
                        <h4 style={{color: '#020202', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 700, lineHeight: '100%',marginBottom:'10px'}}> Graduation</h4>
                      </h4>
                      <div style={{ marginLeft: '0px' }}>
                      <table style={{ marginLeft: '20px', fontFamily: 'inherit', fontSize: '18px', color: 'grey' }}>
  <tr>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#7C7C7C', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%'}}>Qualification</td>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}><b>{profileData.intermediateDetails.iboard}</b></td>
  </tr>
  <tr>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#7C7C7C', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}>Branch</td>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}><b>{profileData.intermediateDetails.iprogram}</b></td>
  </tr>
  <tr>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#7C7C7C', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}>Percentage</td>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}><b>{profileData.intermediateDetails.ipercentage}</b></td>
  </tr>
  <tr>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#7C7C7C', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}>Year of Passing</td>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}><b>{profileData.intermediateDetails.iyearOfPassing}</b></td>
  </tr>
</table>

</div>
                      <h4 className="fw-7">
                      
                        <h4 style={{color: '#020202', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 700, lineHeight: '100%',marginTop:'15px',marginBottom:'10px'}}> Intermediate </h4>
                      </h4>
                      <table style={{ marginLeft: '20px', fontFamily: 'inherit', fontSize: '18px', color: 'grey' }}>
  <tr>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#7C7C7C', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}>Board</td>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}><b>{profileData.intermediateDetails.iboard}</b></td>
  </tr>
  <tr>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#7C7C7C', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}>Branch</td>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}><b>{profileData.intermediateDetails.iprogram}</b></td>
  </tr>
  <tr>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#7C7C7C', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}>Percentage</td>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}><b>{profileData.intermediateDetails.ipercentage}</b></td>
  </tr>
  <tr>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#7C7C7C', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}>Year of Passing</td>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}><b>{profileData.intermediateDetails.iyearOfPassing}</b></td>
  </tr>
</table>

                      <h4 className="fw-7">
                    
                        <h4 style={{color: '#020202', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 700, lineHeight: '100%',marginTop:'15px',marginBottom:'10px'}}> SSC </h4>
                      </h4>
                      <table style={{ marginLeft: '20px', fontFamily: 'inherit', fontSize: '18px', color: 'grey' }}>
  <tr>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#7C7C7C', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}>Board</td>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%'}}>
      
    <div style={{ marginRight: '18px' }}>
    <b>{profileData.xClassDetails.xboard}</b>
  </div>
      
      </td>
  </tr>
  <tr>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#7C7C7C', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}>Percentage</td>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}><b>{profileData.xClassDetails.xpercentage}</b></td>
  </tr>
  <tr>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#7C7C7C', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}>Year of Passing</td>
    <td style={{ padding: '5px 0 5px', marginBottom: '5px',color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}><b>{profileData.xClassDetails.xyearOfPassing}</b></td>
  </tr>
</table>
                    </div>
                    
                  </div>
                  
                </div>
                
                </div>
                <section className="flat-dashboard-overview flat-dashboard-about">
        <div className="themes-container" style={{marginRight:'150px', marginTop: '-20px'}}>
          <div className="row">
            <div className="col-lg-10 col-md-10 ">
              <div className="wrap-about flex">
                <div className="side-bar">
                  <div className="sidebar-map bg-white" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '20px', width: '100%',borderRadius: '10px',maxHeight: '400px', overflowY: 'auto',height:'100vh',marginLeft:'220px'}}>{/*sidebar-map bg-white*/}
                    <h3 className="" style={{marginTop: '-10px',marginLeft:'7px',marginBottom:'5px' ,marginBottom:'10px',color: '#1F76DC', fontFamily: 'Inter', fontSize: '24px', fontStyle: 'normal', fontWeight: 700, lineHeight: 'normal' }}>Experience</h3>
                    <div style={{ fontFamily: 'inherit', padding: '5px', marginLeft: '5px',color: 'grey' }} className="small-text">
                    <div>
                      {profileData.experienceDetails.map((experience, index) => (
                    <div key={index} style={{ marginBottom: 'px', borderBottom: 'px ', paddingBottom: 'px' }}>
                    {/* <td style={{ padding: '5px 0 5px', marginBottom: '5px', color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%' }}>
  <div style={{ display: 'inline-block', marginRight: '10px', color: '#000' }}>Company:</div>
  <b style={{ display: 'inline-block' }}>{experience.company}</b>
</td> */}

<div style={{ display: 'flex', alignItems: 'center' }}>
  <span style={{ marginRight: '10px' }}>Company</span>
  <td style={{ padding: '5px 0 5px', marginBottom: '-1px', color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%',marginLeft:'75px' }}>
    <b>{experience.company}</b>
  </td>
</div>



<div style={{ display: 'flex', alignItems: 'center' }}>
  <span style={{ marginRight: '10px' }}>Position</span>
  <td style={{ padding: '5px 0 5px', marginBottom: '-1px', color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%',marginLeft:'88px' }}>
    <b>{experience.position}</b>
  </td>
</div>

<div style={{ display: 'flex', alignItems: 'center' }}>
  <span style={{ marginRight: '10px' }}>Start Date</span>
  <td style={{ padding: '5px 0 5px', marginBottom: '-1px', color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%',marginLeft:'75px' }}>
    <b>{experience.startDate}</b>
  </td>
</div>

<div style={{ display: 'flex', alignItems: 'center' }}>
  <span style={{ marginRight: '10px' }}>End Date</span>
  <td style={{ padding: '5px 0 5px', marginBottom: '-1px', color: '#000', fontFamily: 'Inter', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: '100%',marginLeft:'80px' }}>
    <b>{experience.endDate}</b>
  </td>
</div>

                    </div>
                     ))}
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
              {/* Experience field */}


            </div>
            
          </div>
        </div>
      </section>
      
      


{/* Close button */}
      <div
        style={{
          position: 'fixed',
          top: '45px',
          right: '45px',
          padding: '10px 20px',
          backgroundColor: '#3498db',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        <Link to="/recruiter-allapplicants" style={{ color: '#fff', textDecoration: 'none' }}>
          Close
        </Link>
      </div>
    </div>
  );
}; 
export default Recruiterviewapplicant;
