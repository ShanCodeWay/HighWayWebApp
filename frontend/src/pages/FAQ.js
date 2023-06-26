import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import './css/FAQ.css';
import ImageSlider from '../Data/component/ImageSlider';



const FAQ = () => {
  const [dateTime, setDateTime]                   = useState(new Date());
  const [selectedQuestion, setSelectedQuestion]   = useState(null);
  const [searchQuery, setSearchQuery]             = useState('');
  const [questions, setQuestions]                 = useState([]);
  const [currentPage, setCurrentPage]             = useState(1);
  const [selectedLanguage, setSelectedLanguage]   = useState('en');

  const faqimages = [
    require('../assets/images/FAQphoto/highwaybus.jpg'),
    require('../assets/images/FAQphoto/highway bus.jpg'),
    require('../assets/images/FAQphoto/highwaybus1.JPG'),
    require('../assets/images/FAQphoto/highwaybusctb.JPG'),
    require('../assets/images/FAQphoto/images.jfif'),
    require('../assets/images/FAQphoto/makumbura.jpg'),
    require('../assets/images/FAQphoto/slider2.jpg'),
    require('../assets/images/FAQphoto/z_p06-Road-05.jpg'),
    require('../assets/images/FAQphoto/bus-on-map-with-location-pins.png'),
    require('../assets/images/FAQphoto/bus-stations-map-with-red-push-pin-in-front-of-big-white-coach-tour-bus-on-a-white-background-3d-rendering-2C4YFPM.jpg'),
   
  ];
  



  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setCurrentPage(1); // Reset current page when language is changed
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [selectedLanguage]); 

  const fetchQuestions = async () => {
    try {
      const response                              = await axios.get(`http://192.168.8.141:4000/api/${selectedLanguage === 'en' ? 'FAQ' : selectedLanguage === 'si' ? 'SiFAQ' : 'TaFAQ'}`);
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const formatDate = (date) => {
    const options                                 = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options                                 = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleTimeString(undefined, options);
  };

  const toggleQuestion = (questionId) => {
    setSelectedQuestion((prevQuestion) => (prevQuestion === questionId ? null : questionId));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredQuestions                         = questions.filter((q) =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className                              = "faq-body">
       

        <div className                            = "faq-container">

<div className                                    = "faq-language">
            <button onClick                       = {() => handleLanguageSelect('en')} className={`faq-language-button ${selectedLanguage === 'en' ? 'active' : ''}`}>
      English
    </button>
    <button onClick                               = {() => handleLanguageSelect('si')} className={`faq-language-button ${selectedLanguage === 'si' ? 'active' : ''}`}>
    සිංහල
    </button>
    <button onClick                               = {() => handleLanguageSelect('ta')} className={`faq-language-button ${selectedLanguage === 'ta' ? 'active' : ''}`}>
    தமிழ்
    </button>
</div>
            
            <ul>
              {filteredQuestions.map((q) => (
                <li key                           = {q._id} className={selectedQuestion === q._id ? 'faq-active' : ''}>
                  <div className                  = "faq-question-header" onClick={() => toggleQuestion(q._id)}>
                    <span className               = "bullet-icon">
                      {selectedQuestion === q._id ? (
                        <FaMinus className        = "faq-icon" />
                      )                           : (
                        <FaPlus className         = "faq-icon" />
                      )}
                    </span>
                    <span className               = "faq-question-text">{q.question}</span>
                  </div>
                  <div className                  = {`faq-answer-container ${selectedQuestion === q._id ? 'open' : ''}`}>
                    <p>{q.answer}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className                        = "faq-pagination-numbers">
      
 </div>

      <div className                              = "faq-pagination-buttons">
        <button
          className                               = "faq-pagination-button"
          disabled                                = {currentPage === 1}
          
        >
          Previous
        </button>
        <div className                            = "faq-current-page">
          
        </div>
        <button
          className                               = "faq-pagination-button"
          disabled                                = {currentPage === questions.length}
         
        >
          Next
        </button>
      </div>
          
            <div className                        = "faq-right">
              <div className                      = "faq-datetime-container">
                <span className                   = "faq-date-text">{formatDate(dateTime)}</span>
                <span className                   = "faq-time-text">{formatTime(dateTime)}</span>
              </div>
              <div className                      = "faq-search-container">
          <input
            className                             = "faq-search-input"
            type                                  = "text"
            placeholder                           = "Search questions..."
            value                                 = {searchQuery}
            onChange                              = {handleSearch}
            style                                 = {{ width: '400px' }}
          />
          <div className                          = "faq-search-icon">
            <FaSearch />
          </div>
        </div>
            
        <div className                            = "faq-image">
                  <ImageSlider images             = {faqimages} width="100%" height="100%" border-radius="50px" />
                
                  </div>


            </div>
         
        </div>
        
      </div>
    </>
  );
};

export default FAQ;
