const mockData = {
  status: 'success',
  data: {
    personalPolicyDetails: {
      premiums: 2000,
      coverages: 'Full',
      limits: 'Up to $1,000,000',
      deductibles: 500,
    },
    commercialPolicyDetails: {
      premiums: 5000,
      coverages: 'Partial',
      limits: 'Up to $500,000',
      deductibles: 1000,
    },
    contactInfo: {
      name: 'John Doe',
      phone: '+1234567890',
      email: 'john@example.com',
    },
    // ... other data points as needed
  },
};

export default function handler(req, res) {
  setTimeout(() => {
    res.status(200).json(mockData);
  }, 500);
}
