import React, { useState, useEffect, useRef } from 'react';
import { useUserContext } from '../common/UserProvider';
import { apiUrl } from '../../services/ApplicantAPIService';
import axios from 'axios';
import $ from 'jquery';
import ScheduleInterviewPopup from './ScheduleInterviewPopup';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
 
function RecruiterAllApplicants() {
  const [applicants, setApplicants] = useState([]);
  const { user } = useUserContext();
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedMenuOption, setSelectedMenuOption] = useState('All');
  const isMounted = useRef(true);
  const [search, setSearch] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const tableref=useRef(null);
  const fetchAllApplicants = async () => {
    try {
      const response = await axios.get(`${apiUrl}/applyjob/recruiter/${user.id}/appliedapplicants`);
    const applicantsArray = Object.values(response.data).flat();
        setApplicants(applicantsArray);
        const $table= window.$(tableref.current);
          const timeoutId = setTimeout(() => {  
           $table.DataTable().destroy();
            $table.DataTable({responsive:true});
                  }, 500);
         return () => {
            isMounted.current = false;
         };
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };
 
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    }
    fetchAllApplicants();
  }, [user.id]);
    const handleSelectChange = async (e) => {
      const newStatus = e.target.value;
      try {
        if (selectedApplicant && newStatus) {
          const applyJobId = selectedApplicant.applyjobid;
          const response = await axios.put(
            `${apiUrl}/applyjob/recruiters/applyjob-update-status/${applyJobId}/${newStatus}`
          );
          if (isMounted.current) {
            const updatedApplicants = applicants.map((application) => {
              if (application.applyjobid === applyJobId) {
                return { ...application, applicantStatus: newStatus };
              }
              return application;
            });
            setApplicants(updatedApplicants);
            setSelectedStatus(newStatus);
            setSelectedApplicant(null);
          }
          alert(`Status changed to ${newStatus}`);
          window.location.reload();
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };

    const exportCSV = () => {
      // Extracting headers from the table, excluding the "Schedule Interview" column
      const headers = Array.from(tableref.current.querySelectorAll('thead th')).map(th => th.textContent);
      const scheduleInterviewIndex = headers.indexOf('Schedule Interview');
      if (scheduleInterviewIndex !== -1) {
        headers.splice(scheduleInterviewIndex, 1); // Remove the "Schedule Interview" header
      }
    
      // Extracting data rows from the table, excluding the "Schedule Interview" column
      const data = Array.from(tableref.current.querySelectorAll('tbody tr')).map(tr => {
        const rowData = Array.from(tr.children).map(td => td.textContent);
        rowData.splice(scheduleInterviewIndex, 1); // Remove the "Schedule Interview" column
        return rowData;
      });
    
      // Adding headers to the data
      data.unshift(headers);
    
      // Creating CSV content
      const csvContent = data.map(row => row.join(',')).join('\n');
    
      // Creating a Blob and creating an anchor element to trigger the download
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'applicants.csv';
    
      // Triggering the download
      link.click();
    };

 return (
      <div className="dashboard__content">
        <section className="page-title-dashboard">
          <div className="themes-container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="title-dashboard">
                  <div className="title-dash flex2">All Applicants</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flat-dashboard-setting bg-white">
          <div className="themes-container">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="dropdown-container">
                <select value={selectedStatus} onChange={handleSelectChange}>
            <option value="" disabled>
              Change Status
            </option>
            <option value="Screening">Screening</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Selected">Selected</option>
            <option value="selected">All the applicants</option>
          </select>
                </div>
              </div>
              <div className="col-lg-8 col-md-4 d-flex justify-content-md-end">
              <button onClick={exportCSV} className="export-csv-button">
                Export CSV
              </button>
            </div>
            </div>
          </div>
        </section>
 
        <section className="flat-dashboard-setting bg-white">
          <div className="themes-container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="profile-setting">
                <div className="table-container-wrapper">
                  <div className="table-container">
                  {Array.isArray(applicants) && applicants.length === 0 ? (
   
                          <p>No Applicants are available.</p>
                        ) : (
                    <table ref={tableref} className="responsive-table">
                      <thead>
                        <tr>
                          <th></th>
                          {/* <th >Verify </th> */}
                  
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile Number</th>
                          <th>Job Title</th>
                          <th>Applicant Status</th>
                          <th>Schedule Interview</th>
                          <th>Experience</th>
                          <th>Skill Name</th>
                          <th>Qualification</th>
                          <th>Location</th>
                        </tr>
                      </thead>
                      <tbody>
                      {Array.isArray(applicants) && applicants.map((application) => (
                          <tr key={application.email}>
                            <td>
                              <input
                                type="radio"
                                value={application.applyjobid}
                                checked={
                                  selectedApplicant &&
                                  selectedApplicant.applyjobid === application.applyjobid
                                }
                                onChange={() => setSelectedApplicant(application)}
                                name={`applicantRadio-${application.applyjobid}`}
                              />
                            </td>
                            {/* <td><Link to={`/viewapplicant/${application.id}`} >View applicant</Link></td> */}
                            {/* <td>
  <Link to={`/viewapplicant/${application.id}`} style={{ color: '#ff0000', textDecoration: 'none' }}>
    View applicant
  </Link>
</td> */}
<td>
  <Link to={`/viewapplicant/${application.id}`} style={{ color: '#0583D2', textDecoration: 'none' }}>
    {application.name}
  </Link>
</td>

                            <td>
                            <Link to={`/viewapplicant/${application.id}`} style={{ color: '#0583D2', textDecoration: 'none' }}>
                            {application.email}
  </Link>
  </td>
                        
                            
                            <td>
                            <Link to={`/viewapplicant/${application.id}`} style={{ color: '#0583D2', textDecoration: 'none' }}>
                            {application.mobilenumber}
  </Link>
                              </td>
                            <td>{application.jobTitle}</td>
                            <td>{application.applicantStatus}</td>
                            <td>
                                  <button
                                    onClick={() =>
                                      application.applicantStatus ===
                                      'Interviewing'
                                        ? setShowPopup(true)
                                        : null
                                    }
                                    style={{
                                      border: 'none',
                                      background: 'none',
                                      padding: '0',
                                      cursor:
                                        application.applicantStatus ===
                                        'Interviewing'
                                          ? 'pointer'
                                          : 'default',
                                      outline: 'none',
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      className="bi bi-clock"
                                      fill={
                                        application.applicantStatus ===
                                        'Interviewing'
                                          ? '#3498db' 
                                          : '#d3d3d3' 
                                      }
                                    >
                                      <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zM9 4a.5.5 0 0 1 1 0v4.5h3a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5V4z" />
                                      <path d="M7.5 15a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 1 0v5.5a.5.5 0 0 1-.5.5z" />
                                    </svg>
                                  </button>
                                  <ScheduleInterviewPopup
                                    show={showPopup}
                                    handleClose={() => setShowPopup(false)}
                                    applyjobid={application.applyjobid}
                                  />
                                </td>
                            <td>{application.minimumExperience}</td>
                            <td>{application.skillName}</td>
                            <td>{application.minimumQualification}</td>
                            <td>{application.location}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                        )}
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  export default RecruiterAllApplicants;