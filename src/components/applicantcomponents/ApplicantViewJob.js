import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logoCompany1 from '../../images/cty12.png';
import ApplicantAPIService, { apiUrl } from '../../services/ApplicantAPIService';
import { useUserContext } from '../common/UserProvider';
 
function ApplicantViewJob({ selectedJobId }) {
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const { user } = useUserContext();
  const applicantId = user.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 50));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
 
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/viewjob/applicant/viewjob/${selectedJobId}/${user.id}`);
        const {body} = response.data;
        setLoading(false);
        if (body) {
          setJobDetails(body);
          const appliedStatus = localStorage.getItem(`appliedStatus-${selectedJobId}`);
          if (appliedStatus) {
            setApplied(appliedStatus === 'true');
          }
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [selectedJobId]);
 
  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}/viewjob/applicant/viewjob/${selectedJobId}/${user.id}`);
      const {body} = response.data;
      setLoading(false);
      if (body) {
        setJobDetails(body);
        const appliedStatus = localStorage.getItem(`appliedStatus-${selectedJobId}`);
        if (appliedStatus) {
          setApplied(appliedStatus === 'true');
        }
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleApplyNow = async () => {
    try {
      setApplied(true);
      const response = await axios.post(`${apiUrl}/applyjob/applicants/applyjob/${applicantId}/${selectedJobId}`);
      const { applied } = response.data;
      window.alert('Job applied successfully');
      localStorage.setItem(`appliedStatus-${selectedJobId}`, 'true');
      setApplied(applied);
      fetchJobDetails();
    } catch (error) {
      console.error('Error applying for the job:', error);
      window.alert('Job has already been applied by the applicant');
      setApplied(false);
    }
  };
 function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  }
  return (
    <div>
      {loading ? null : (
        <div className="dashboard__content">
          <section className="page-title-dashboard">
            <div className="themes-container">
              <div className="row">
                <div className="col-lg-12 col-md-12 ">
                  <div className="title-dashboard">
                    <div className="title-dash flex2">Full Job Details</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="flat-dashboard-setting flat-dashboard-setting2">
            <div className="themes-container bg-white">
              <div className="content-tab">
                <div className="inner">
                  <br />
                  <article className="job-article">
                    {jobDetails && (
                      <div className="top-content">
                        <div className="features-job style-2 stc-apply">
                          <div className="job-archive-header">
                            <div className="inner-box">
                               <div className="logo-company">                             
                               {jobDetails.logoFile ? ( <img src={`data:image/png;base64,${jobDetails.logoFile}`} alt="Company Logo" /> ) 
                               : (<img src="images/logo-company/cty12.png" alt={`Default Company Logo`} /> )}
                            </div>
                              <div className="box-content">
                                <h4>
                                  <a href="#">{jobDetails.companyname}</a>
                                </h4>
                                <h3>
                                  <a href="#">{jobDetails.jobTitle}</a>
                                 
                                </h3>
                                <ul>
                                  <li>
                                    <span className="icon-map-pin"></span>
                                     &nbsp;{jobDetails.location}
                                  </li>
                                  <li>
                                    <span className="icon-calendar"></span>
                                    &nbsp;{formatDate(jobDetails.creationDate)}
                                  </li>
                                </ul>
                                <div className="button-readmore">
                                 
                                  {/* <a className="btn-apply btn-popup"> */}
           
  
  {/* <div style={{ display: 'flex', alignItems: 'center' }}>
  <button
    className={`btn-apply btn-popup ${applied ? 'applied' : ''}`}
    onClick={handleApplyNow}
    disabled={jobDetails.jobStatus === 'Already Applied'}
    style={{
      backgroundColor: jobDetails.jobStatus === 'Already Applied' ? 'green' : '',
      cursor: applied ? 'not-allowed' : 'pointer',height:'30px',
    }}
  >
    <span className="icon-send"></span>
    {jobDetails.jobStatus}
  </button>
  
  <a
    href="/applicant-find-jobs"
    className="btn-apply btn-popup"
    style={{
      display: 'inline-block',
      marginLeft: '10px',  // Added margin for spacing between buttons
      padding: '5px 20px',
      backgroundColor: '#1967d2',
      color: 'white', 
      textDecoration: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
    }}
  >
    Cancel
  </a>
</div> */}


                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="job-archive-footer">
                            <div className="job-footer-left">
                              <ul className="job-tag">
                                <li>
                                  <a href="#">{jobDetails.employeeType}</a>
                                </li>
                                <li>
                                  <a href="#">{jobDetails.remote ? 'Remote' : 'Office-based'}</a>
                                </li>
                              </ul>
                              <div className="star">
                                {Array.from({ length: jobDetails.starRating }).map((_, index) => (
                                  <span key={index} className="icon-star-full"></span>
                                ))}
                              </div>
                            </div>
                            <div className="job-footer-right">
                              <div className="price">
                                <span></span>Package :  &nbsp;
                                <p>&#x20B9; {jobDetails.minSalary} - &#x20B9; {jobDetails.maxSalary} / year</p>
                                
                              </div>
                              
                              <div className="button-readmore">
                              <div style={{ display: 'flex', alignItems: 'center' }}>
  <button
    className={`btn-apply btn-popup ${applied ? 'applied' : ''}`}
    onClick={handleApplyNow}
    disabled={jobDetails.jobStatus === 'Already Applied'}
    style={{
      backgroundColor: jobDetails.jobStatus === 'Already Applied' ? 'green' : '#1967d2',
      cursor:'pointer',height:'37px',color:'white',borderRadius:'10px',
    }}
  >
    <span className="icon-send"></span>&nbsp;
    
    {jobDetails.jobStatus === 'Already Applied' ? 'Applied' : 'Apply Now'}
  </button>
  
  <a
    href="/applicant-find-jobs"
    className="btn-apply btn-popup"
    style={{
      display: 'inline-block',
      marginLeft: '10px',  // Added margin for spacing between buttons
      padding: '5px 20px',
      backgroundColor: '#1967d2',
      color: 'white', 
      textDecoration: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight:'bold',
    }}
  >
    Cancel
  </a>
</div>
</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {jobDetails && (
                      <div className="inner-content">
                        <h5>Full Job Description</h5>
                        <p>{jobDetails.description}</p>
                      </div>
                    )}
                  </article>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
} 
export default ApplicantViewJob;