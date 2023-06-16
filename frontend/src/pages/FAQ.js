import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaSearch } from 'react-icons/fa';
import { questions } from '../Data/details/questions';
import './css/FAQ.css';

const FAQ = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleTimeString(undefined, options);
  };

  const toggleQuestion = (questionId) => {
    setSelectedQuestion((prevQuestion) => (prevQuestion === questionId ? null : questionId));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    
    <>
  <div className="faq-body"> 
  <div className="faq-search-container">
     
     <input className='faq-search-input'
     
       type="text"
       placeholder="Search questions..."
       value={searchQuery}
       onChange={handleSearch}
     />

<div className="faq-search-icon">
     <FaSearch />
   </div>
   </div>
 
      <div className="faq-container">
 
 

     
      
        <div className="faq-middle">
          <h1>Frequently Asked Questions</h1>
          
          <ul>
            {filteredQuestions.map((q) => (
              <li key={q.id} className={selectedQuestion === q.id ? 'faq-active' : ''}>
                <div className="faq-question-header" onClick={() => toggleQuestion(q.id)}>
                  <span className="bullet-icon">
                    {selectedQuestion === q.id ? (
                      <FaMinus className="faq-icon" />
                    ) : (
                      <FaPlus className="faq-icon" />
                    )}
                  </span>
                  <span className="question-text">{q.question}</span>
                </div>
                <div className={`answer-container ${selectedQuestion === q.id ? 'open' : ''}`}>
                  <p>{q.answer}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="complaint-right">
            <div className="complaint-datetime-container">
              <span className="complaint-date-text">{formatDate(dateTime)}</span>
              <span className="complaint-time-text">{formatTime(dateTime)}</span>
            </div>
          </div>
        </div>
      </div>


     
      </div>
    </>
  );
};

export default FAQ;
