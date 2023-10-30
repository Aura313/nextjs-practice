// lib/api.ts

// pages/api/api.ts

export default function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).end(); // Method Not Allowed
      return;
    }
  
    const { address } = req.body;
  
    if (!address) {
      res.status(400).json({ error: 'Address is required' }); // Bad Request
      return;
    }
  
    // Simulate a delay, like a real API call
    setTimeout(() => {
      if (address === '123 Main St') {
        res.status(200).json({
          owner: 'John Doe',
          coverage: '$500,000',
          premium: '$1,200/year',
        });
      } else {
        res.status(404).json({ error: 'No insurance data found for the provided address.' }); // Not Found
      }
    }, 2000);
  }
  

// export const verifyInsurance = async (address) => {
//   // Simulating an API call with a 2-second delay
//   await new Promise((resolve) => setTimeout(resolve, 2000));

//   if (address === '123 Main St') {
//     return {
//       status: 'success',
//       data: {
//         owner: 'John Doe',
//         coverage: '$500,000',
//         premium: '$1,200/year',
//       },
//     };
//   } else {
//     return {
//       status: 'error',
//       message: 'No insurance data found for the provided address.',
//     };
//   }
// };
