"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input, Tooltip } from "@nextui-org/react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { app } from '@/src/app/firebase-config'

const PersonalDetails = ({ uploadData }) => {
    const [otp, setOtp] = useState('')
    const [confirmationResult, setConfirmationResult] = useState(null)
    const [otpSent, setOtpSent] = useState(false)
    const auth = getAuth(app)

    const router = useRouter()
    const search = useSearchParams()
    const [isLoad, setIsLoad] = useState(false)
    const [data, setData] = useState({
        firsName: '',
        lastName: '',
        phone: '05'
    })
    const [errors, setErrors] = useState({
        firsName: '',
        lastName: '',
        phone: ''
    })

    const handleChange = (key) => (e) => {
        if (key === 'phone') {
            let inputValue = e.target.value;

            // Remove non-digit characters
            inputValue = inputValue.replace(/\D/g, '');

            // Ensure the value starts with "05" and allow only 10 digits in total
            inputValue = `05${inputValue.replace(/^05/, '').slice(0, 8)}`;

            // Format the input with hyphens after every 3 digits
            let formattedValue = inputValue.slice(0, 3) + (inputValue.length > 3 ? '-' : '') + inputValue.slice(3, 6) + (inputValue.length > 6 ? '-' : '') + inputValue.slice(6, 10);

            setData({
                ...data,
                [key]: formattedValue,
            });
        } else {
            setData({
                ...data,
                [key]: e.target.value,
            });
        }
    };
    function convertToE164(phoneNumber) {
        // Remove any non-numeric characters (spaces, hyphens)
        const cleanedNumber = phoneNumber.replace(/\D/g, '');

        // Assuming the phone number is from Israel (country code +972)
        if (cleanedNumber.startsWith('05')) {
            const e164Number = `+972${cleanedNumber.slice(1)}`;
            return e164Number;
        } else {
            throw new Error("Invalid phone number format for Israel");
        }
    }
    const validateForm = () => {
        let valid = true;
        let validationErrors = { firsName: '', lastName: '', phone: '' };

        // First name validation
        if (!data.firsName.trim()) {
            validationErrors.firsName = 'אנא הזן את שמך הפרטי';
            valid = false;
        }

        // Last name validation
        if (!data.lastName.trim()) {
            validationErrors.lastName = 'אנא הזן את שם המשפחה שלך';
            valid = false;
        }

        // Phone validation (should match 05X-XXX-XXXX format)
        const phonePattern = /^05\d{1}-\d{3}-\d{4}$/;
        if (!phonePattern.test(data.phone)) {
            validationErrors.phone = 'המספר לא תקין, אנא הזן מספר טלפון בתבנית נכונה (05X-XXX-XXXX)';
            valid = false;
        }

        setErrors(validationErrors);
        return valid;
    };
    const handleSendOtp = async () => {
        try {
            const e164PhoneNumber = convertToE164(phone);
            const confirmation = await signInWithPhoneNumber(auth, e164PhoneNumber, window.recaptcharVarifier)
            setConfirmationResult(confirmation)
            setOtpSent(true)

        } catch (error) {
            console.log("🚀 ~ handleSendOtp ~ error:", error)

        }
    }
    const handleSubmit = async () => {
        try {
            if (validateForm()) {
                await confirmationResult.confirm(otp)
                setOtp('')
                router.push('?sec=varification');
            }
        } catch (error) {

        }

    };
    useEffect(() => {
        window.recaptcharVarifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            "size": 'normal',
            "callback": (response) => {

            },
            'expired-callback': () => {

            }
        })
    }, [auth])
    return (
        <div>
            {!otpSent ? (
                <div id="recaptcha-container"></div>
            ) : null}
            <div className='glass-background w-screen h-screen'>
                <div className=' body2 flex flex-row ' >

                    {otpSent ?
                        <div className="form-container">

                            <h1 className="title"> בואו נכיר טוב יותר</h1>
                            <h4 className='w-full text-center font-semibold '>פרטים אישיים</h4>
                            <form className="form">
                                <div className="input-group">
                                    <label htmlFor="firsName" className="username">
                                        שם פרטי
                                    </label>

                                    <input
                                        type="text"
                                        value={data.firsName}
                                        name="firsName"
                                        required
                                        onChange={handleChange('firsName')}
                                        style={{
                                            borderColor: errors.firsName ? 'red' : '',
                                            borderWidth: errors.firsName ? '2px' : ''
                                        }}
                                    />

                                </div>

                                <Button type="button" color='primary' onPress={handleSubmit} className="sign-in">
                                    {isLoad === false && "הבא"}
                                </Button>
                                <div className="social-messages">
                                    <div className="line"></div>

                                    <div className="line"></div>
                                </div>
                            </form>
                        </div>
                        :
                        <div className='flex  justify-center' style={{width: '60%'}}>
                        <div className="form-container">

                            <h1 className="title"> בואו נכיר טוב יותר</h1>
                            <h4 className='w-full text-center font-semibold '>פרטים אישיים</h4>
                            <form className="form">
                                <div className="input-group">
                                    <label htmlFor="firsName" className="username">
                                        שם פרטי
                                    </label>

                                    <input
                                        type="text"
                                        value={data.firsName}
                                        name="firsName"
                                        required
                                        onChange={handleChange('firsName')}
                                        style={{
                                            borderColor: errors.firsName ? 'red' : '',
                                            borderWidth: errors.firsName ? '2px' : ''
                                        }}
                                    />

                                </div>

                                <div className="input-group">
                                    <label htmlFor="lastName" className="username">
                                        שם משפחה
                                    </label>

                                    <input
                                        type="text"
                                        value={data.lastName}
                                        name="lastName"
                                        required
                                        onChange={handleChange('lastName')}
                                        style={{
                                            borderColor: errors.lastName ? 'red' : '',
                                            borderWidth: errors.lastName ? '2px' : ''
                                        }}
                                    />

                                </div>

                                <div className="input-group">
                                    <label htmlFor="phone" className="username">
                                        טלפון
                                    </label>

                                    <input
                                        type="text"
                                        value={data.phone}

                                        name="phone"
                                        required
                                        onChange={handleChange('phone')}
                                        style={{
                                            textAlign: 'left', direction: 'ltr',
                                            borderColor: errors.phone ? 'red' : '',
                                            borderWidth: errors.phone ? '2px' : ''
                                        }}
                                    />

                                </div>
                                <div style={{height: '20px'}}></div>
                                <Button type="button" color='primary' onPress={handleSubmit} className="sign-in w-full ">
                                    {isLoad === false && "הבא"}
                                </Button>
                                <div className="social-messages">
                                    <div className="line"></div>

                                    <div className="line"></div>
                                </div>
                            </form>
                        </div>
                        </div>
                    }
                    <div className='flex justify-center w-full items-center h-full bg-white'  >
                   
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalDetails;
