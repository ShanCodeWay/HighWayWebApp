import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Editfaq.css';


const Editfaq = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://192.168.8.141:4000/api/FAQ');
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionChange = (event) => {
    setNewQuestion({ ...newQuestion, question: event.target.value });
  };

  const handleAnswerChange = (event) => {
    setNewQuestion({ ...newQuestion, answer: event.target.value });
  };

  const handleAddQuestion = async () => {
    try {
      await axios.post('http://192.168.8.141:4000/api/FAQ', newQuestion);
      setNewQuestion({ question: '', answer: '' });
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await axios.delete(`http://192.168.8.141:4000/api/FAQ'/${id}`);
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateQuestion = async (id) => {
    try {
      await axios.put(`http://192.168.8.141:4000/api/FAQ'/${id}`, newQuestion);
      setNewQuestion({ question: '', answer: '' });
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='Editfaq-container'>
    <div>
      <h2>Add/Edit Question</h2>
      <input
        type="text"
        value={newQuestion.question}
        onChange={handleQuestionChange}
        placeholder="Question"
      />
      <input
        type="text"
        value={newQuestion.answer}
        onChange={handleAnswerChange}
        placeholder="Answer"
      />
      <button onClick={handleAddQuestion}>Add Question</button>

      <h2>Existing Questions</h2>
      {questions.map((question) => (
        <div key={question._id}>
          <h3>Question: {question.question}</h3>
          <p>Answer: {question.answer}</p>
          <button onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
          <button onClick={() => handleUpdateQuestion(question._id)}>Update</button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Editfaq;
