import React, { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
 
const skillsOptions = [
  'JavaScript',
  'React',
  'Node.js',
  'HTML',
  'CSS',
  'Java',
  'Python',
  // Add more technical skills as needed
];
 
const yearsOptions = Array.from({ length: 16 }, (_, i) => i); // 0 to 10
 
const qualificationsOptions = [
  'B.Tech',
  'MCA',
  'BCA',
  'BSC-Computer',
  'Degree',
  'Others',
];
 
const passingYearsOptions = Array.from({ length: 16 }, (_, i) => 2015 + i); // 2015 to 2030
 
const ApplicantBasicDetails = () => {
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [qualification, setQualification] = useState('');
  const [passingYear, setPassingYear] = useState('');
  const [resume, setResume] = useState(null);
  const[fullName, setFullName]=useState(null);
  const[mobileNumber, setMobileNumber]=useState(null);
  const[email,setEmail]=useState(null);
   const [phone, setPhone] = useState('');
   const [specialization, setSpecialization] = useState('');
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [cityError, setCityError] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillsError, setSkillsError] = useState('');
 
  const [errors, setErrors] = useState({});
 
  const validateForm = () => {
    const newErrors = {};
 
    if (!experience) {
      newErrors.experience = 'Experience is required';
    }
 
    if (skills.length === 0) {
      newErrors.skills = 'Skills are required';
    }
 
    if (!city) {
      newErrors.city = 'City is required';
    }
 
    if (!state) {
      newErrors.state = 'State is required';
    }
 
    if (!qualification) {
      newErrors.qualification = 'Qualification is required';
    }
    if (!fullName) {
        newErrors.fullName = 'Full Name is required';
      }
   
      // Validating Mobile Number (Assuming a 10-digit mobile number)
      if (!mobileNumber) {
        newErrors.mobileNumber = 'Mobile Number is required';
      } else if (!/^\d{10}$/.test(mobileNumber)) {
        newErrors.mobileNumber = 'Mobile Number must be a 10-digit number';
      }
    if (!passingYear) {
      newErrors.passingYear = 'Year of passing is required';
    }
    if (!specialization) {
        newErrors.specialization = 'Specialization is required';
      }
      

    setErrors(newErrors);
 
    return Object.keys(newErrors).length === 0;
  };
 
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (validateForm()) {
      // Perform form submission logic here
      console.log({
        experience,
        skills,
        city,
        state,
        qualification,
        passingYear,
        resume,
        specialization
      });
    }
  };

  const customStyles = {
    // Add your custom styles here
    container: {
      width: '300px',
      // Add more container styles as needed
    },
    input: {
        fontStyle: 'unset',
        background: 'linear-gradient(0deg, #f5f5f5, #f5f5f5), linear-gradient(0deg, #e5e5e5, #e5e5e5)',
        padding: '0 15px',
        color: '#000',
        border: '1px solid #e5e5e5',
        fontSize: '16px',
        transition: 'all 0.3s ease-in-out'
    },
    // Add more styles for other elements if needed
  };

  const handleQualificationChange = (e) => {
    const selectedQualification = e.target.value;
    setQualification(selectedQualification);
    setSpecialization(''); // Reset specialization when qualification changes
  };

  const handleCityChange = (selected) => {
    setSelectedCities(selected);
    if (selected.length > 0) {
      setCityError('');
    } else {
      setCityError('Please select at least one city.');
    }
  };

  const specializationsByQualification = {
    'B.Tech': ['CSE', 'IT', 'ECE', 'EEE','Mech','Civil'],
    'MCA': ['Specialization1', 'Specialization2'],
    
  };
  const andhraPradeshCities = [
    'Visakhapatnam',
    'Vijayawada',
    'Guntur',
    'Nellore',
    'Kurnool',
    'Rajahmundry',
    'Tirupati',
    'Kakinada',
    'Anantapur',
    'Kadapa',
  ];
  
  // Cities in Telangana
  const telanganaCities = [
    'Hyderabad',
    'Warangal',
    'Nizamabad',
    'Khammam',
    'Karimnagar',
    'Ramagundam',
    'Mahbubnagar',
    'Nalgonda',
    'Adilabad',
    'Suryapet',
  ];
  
  // Cities in Karnataka
  const karnatakaCities = [
    'Bangalore',
    'Hubballi-Dharwad',
    'Mysuru',
    'Gulbarga',
    'Belgaum',
    'Davanagere',
    'Bellary',
    'Mangalore',
    'Shimoga',
    'Tumkur',
  ];
  
  // Combine all cities
  const cities = [
    ...andhraPradeshCities,
    ...telanganaCities,
    ...karnatakaCities,
  ];

  const handleSkillsChange = (selected) => {
    setSelectedSkills(selected);
    if (selected.length > 0) {
      setSkillsError('');
    } else {
      setSkillsError('Please select at least one skill.');
    }
  };

  // Assuming skillsOptions is an array of skill names
  const skillsOptions = ['Java', 'Python', 'C', 'C++'];

  return (
    <div>
       <div className="dashboard__content">
  <section className="page-title-dashboard">
    <div className="themes-container">
      <div className="row">
        <div className="col-lg-12 col-md-12 ">
          <div className="title-dashboard">
            <div className="title-dash flex2">Application Form</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="flat-dashboard-post flat-dashboard-setting">
  <form onSubmit={handleSubmit}>
    <div className="themes-container">
      <div className="row">
        <div className="col-lg-12 col-md-12 ">
          <div className="post-new profile-setting bg-white">
 
            <div className="row">
            <div className="col-lg-6 col-md-12">
                <div id="item_7" className="dropdown titles-dropdown info-wd">
                  {/* <label className="title-user fw-7">
                    Full Name<span className="color-red">*</span>
                  </label> */}
                  <input
                    type="text"
                    placeholder="*Full Name"
                    value={fullName}
                    className="input-form"
                    onChange={(e) => setFullName(e.target.value)}
                    style={{ color: fullName ? 'black' : 'lightgrey' }}
                    required
                  />
                  {errors.fullName && (
                    <div className="error-message">{errors.fullName}</div>
                  )}
                </div>
              </div>
 
              <div className="col-lg-6 col-md-12">
                <div id="item_8" className="dropdown titles-dropdown info-wd">
                  {/* <label className="title-user fw-7">
                    Email<span className="color-red">*</span>
                  </label> */}
                  <input
                    type="tel"
                    placeholder="*Email"
                    value={mobileNumber}
                    className="input-form"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    style={{ color: mobileNumber ? 'black' : 'lightgrey' }}
                    required
                  />
                  {errors.mobileNumber && (
                    <div className="error-message">{errors.mobileNumber}</div>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
      <div id="item_8" className="dropdown titles-dropdown info-wd">
        {/* <label className="title-user fw-7">
          WhatsApp Number<span className="color-red">*</span>
        </label> */}
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '10px' }}>
          <PhoneInput
         defaultCountry="ua"
        value={phone}
        onChange={(phone) => setPhone(phone)}
        style={customStyles}
      />
          </div>
          {/* <input
            type="tel"
            placeholder="WhatsApp"
            value={mobileNumber}
            className="input-form"
            onChange={(e) => setMobileNumber(e.target.value)}
            style={{ color: mobileNumber ? 'black' : 'lightgrey' }}
            required
          /> */}
        </div>
        {errors.mobileNumber && (
          <div className="error-message">{errors.mobileNumber}</div>
        )}
      </div>
    </div>
 
              <div className="col-lg-6 col-md-12">
              <div id="item_1" className="dropdown titles-dropdown info-wd">
                {/* <label className="title-user fw-7">
                  Total Experience in Years<span className="color-red">*</span>
                </label> */}
                <select
                  value={experience}
                  className="input-form"
                  onChange={(e) => setExperience(e.target.value)}
                  style={{ color: experience ? 'black' : 'lightgrey' }}
                  required
                >
                  <option value="" disabled>*Experience</option>
                  {yearsOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.experience && (
                  <div className="error-message">{errors.experience}</div>
                )}
              </div>

              </div>
              <div className="col-lg-6 col-md-12">
        <div id="item_4" className="dropdown titles-dropdown info-wd">
          <select
            value={qualification}
            className="input-form"
            onChange={handleQualificationChange}
            style={{ color: qualification ? 'black' : 'lightgrey' }}
            required
          >
            <option value="" disabled>*Qualification</option>
            {qualificationsOptions.map((qual) => (
              <option key={qual} value={qual}>
                {qual}
              </option>
            ))}
          </select>
          {errors.qualification && (
            <div className="error-message">{errors.qualification}</div>
          )}
        </div>
      </div>
      <div className="col-lg-6 col-md-12">
        <div id="item_4" className="dropdown titles-dropdown info-wd">
          <select
            value={specialization}
            className="input-form"
            onChange={(e) => setSpecialization(e.target.value)}
            style={{ color: specialization ? 'black' : 'lightgrey' }}
            required
            disabled={!qualification} // Disable if no qualification selected
          >
            <option value="" disabled>*Specialization</option>
            {specializationsByQualification[qualification]?.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          {errors.specialization && (
            <div className="error-message">{errors.specialization}</div>
          )}
        </div>
      </div>
 
      <div className="col-lg-6 col-md-12">
      <div id="item_3" className="dropdown titles-dropdown info-wd">
        <Typeahead
          id="cityTypeahead"
          labelKey="city"
          multiple
          placeholder="*City"
          options={cities.map(city => ({ city }))}
          onChange={handleCityChange}
          selected={selectedCities}
        />
        {errors.city && (
          <div className="error-message">{errors.city}</div>
        )}
      </div>
    </div>

    <div className="col-lg-6 col-md-12">
      <div id="item_2" className="dropdown titles-dropdown info-wd">
        <Typeahead
          id="skillsTypeahead"
          labelKey="skill"
          multiple
          placeholder="*Skills"
          options={skillsOptions.map(skill => ({ skill }))}
          onChange={handleSkillsChange}
          selected={selectedSkills}
        />
        {errors.skills && (
          <div className="error-message">{errors.skills}</div>
        )}
      </div>
    </div>
                            
              </div>
            <div className="form-infor flex flat-form">
              <div className="info-box info-wd">
             </div>
            </div>
            <div className="form-group">
                <button type="submit" onClick={handleSubmit} className='button-status'>Submit</button>
              </div>
          </div>
        </div>
      </div>
    </div>
    </form>
  </section>
</div>
</div>
  )
};
 
export default ApplicantBasicDetails;