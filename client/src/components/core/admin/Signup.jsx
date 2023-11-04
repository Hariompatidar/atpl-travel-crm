import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiConnector } from '../../../services/apiconnector';
import { endpoints } from '../../../services/apis';
import { signUp } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const { GET_ALL_DESTINATIONS_API } = endpoints;

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    number: '',
    destination: [],
  });
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [destinations, setDestinations] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);

  const { firstName, lastName, email, password, confirmPassword, role, number, destination } = formData;

  useEffect(() => {
    if (formData.role === 'executive') {
      apiConnector('GET', GET_ALL_DESTINATIONS_API)
        .then((response) => {
          setDestinations(response.data);
        })
        .catch((error) => {
          console.error('Error fetching destinations: ', error);
          toast.error('Error in fetching the destinations. Please reload the page.');
        });
    } else {
      setDestinations([{id:1,name:"Dubai"},{id:2,name:"Mumbai"}, {id:3,name:"Goa"}, {id:4,name:"Goghatpur"}, {id:5,name:"Bhopal"}]);
    }
  }, [formData.role]);

  const handleDestinationSelection = (selectedDestination) => {
    if (!selectedDestinations.includes(selectedDestination)) {
      setSelectedDestinations([...selectedDestinations, selectedDestination]);
      setFormData({
        ...formData,
        destination: [...formData.destination, selectedDestination],
      });
    }
  };

  const handleDestinationDeselection = (deselectedDestination) => {
    const updatedDestinations = selectedDestinations.filter(
      (destination) => destination !== deselectedDestination
    );
    setSelectedDestinations(updatedDestinations);

    setFormData({
      ...formData,
      destination: formData.destination.filter(
        (destination) => destination !== deselectedDestination
      ),
    });
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    await signUp(firstName, lastName, email, password, confirmPassword, role, number, destination, navigate);

    console.log("After comming back");
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      number: '',
      destination: [],
    });
  };

  return (
    <div className="min-h-screen flex p-10 items-center justify-center">
      <div className="blurcard p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-center">Add New Team Member</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              required
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleOnChange}
              className="inputbox w-full"
            />
            <input
              type="text"
              required
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleOnChange}
              className="inputbox w-full"
            />
          </div>
          <input
            type="email"
            required
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleOnChange}
            className="inputbox w-full"
          />
        <div className='relative'>
        <input
                required
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="inputbox w-full !pr-10"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[10px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
        </div>
             <div className='relative'>
             <input
                required
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="inputbox w-full !pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[10px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
             </div>
          <select
            value={formData.role}
            required
            name='role'
            onChange={handleOnChange}
            className="inputbox text-black w-full"
          >
            <option value="">Select Role</option>
            <option value="sales">Sales</option>
            <option value="operation">Operation</option>
            <option value="accounts">Account</option>
          </select>
          {formData.role === 'sales' && (
            <div className="space-y-2 mt-4">
              <label className="block">Select Destinations:</label>
              {destinations.map((destination) => (
                <div key={destination.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={destination.id}
                    onChange={() => handleDestinationSelection(destination.id)}
                  />
                  <span>{destination.name}</span>
                </div>
              ))}
            </div>
          )}
          {selectedDestinations.length > 0 && (
            <div className="space-y-2 mt-4">
              <label className="block">Selected Destinations:</label>
              {selectedDestinations.map((selectedDestination) => (
                <div key={selectedDestination} className="flex items-center space-x-2">
                  <span>{destinations.find((d) => d.id === selectedDestination).name}</span>
                  <button
                    type="button"
                    onClick={() => handleDestinationDeselection(selectedDestination)}
                    className="text-red-500"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 w-full mt-6 hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
