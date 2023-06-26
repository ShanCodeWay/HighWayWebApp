import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import './css/log.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHome, faComments, faList, faBars, faTimes, faAngleDown, faAngleUp, faTrashAlt,faExclamationTriangle ,faSync} from '@fortawesome/free-solid-svg-icons';
import logoImage from '../assets/images/logo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faAddressBook,faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';















function Log() {
  const [complaints, setComplaints]                             = useState([]);
  const [searchQuery, setSearchQuery]                           = useState('');
  const [searchName, setSearchName]                             = useState('');
  const [refreshing, setRefreshing]                             = useState(false);
  
  const [loading, setLoading]                                   = useState(false);
  const [dateTime, setDateTime]                                 = useState(new Date());
  const [sorted, setSorted]                                     = useState(false);
  const [complaintValues, setComplaintValues]                   = useState({});
  const [currentPage, setCurrentPage]                           = useState(1);
  const complaintsPerPage                                       = 3;
  const indexOfLastComplaint                                    = currentPage * complaintsPerPage;
  const indexOfFirstComplaint                                   = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints                                       = complaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

  const [isDrawerOpen, setIsDrawerOpen]                         = useState(false);
  const totalPages                                              = Math.ceil(complaints.length / complaintsPerPage);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen]           = useState(false);

  const inputRef                                                = useRef(null);
  const [focusedComplaintId, setFocusedComplaintId]             = useState(null);
  const [filteredComplaints, setFilteredComplaints]             = useState([]);
  const [searchId, setSearchId]                                 = useState('');
  const [expandedComplaints, setExpandedComplaints]             = useState({});
  const [showAlert, setShowAlert]                               = useState(false);
  const [cachedData, setCachedData]                             = useState(null);
  const [checkboxValues, setCheckboxValues]                     = useState({});








  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatDate = (date) => {
    const options                                               = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options                                               = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleTimeString(undefined, options);
  };

  const handleProfileDrawerClick = () => {
    setIsProfileDrawerOpen(!isProfileDrawerOpen);
  };

  const handleOutsideClick = (event) => {
    if (
      isDrawerOpen &&
      !event.target.classList.contains('icon') &&
      !event.target.closest('.drawer-menu') &&
      !event.target.closest('.navbar')
    ) {
      setIsDrawerOpen(false);
    }
  };

  const fetchData = () => {
    if (searchQuery) {
      axios
        .get(`http://192.168.8.141:4000/api/log?key=${searchQuery}&collection=log`)
        .then((response) => {
          const data                                            = response.data;
          setComplaints([data]);
          setFilteredComplaints([data]);
        })
        .catch((error) => console.error(error));
    } else {
      const queryParams = new URLSearchParams({
        page                                                    : currentPage,
        limit                                                   : complaintsPerPage,
        collection                                              : 'log',
      });
  
      fetch(`http://192.168.8.141:4000/api/log?${queryParams}`, {
        headers: {
          'Content-Type'                                        : 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Update checkbox values state
          const newCheckboxValues                               = {};
          data.forEach((complaint) => {
            newCheckboxValues[complaint.key]                    = complaint.checkbox;
          });
          setCheckboxValues(newCheckboxValues);
  
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setComplaints(data);
          setFilteredComplaints(data);
        })
        .catch((error) => console.error(error));
    }
  };
  

  const handleRefresh = () => {
    setLoading(true);
    setRefreshing(true);
    axios
      .get(`http://192.168.8.141:4000/api/log?key=${searchQuery}&collection=log`)
      .then((response) => {
        const data                                              = response.data;
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComplaints(data);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setRefreshing(false);
      });
  };
  
  
  const handleInputChange = async (e, key) => {
    const { value }                                             = e.target;
  
    console.log('Input value:', value);
  
    setComplaintValues((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        text                                                    : value,
      },
    }));
  
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint.key === key ? { ...complaint, text: value } : complaint
      )
    );
  
    try {
      await axios.put(`http://192.168.8.141:4000/api/log/${key}`, {
        checkbox                                                : complaintValues[key]?.checkbox || false,
        text                                                    : value,
      });
  
      const updatedComplaints = complaints.map((complaint) => {
        if (complaint.key === key) {
          return {
            ...complaint,
            checkbox                                            : complaintValues[key]?.checkbox || false,
            text                                                : value,
          };
        }
        return complaint;
      });
      setComplaints(updatedComplaints);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, complaintsPerPage, searchQuery]);
  
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);
  
  useEffect(() => {
    handleRefresh();
  }, [refreshing]);
  
  useEffect(() => {
    const filteredData                                          = complaints.filter((complaint) =>
  complaint.key && complaint.key.toLowerCase().includes(searchQuery && searchQuery.toLowerCase())
);
setFilteredComplaints(filteredData);

  }, [searchQuery, complaints]);

  
  


  const handleDelete = (key) => {
    if (window.confirm('Are you sure you want to delete this log?')) {
      fetch(`http://192.168.8.141:4000/api/log/${key}?collection=log`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
          setComplaints(complaints.filter(complaint => complaint.key !== key));
          window.alert('Log deleted successfully');
        })
        .catch(error => console.error(error));
    }
  };
  
  
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response                                          = await axios.get('http://192.168.8.141:4000/api/log?collection=log');
  
        const data                                              = response.data;
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
        setComplaints(data);
        setFilteredComplaints(data);
        setCachedData(data); // Cache the fetched data
        setLoading(false);
        setRefreshing(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setRefreshing(false);
      }
    };
  
    if (cachedData === null || refreshing) {
      fetchData(); // Fetch the data if it's not cached or refreshing
    } else {
      setComplaints(cachedData); // Use the cached data
      setFilteredComplaints(cachedData);
      setLoading(false);
      setRefreshing(false);
    }
  }, [refreshing]);
  
  const handleSearch = () => {
    axios
      .get(`http://192.168.8.141:4000/api/log?key=${searchQuery}&collection=log`)
      .then((response) => {
        const data                                              = response.data;
        setComplaints(data);
        setFilteredComplaints(data);
      })
      .catch((error) => console.error(error));
  };
  
  
  
  

  const handleCheckboxChange = async (e, key) => {
    const { checked }                                           = e.target;
  
    setComplaintValues((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        checkbox                                                : checked,
      },
    }));
  
    try {
      // Update the complaint.checkbox value in the backend
      await axios.put(`http://192.168.8.141:4000/api/log/${key}`, {
        checkbox                                                : checked,
        // other complaint values
      });
  
      // Update the complaint.checkbox value in the local state
      const updatedComplaints = complaints.map((complaint) => {
        if (complaint.key === key) {
          return {
            ...complaint,
            checkbox                                            : checked,
            // other complaint values
          };
        }
        return complaint;
      });
      setComplaints(updatedComplaints);
    } catch (error) {
      console.error(error);
    }
  };
  



