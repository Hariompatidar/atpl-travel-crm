import React, { useEffect, useState } from "react";
import { endpoints } from "../services/apis";
import { newLead } from "../services/operations/leadAPI";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiconnector";

const NewLeadForm = () => {
    const { GET_ALL_DESTINATIONS_API } = endpoints;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        startDate: "",
        endDate: "",
        destination: "",
        ticketBooked:false,
        adult: "",
        kid: "",
    });
    const [leadCreated, setLeadCreated] = useState(false);
    const [destinations, setDestinations] = useState([]);

    const {
        name,
        email,
        number,
        startDate,
        endDate,
        destination,
        ticketBooked,
        adult,
        kid,
    } = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        newLead(
            name,
            email,
            number,
            startDate,
            endDate,
            destination,
            ticketBooked,
            adult,
            kid,
            setLeadCreated
        );

        setFormData({
            name: "",
            email: "",
            number: "",
            startDate: "",
            endDate: "",
            destination: "",
            ticketBooked: false,
            adult: "",
            kid: "",
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    useEffect(() => {
        apiConnector("GET", GET_ALL_DESTINATIONS_API)
            .then((response) => {
                setDestinations(response.data);
            })
            .catch(() => {
                toast.error("Something wents wrong, Please reload the page");
            });
    }, [GET_ALL_DESTINATIONS_API]);

    if (leadCreated) {
        return (
            <div className="w-full h-full flex items-center justify-center px-10">
                <h1 className="text-xl">
                    Thanks for connecting with us, Our executive will connect
                    with you soon in some time.
                </h1>
            </div>
        );
    }
    return (
     <div className="w-ful h-full p-10 items-center justify-center">
           <div className="blurcard p-6 rounded-lg shadow-lg w-1/2 mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Travel Booking Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="name"
                        className="block font-medium text-gray-600"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="inputbox w-full"
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block font-medium text-gray-600"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="inputbox w-full"
                    />
                </div>
                <div>
                    <label
                        htmlFor="number"
                        className="block font-medium text-gray-600"
                    >
                        Number
                    </label>
                    <input
                        type="text"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        className="inputbox w-full"
                    />
                </div>
               <div className="flex gap-3">
               <div className="w-[50%]">
                    <label
                        htmlFor="startDate"
                        className="block font-medium text-gray-600"
                    >
                        Start Date
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="inputbox w-full"
                    />
                </div>
                <div className="w-[50%]">
                    <label
                        htmlFor="endDate"
                        className="block font-medium text-gray-600"
                    >
                        End Date
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="inputbox w-full"
                    />
                </div>
               </div>
                <div>
                    <label
                        htmlFor="destination"
                        className="block font-medium text-gray-600"
                    >
                        Destination
                    </label>
                    <select
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="inputbox w-full"
                    >
                        <option value="">Select a destination</option>
                        {destinations.map((dest, index) => (
                            <option key={index} value={dest}>
                                {dest}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-3">
                    <label
                        htmlFor="ticketBooked"
                        className="block font-medium text-gray-600"
                    >
                        Your Flight/Train Tickets are booked or not: 
                    </label>
                    <div className="flex items-center">
            <label htmlFor="ticketYes" className="mr-4">
              <input
                type="checkbox"
                id="ticketYes"
                name="ticketBooked"
                checked={formData.ticketBooked}
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
            <label htmlFor="ticketNo">
              <input
                type="checkbox"
                id="ticketNo"
                name="ticketBooked"
                checked={!formData.ticketBooked}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
          </div>
                </div>
          <div className="flex gap-3">
                <div className="w-[50%]">
                    <label
                        htmlFor="adult"
                        className="block font-medium text-gray-600"
                    >
                        Number of Adults
                    </label>
                    <input
                        type="number"
                        name="adult"
                        value={formData.adult}
                        onChange={handleChange}
                        className="inputbox w-full"
                    />
                </div>
                <div className="w-[50%]">
                    <label
                        htmlFor="kid"
                        className="block font-medium text-gray-600"
                    >
                        Number of Kids
                    </label>
                    <input
                        type="number"
                        name="kid"
                        value={formData.kid}
                        onChange={handleChange}
                        className="inputbox w-full"
                    />
                </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
     </div>
    );
};

export default NewLeadForm;
