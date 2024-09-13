import React, { useState, useEffect } from 'react';
import { addUser, updateUser, getUsers, getMemberships } from '../../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [user, setUser] = useState({ username: '', password: '', isAdmin: false, membershipType: '' });

  useEffect(() => {
    fetchUsers();
    fetchMemberships();
  }, []);

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers();
    setUsers(fetchedUsers);
  };

  const fetchMemberships = async () => {
    const fetchedMemberships = await getMemberships();
    setMemberships(fetchedMemberships);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const handleChange = (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            setUser({ ...user, [e.target.name]: value });
          };
        
          const handleSubmit = async (e) => {
            e.preventDefault();
            if (user._id) {
              await updateUser(user._id, user);
            } else {
              await addUser(user);
            }
            fetchUsers();
            setUser({ username: '', password: '', isAdmin: false, membershipType: '' });
          };
        }
          return (
            <div>
              <h3>User Management</h3>
              <form onSubmit={handleSubmit}>
                <input name="username" value={user.username} onChange={handleChange} placeholder="Username" required />
                {!user._id && <input name="password" type="password" value={user.password} onChange={handleChange} placeholder="Password" required />}
                <label>
                  <input name="isAdmin" type="checkbox" checked={user.isAdmin} onChange={handleChange} />
                  Is Admin
                </label>
                <select name="membershipType" value={user.membershipType} onChange={handleChange} required>
                  <option value="">Select Membership Type</option>
                  {memberships.map(m => (
                    <option key={m._id} value={m.type}>{m.type}</option>
                  ))}
                </select>
                <button type="submit">{user._id ? 'Update' : 'Add'} User</button>
              </form>
              <ul>
                {users.map(u => (
                  <li key={u._id} onClick={() => setUser(u)}>
                    {u.username} - {u.isAdmin ? 'Admin' : 'User'} - Membership: {u.membershipType}
                  </li>
                ))}
              </ul>
            </div>
          );
        };
        
        export default UserManagement;