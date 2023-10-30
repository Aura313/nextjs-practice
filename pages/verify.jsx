import React, { useEffect, useState } from 'react';

export default function Verify() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const verifyInsurance = async (address) => {
    try {
      let data = {
        address: address,
      };

      const response = await fetch('/api/insurance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const responseData = await response.json();
      console.log(responseData, '1892');
      return responseData;
    } catch (error) {
      console.error('API error:', error.message);
      setResult(null)
      setError(error.message);
    }
  };

  //   useEffect(() => {
  //     verifyInsurance();
  //   },[address])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const response = await verifyInsurance(address);
    setLoading(false);

    console.log(response, 'handls');

    if (response) {
      setResult(response); // uncomment and set your state appropriately
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h1 className='text-2xl font-bold mb-4 text-gray-600'>
          Insurance Verification
        </h1>
        {error && (
          <div className='mt-4 p-4 bg-red-100 border-l-4 border-red-500'>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>
              Property Address
            </label>
            <input
              type='text'
              className='w-full p-2 border rounded text-gray-600'
              placeholder='123 Main St'
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='w-full p-2 bg-blue-500 text-white rounded'
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        {result && (
          <div className='mt-4 p-4 bg-green-100 border-l-4 border-green-500'>
            <h2 className='text-lg font-bold'>Insurance Details:</h2>
            <p>Owner: {result.owner}</p>
            <p>Coverage: {result.coverage}</p>
            <p>Premium: {result.premium}</p>
          </div>
        )}
      </div>
    </div>
  );
}
