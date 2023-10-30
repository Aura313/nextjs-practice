import React, { useState, useEffect } from 'react';

export default function Policy() {
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetcData = async () =>
      await fetch('/api/policyData')
        .then((res) => res.json())
        .then((data) => {
          console.log(data, 'dqjkhwdqwhui');
          setPolicyData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Fetch error: ', err.message);
          setError(err.message);
          setLoading(false);
        });

    fetcData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(policyData, 'hquidwdhiuqwhui');
  return (
    <div className='min-h-screen bg-gray-100'>
      <h1>Policy</h1>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead>
          <tr>
            <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Line
            </th>
            <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Premium
            </th>
            <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Coverage
            </th>
            <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Limit
            </th>
            <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Deductible
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {Object.keys(policyData).map((line) => (
            <tr key={line}>
              <td className='px-6 py-4 whitespace-nowrap'>{line}</td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {policyData[line].premium}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {policyData[line].coverage}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {policyData[line].limit}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {policyData[line].deductible}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
