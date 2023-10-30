const policyData = {
  home: {
    premium: '$1000',
    coverage: '$200000',
    limit: '$5000',
    deductible: '$500',
  },
  auto: {
    premium: '$500',
    coverage: '$150000',
    limit: '$3000',
    deductible: '$250',
  },
  commercial: {
    premium: '$1500',
    coverage: '$500000',
    limit: '$10000',
    deductible: '$750',
  },
};

export default function handler(req, res) {
  setTimeout(() => {
    res.status(200).json(policyData);
  }, 500);
}
