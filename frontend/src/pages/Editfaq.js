import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Editfaq.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faUserEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
const Editfaq = () => {
  const [questions, setQuestions]                 = useState([]);
  const [newQuestion, setNewQuestion]             = useState({ question: '', answer: '' });
  const [selectedQuestion, setSelectedQuestion]   = useState(null);
  const [currentPage, setCurrentPage]             = useState(1);
  const [questionsPerPage]                        = useState(3);
  const [isEditing, setIsEditing]                 = useState(false);
  const [searchQuery, setSearchQuery]             = useState('');
  const [selectedLanguage, setSelectedLanguage]   = useState('en'); // Default language is English ('en')


  useEffect(() => {
    fetchQuestions();
  }, [selectedLanguage]); // Trigger fetchQuestions when selectedLanguage changes

  const fetchQuestions = async () => {
    try {
      const response                              = await axios.get(`http://192.168.8.141:4000/api/${selectedLanguage === 'en' ? 'FAQ' : selectedLanguage === 'si' ? 'SiFAQ' : 'TaFAQ'}`);
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setCurrentPage(1); // Reset current page when language is changed
  };
  

  const handleQuestionChange = (event) => {
    setNewQuestion({ ...newQuestion, question     : event.target.value });
  };

  const handleAnswerChange = (event) => {
    setNewQuestion({ ...newQuestion, answer       : event.target.value });
  };

  const handleAddQuestion = async () => {
    try {
      await axios.post(`http://192.168.8.141:4000/api/${selectedLanguage === 'en' ? 'FAQ' : selectedLanguage === 'si' ? 'SiFAQ' : 'TaFAQ'}`, newQuestion);
      setNewQuestion({ question                   : '', answer: '' });
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      const confirmDelete                         = window.confirm('Are you sure you want to delete this question?');
      if (confirmDelete) {
        await axios.delete(`http://192.168.8.141:4000/api/${selectedLanguage === 'en' ? 'FAQ' : selectedLanguage === 'si' ? 'SiFAQ' : 'TaFAQ'}/${id}`);
        fetchQuestions();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateQuestion = async (id) => {
    try {
      await axios.put(`http://192.168.8.141:4000/api/${selectedLanguage === 'en' ? 'FAQ' : selectedLanguage === 'si' ? 'SiFAQ' : 'TaFAQ'}/${id}`, newQuestion);
      setSelectedQuestion(null);
      setNewQuestion({ question                   : '', answer: '' });
      setIsEditing(false);
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setIsEditing(true);
    setNewQuestion({ question                     : question.question, answer: question.answer });
  };

  const handleCancelEdit = () => {
    setSelectedQuestion(null);
    setIsEditing(false);
    setNewQuestion({ question                     : '', answer: '' }); // Reset newQuestion state
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredQuestions                         = questions.filter((question) =>
    question.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastQuestion                       = currentPage * questionsPerPage;
  const indexOfFirstQuestion                      = indexOfLastQuestion - questionsPerPage;
  const currentQuestions                          = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className                                = 'Editfaq-body'>
      <div className                              = 'Editfaq-container'>
      
      
     <div className                               = 'Editfaq-form'>
     <div className                               = 'Editfaq-search'>
  <input
    type                                          = 'text'
    value                                         = {searchQuery}
    onChange                                      = {handleSearchChange}
    placeholder                                   = 'Search by question'
    className                                     = 'Editfaq-search-input'
    style                                         = {{ width: '400px' }} // Adjust the width value as needed
  />
</div>

  <h2>Add/Edit Question</h2>
  <div className                                  = 'Editfaq-edit-question'>
    {selectedQuestion && (
      <>
        <label htmlFor                            = 'edit-question-input'>Question:</label>
        <textarea
          id                                      = 'edit-question-input'
          value                                   = {newQuestion.question}
          onChange                                = {handleQuestionChange}
          placeholder                             = 'Question'
          className                               = 'Editfaq-question-input'
          rows                                    = {4} // Adjust the number of rows here
        />
        <label htmlFor                            = 'edit-answer-input'>Answer:</label>
        <textarea
          id                                      = 'edit-answer-input'
          value                                   = {newQuestion.answer}
          onChange                                = {handleAnswerChange}
          placeholder                             = 'Answer'
          className                               = 'Editfaq-answer-input'
          rows                                    = {6} // Adjust the number of rows here
        />
        {isEditing ? (
          <>
            <button onClick                       = {() => handleUpdateQuestion(selectedQuestion._id)} className='Editfaq-update-button'>
              Update
            </button>
            <button onClick                       = {handleCancelEdit} className='Editfaq-cancel-button'>
              Cancel
            </button>
          </>
        )                                         : (
          <button disabled className              = 'Editfaq-update-button'>
            Update
          </button>
        )}
      </>
    )}
  </div>
  {!isEditing && (
    <>
      <textarea
        value                                     = {newQuestion.question}
        onChange                                  = {handleQuestionChange}
        placeholder                               = 'Question'
        className                                 = 'Editfaq-question-input'
        rows                                      = {4} // Adjust the number of rows here
      />
      <textarea
        value                                     = {newQuestion.answer}
        onChange                                  = {handleAnswerChange}
        placeholder                               = 'Answer'
        className                                 = 'Editfaq-answer-input'
        rows                                      = {6} // Adjust the number of rows here
      />
      <button onClick                             = {handleAddQuestion} className='Editfaq-add-button'>
      <FontAwesomeIcon icon                       = {faUserEdit} className='Editfaq-icon' beat/>
        Add Question
      </button>
    </>
  )}

<div className                          = 'Editfaq-pagination'>
  <button onClick                                 = {prevPage} disabled={currentPage === 1} className='Editfaq-pagination-button'>
    Previous
  </button>
  {Array.from({ length                            : Math.ceil(filteredQuestions.length / questionsPerPage) }, (_, index) => (
    <button
      key                                         = {index}
      onClick                                     = {() => paginate(index + 1)}
      className                                   = {`Editfaq-pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
    >
      {index + 1}
    </button>
  ))}
  <button
    onClick                                       = {nextPage}
    disabled                                      = {currentPage === Math.ceil(filteredQuestions.length / questionsPerPage)}
    className                                     = 'Editfaq-pagination-button'
  >
    Next
  </button>
</div>
</div>



        <div className                            = 'Editfaq-questions'>
          {currentQuestions.map((question) => (
            <div key                              = {question._id} className='Editfaq-question-container'>
              <h4>Question                        : </h4><h3>{question.question}</h3>
              <h5>Answer                          : </h5><p> {question.answer}</p>
              <button onClick                     = {() => handleEditQuestion(question)} className='Editfaq-edit-button'>
              <FontAwesomeIcon icon               = {faUserEdit} className='Editfaq-icon' beat />
                Edit
              </button>
              <button onClick                     = {() => handleDeleteQuestion(question._id)} className='Editfaq-delete-button'>
              <FontAwesomeIcon icon               = {faTrash} className='Editfaq-icon' flip/>
                Delete
              </button>
            </div>
          ))}
          

        </div>
        <div className                            = 'Editfaq-language'>
      <button onClick                             = {() => handleLanguageSelect('en')} className={`Editfaq-language-button ${selectedLanguage === 'en' ? 'active' : ''}`}>
  English
</button>
<button onClick                                   = {() => handleLanguageSelect('si')} className={`Editfaq-language-button ${selectedLanguage === 'si' ? 'active' : ''}`}>
සිංහල
</button>
<button onClick                                   = {() => handleLanguageSelect('ta')} className={`Editfaq-language-button ${selectedLanguage === 'ta' ? 'active' : ''}`}>
தமிழ்
</button>
</div>
      </div>
    </div>
  );
};

export default Editfaq;
