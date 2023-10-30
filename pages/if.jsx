import React, { useState } from 'react';
export default function IF() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState([{ number: '' }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem('formData', JSON.stringify(formData));
      setIsSubmitted(true);
    }
  };

  // const handleInputChange = (e) => {
  //   console.log([e.target.name], e.target.value )
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleInputChange = (e) => {
    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addPhoneNumberField = () => {
    setPhoneNumbers([...phoneNumbers, { number: '' }]);
  };

  const handlePhoneChange = (index, value) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index].number = value;
    setPhoneNumbers(newPhoneNumbers);
  };

  const handleRealTimeValidation = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: validateField(e.target.name, e.target.value),
    });
  };

  const validateField = (name, value) => {
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value))
      return 'Email is invalid.';
    if (!value)
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    return null;
  };

  const validate = (data) => {
    let errors = {};

    if (!data.name) errors.name = 'Name is required.';
    if (!data.email) errors.email = 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email is invalid.';
    if (!data.message) errors.message = 'Message is required.';

    return errors;
  };

  return (
    <div className='min-h-screen bg-gray-100 p-2'>
      <h1>IF</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            className='border border-gray-600 rounded w-2/6'
            type='text'
            value={formData.name}
            name='name'
            // onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            // Add this to each input field
            onChange={(e) => {
              handleInputChange(e);
              handleRealTimeValidation(e);
            }}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Phone Numbers:</label>
          {phoneNumbers.map((phone, index) => (
            <input
              key={index}
              type='tel'
              value={phone.number}
              onChange={(e) => handlePhoneChange(index, e.target.value)}
            />
          ))}
          <button onClick={addPhoneNumberField}>
            Add another phone number
          </button>
        </div>

        <div>
          <label>Email:</label>
          <input
            className='border border-gray-600 rounded w-2/6'
            type='email'
            name='email'
            value={formData.email}
            // onChange={(e) =>
            //   setFormData({ ...formData, email: e.target.value })
            // }
            onChange={(e) => {
              handleInputChange(e);
              handleRealTimeValidation(e);
            }}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>Message:</label>
          <textarea
            className='border border-gray-600 rounded w-2/6'
            value={formData.message}
            // onChange={(e) =>
            //   setFormData({ ...formData, message: e.target.value })
            // }
            name='message'
            onChange={(e) => {
              handleInputChange(e);
              handleRealTimeValidation(e);
            }}
          />
          {errors.message && <p>{errors.message}</p>}
        </div>

        <button type='submit'>Submit</button>
      </form>

      {isSubmitted && <p>Thank you for submitting the form!</p>}
    </div>
  );
}
