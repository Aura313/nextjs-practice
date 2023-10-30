// components/PolicyCard.js

const PolicyCard = ({ title, details }) => {
    console.log(details, "detailsdetailsdetails")
  return (
    <div className='p-4 w-2/3 bg-white rounded shadow-md mt-2'>
      <h2 className='text-xl font-bold mb-4'>{title}</h2>
      <div>
        <p>
          <strong>Premiums:</strong> ${details.premiums}
        </p>
        <p>
          <strong>Coverages:</strong> {details.coverages}
        </p>
        <p>
          <strong>Limits:</strong> {details.limits}
        </p>
        <p>
          <strong>Deductibles:</strong> ${details.deductibles}
        </p>
      </div>
    </div>
  );
};

export default PolicyCard;