const nextPage = () => {
  if (currentPage < Math.ceil(complaints.length / complaintsPerPage)) {
    setCurrentPage(currentPage + 1);
  }
};

const prevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

const renderPageNumbers = () => {
  const pageNumbers                                             = [];
  const maxPageNumbers                                          = 5;
  const totalPages                                              = Math.ceil(complaints.length / complaintsPerPage);

  let startPage                                                 = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage                                                   = Math.min(startPage + maxPageNumbers - 1, totalPages);

  if (totalPages >= maxPageNumbers) {
    if (endPage === totalPages) {
      startPage                                                 = Math.max(endPage - maxPageNumbers + 1, 1);
    } else if (startPage === 1) {
      endPage                                                   = Math.min(startPage + maxPageNumbers - 1, totalPages);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <button
        key                                                     = {i}
        onClick                                                 = {() => goToPage(i)}
        className                                               = {`log-pagination-button ${currentPage === i ? 'active' : ''}`}
      >
        {i}
      </button>
    );
  }

  return pageNumbers;
};

const goToPage = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const toggleComplaint = (complaintId) => {
  setExpandedComplaints((prevState) => {
    const newState                                              = { ...prevState };
    for (const key in newState) {
      if (key !== complaintId) {
        newState[key]                                           = false;
      }
    }
    newState[complaintId]                                       = !prevState[complaintId];
    return newState;
  });
};





  
  return (
   <div>
     
      <div className                                            = "log-container">

     

      <div className                                            = "log-middle-column">


        <main className                                         = "log-main-column">

        
       

        <div className                                          = "log-container-container">
          
          {currentComplaints.map((complaint) => (
  <div key                                                      = {complaint.key} className={`log ${expandedComplaints[complaint.key] ? 'open' : ''}`} >


<div className                                                  = "log-checkbox-container">
  <label className                                              = "log-checkbox-label">
    <p>Job Done                                                 : </p>
    <input
  style                                                         = {{ display: 'none' }}
            type                                                = "checkbox"
            name                                                = {`checkbox_${complaint.key}`}
            checked                                             = {complaintValues[complaint.key]?.checkbox || false}
            onChange                                            = {(e) => handleCheckboxChange(e, complaint.key)}
          />

    <span className                                             = "log-custom-checkbox">
      {complaintValues[complaint.key]?.checkbox && (
        <FontAwesomeIcon icon                                   = {faCheckSquare} className="log-checkbox-icon"  />
      )}
    </span>
  </label>
</div>
                <h3>ID                                          : {complaint.key}</h3>
                <h3>Name                                        : {complaint.name}</h3>

                {expandedComplaints[complaint.key] && (
  <>
                              
                              
                              <p>Complaint                      : {complaint.complain}</p>
                              <p>Email                          : {complaint.email}</p>
                              <p>Complaint Type                 : {complaint.complainType}</p>
                              <p>Created on                     : {complaint.createdAt}</p>
                              <p>Image                          : {complaint.image}</p>
                              <p>Note                           : {complaint.note}</p>
                              <p> checkbox                      : {complaintValues[complaint.key]?.checkbox ? 'Checked' : 'Unchecked'}</p>
                             
                    
                   
                    <div className                              = "log-input-container">
                     
                      <input
                        ref                                     = {inputRef} // Assign the ref to the input element
                        style                                   = {{ padding: '10px', margin: '15px', width: '250px' }}
                        type                                    = "text"
                        name                                    = {`input_${complaint.key}`}
                        placeholder                             = "Add note"
                        value                                   = {complaintValues[complaint.key]?.text || ''}
                        onChange                                = {(e) => handleInputChange(e, complaint.key)}
                        className                               = 'log-input'
                      />
                      <button className                         = 'log-submit-button'>Submit</button>
                    </div>
                            
                    
               
                   
                  </>
                )}

              



               
                          <div className                        = "log-actions">
                          <button className                     = "log-delete-button" onClick={() => handleDelete(complaint.key)}>
                              <FontAwesomeIcon icon             = {faTrashAlt} className="log-delete-icon" flip /> Delete
                            </button>

                    <button onClick                             = {() => toggleComplaint(complaint.key)} className='log-more-button'>
                      {expandedComplaints[complaint.key] ? (
                          <>
                            Hide.. <FontAwesomeIcon icon        = {faAngleUp} className="log-arrow-icon" beat />
                          </>
                        )                                       : (
                          <>
                            Click more <FontAwesomeIcon icon    = {faAngleDown} className="log-arrow-icon" onClick={() => toggleComplaint(complaint.key)} beat  />
                          </>
                        )}
                      </button>
                 
                </div>
                            
                </div>

                            
                
              
            ))}
            </div>
          </main>
          
          </div>
        <div className                                          = 'log-refresh'>
        <button onClick                                         = {handleRefresh}>
                <FontAwesomeIcon
                  icon                                          = {faSync}
                  className                                     = {refreshing ? 'spin' : ''}
                />
                Refresh
              </button>
              </div>
        <div className                                          = "log-right-column">
        
        <div className                                          = "log-datetime-container">
                  <span className                               = "log-date-text">{formatDate(dateTime)}</span>
                  <span className                               = "log-time-text">{formatTime(dateTime)}</span>
                </div>
        
                <div className                                  = "log-search-container">
          
                                <input 
                                className                       = 'log-search-input'
                          type                                  = "text"
                          placeholder                           = "Search by ID"
                          value                                 = {searchQuery}
                          onChange                              = {(e) =>  setSearchQuery(e.target.value)}
                          
                        />


                      <button className                         = "log-search-button"  onClick={handleSearch}>

                      <FontAwesomeIcon icon                     = {faSearch} beat />
                          
                      
                      _Search by ID
                      </button>
                      </div>

<div className                                                  = "log-search-container">
 
<input
  type                                                          = "text"
  placeholder                                                   = "Search by Name"
  value                                                         = {searchName}
  onChange                                                      = {(e) => setSearchName(e.target.value)}
  className                                                     = 'log-search-input'
/>
  <button className                                             = "log-search-button" >
  <FontAwesomeIcon icon                                         = {faSearch} beat />
     _Search by Name
    
  </button>
  
</div>

<button className                                               = "log-sort-button" >
          Sort by ID {sorted ? <span>&#9650;</span> : <span>&#9660;</span>}
        </button>
        

      
      </div>
       



      <div className                                            = "log-pagination">
        <button
          onClick                                               = {prevPage}
          disabled                                              = {currentPage === 1}
          className                                             = "log-pagination-button"
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick                                               = {nextPage}
          disabled                                              = {currentPage === totalPages}
          className                                             = "log-pagination-button"
        >
          Next
        </button>



      </div>

</div>


</div>

  
);

  
  
  
  
  
  }
  
  
  export default Log;
  