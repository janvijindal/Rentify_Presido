import emailjs from '@emailjs/browser';
import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios'; 
import {NavLink} from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from './env';
import { authContext } from "../hooks/authContext";

const ContactUs = () => {
    const { user } = useContext(authContext);
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const usertoken = user.token;
    const navigate = useNavigate();
    const form = useRef();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_URL}/get_one_user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${usertoken}`,
                    },
                });
                if (response.status >= 200 && response.status < 300) {
                    setUserData(response.data);
                    //console.log(response.data);
                } else {
                    console.log('Request failed with status code:', response.status);
                }
            } catch (error) {
                console.error('Error:', error.message);
                if (error.response) {
                    console.error('Error Response Data:', error.response.data);
                    console.error('Error Status Code:', error.response.status);
                    console.error('Error Headers:', error.response.headers);
                }
            }
        };

        fetchUserData();
    }, [id, usertoken]);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_9hbgwy8', 'template_kljf26z', form.current, {
                publicKey: 'brg91yeM3R7xAD4li',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    navigate('/'); // Navigate back to the home component
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <div className='mt-10 ml-3'>
             <h1 className='text-3xl font-bold '>Send Email</h1>
            {userData ? (
                <form className='flex flex-col ' ref={form} onSubmit={sendEmail}>
                    <div className='flex gap-2'>
                    <label className='font-bold '>Name:</label>
                    <input type="text" name="firstName" defaultValue={userData.firstName} readOnly />
                    </div>
                    <div className='flex gap-2'>
                    <label className='font-bold '>Phone Number:</label>
                    <input type="text" name="phoneNumber" defaultValue={userData.phoneNumber} readOnly />
                    </div>
                    <NavLink to='/' type="submit " className='bg-red-500 py-2 px-2 w-[220px] no-underline h-10  rounded-md text-white text-center font-bold mt-3'>Send Interest Mail</NavLink>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ContactUs;
