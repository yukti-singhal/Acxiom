import React, { useState, useEffect } from 'react';
import { addMembership, updateMembership, getMemberships } from '../../services/api';

const AddUpdateMembership = () => {
  const [memberships, setMemberships] = useState([]);
  const [membership, setMembership] = useState({ type: '', maxBooks: '', duration: '', fineRate: '' });

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    const fetchedMemberships = await getMemberships();
    setMemberships(fetchedMemberships);
  };

  const handleChange = (e) => {
    setMembership({ ...membership, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (membership._id) {
      await updateMembership(membership._id, membership);
    } else {
      await addMembership(membership);
    }
    fetchMemberships();
    setMembership({ type: '', maxBooks: '', duration: '', fineRate: '' });
  };

  return (
    <div>
      <h3>Add/Update Membership</h3>
      <form onSubmit={handleSubmit}>
        <input name="type" value={membership.type} onChange={handleChange} placeholder="Membership Type" required />
        <input name="maxBooks" type="number" value={membership.maxBooks} onChange={handleChange} placeholder="Max Books" required />
        <input name="duration" type="number" value={membership.duration} onChange={handleChange} placeholder="Duration (days)" required />
        <input name="fineRate" type="number" value={membership.fineRate} onChange={handleChange} placeholder="Fine Rate (per day)" required />
        <button type="submit">{membership._id ? 'Update' : 'Add'} Membership</button>
      </form>
      <ul>
        {memberships.map(m => (
          <li key={m._id} onClick={() => setMembership(m)}>
            {m.type} - Max Books: {m.maxBooks}, Duration: {m.duration} days, Fine Rate: ${m.fineRate}/day
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddUpdateMembership;