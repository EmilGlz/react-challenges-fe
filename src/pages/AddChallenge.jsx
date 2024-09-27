import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addChallenge } from '../apis/challenges';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const AddChallenge = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [cookie, setCookie] = useCookies('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookie.jwt)
      navigate('/')
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addChallengeApi()

    setTitle('');
    setDescription('');
    setStartTime('');
    setEndTime('');
  };

  const addChallengeApi = async () => {
    const [result, error] = await addChallenge(cookie.jwt, {
      title: title,
      description: description,
      start_time: startTime,
      end_time: endTime
    })
    handleResponse([result, error])
  }

  const handleResponse = async ([response, error]) => {
    if (error) {
      setErrors({
        ...errors,
        api: error
      })
    }
    else {
      const result = await response.json();
      navigate('/')
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Challenge</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <ReactQuill theme='snow' value={description} onChange={setDescription} />
          {/* <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          /> */}
        </div>
        <div className="mb-4">
          <label htmlFor="starttime" className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            id="starttime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endtime" className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="datetime-local"
            id="endtime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Add Challenge
        </button>
      </form>
    </div>
  );
};

export default AddChallenge;
