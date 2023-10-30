const ContactCard = ({ info }) => {
  console.log(info, 'uiqdiquwdg');
  return (
    <div className='p-4 w-2/3 bg-white rounded border border-gray-700 shadow-md mt-2'>
      <h2 className='text-xl font-bold mb-4'>Contact Info</h2>
      <p>
        <strong>Name:</strong> {info.name}
      </p>
      <p>
        <strong>Phone:</strong> {info.phone}
      </p>
      <p>
        <strong>Email:</strong> {info.email}
      </p>
    </div>
  );
};

export default ContactCard;
