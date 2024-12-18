"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input, Tooltip, InputOtp, Checkbox } from "@nextui-org/react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { app } from '@/src/app/firebase-config'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';

const PersonalDetails = ({ uploadData }) => {
    const [otp, setOtp] = useState('')
    const [cookie, setCookie, removeCookie] = useCookies()
    const {decodedToken, isExpired} = useJwt(cookie.user)
    const [confirmationResult, setConfirmationResult] = useState(null)
    const [otpSent, setOtpSent] = useState(false)
    const auth = getAuth(app)
    const [step, setStep] = useState(0);
    const router = useRouter()
    const search = useSearchParams()
    const [isLoad, setIsLoad] = useState(false)
    const [isLoad2, setIsLoad2] = useState(false)
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
    const handleNext = () => {
        setStep(step + 1);
    };
    const handlePersonalData = async ()=>{
        const result = await axios.post(`http://localhost:9020/personaldetails`, {data: data, id: decodedToken?.user_id})
        if(result.data.acknowledge){
            router.push('?sec=varification');
        }
    }
    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            "size": 'invisible',
            "callback": (response) => {
            },
            'expired-callback': () => {
            }
        }, auth)
        window.recaptchaVerifier.render().then(() => {
            console.log('reCAPTCHA rendered');
        }).catch((error) => {
            console.error('Error rendering reCAPTCHA:', error);
        });
    }, [])

    const handleChange = (key) => (e) => {
        if (key === 'phone') {
            let inputValue = e.target.value;
            inputValue = inputValue.replace(/\D/g, '');
            inputValue = `05${inputValue.replace(/^05/, '').slice(0, 8)}`;
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

            const e164PhoneNumber = convertToE164(data.phone);
            const confirmation = await signInWithPhoneNumber(auth, e164PhoneNumber, window.recaptchaVerifier)
            console.log("OTP sent:", confirmation);
            setConfirmationResult(confirmation)
            setOtpSent(true)


        } catch (error) {
        }
    }
    const handleSubmit = async () => {
        try {
            if (validateForm()) {
                setIsLoad(true)
                await handleSendOtp()
                handleNext(step +1)

            }
        } catch (error) {

        }

    };

    const handleOtpSubmit = async () => {
        try {
          const result =  await confirmationResult.confirm(otp)
            handleNext(step+1)
            setOtp('')
            if(result){
                await handlePersonalData()
              }
        } catch (error) {

        }
    }

    return (
        <div>

            <div className='glass-background w-screen h-screen'>
                <div className=' body2 flex flex-row ' >

                    {otpSent ?
                        <div className='flex  justify-center' style={{ width: '60%' }}>
                            <div className="form-container">

                                <h1 className="title"> שלב האימות   </h1>
                                <h4 className='w-full text-center font-semibold '> </h4>
                                <form className="form">
                                    <div className="input-group">
                                        <label htmlFor="firsName" className="username">
                                            קוד האימות
                                        </label>
                                        <div>
                                            <InputOtp
                                                isRequired
                                                color='secondary'
                                                style={{ direction: 'ltr' }}
                                                value={otp}
                                                length={6}
                                                required
                                                onValueChange={setOtp}
                                                description="הכנס את קוד ה-6 ספרות שנשלח לטלפון שלך"
                                            />
                                        </div>

                                    </div>
                                    <div style={{ height: '20px' }}></div>
                                    <Button type="button" color='primary' onPress={handleOtpSubmit} className="sign-in w-full">
                                        {isLoad2 === false && "אימות"}
                                    </Button>
                                    <div className="social-messages">
                                        <div className="line"></div>

                                        <div className="line"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        :
                        <div className='flex  justify-center' style={{ width: '60%' }}>
                            <div className="form-container" >

                                <h1 className="title"> בואו נכיר טוב יותר</h1>
                                <h4 className='w-full text-center font-semibold '>פרטים אישיים</h4>
                                <form className="form flex flex-col" style={{ gap: '30px' }}>
                                    <div className="flex  ">


                                        <Input
                                            color={'primary'}
                                            variant='underlined'
                                            errorMessage="אנא הכנס שם פרטי תקין"
                                            isInvalid={errors.firsName}
                                            type="text"
                                            label='שם פרטי'
                                            isRequired
                                            value={data.firsName}
                                            name="firsName"
                                            required
                                            onChange={handleChange('firsName')}

                                        />

                                    </div>

                                    <div className="flex ">
                                        <Input
                                            label='שם משפחה'
                                            errorMessage="אנא הכנס שם משפחה תקין"
                                            isInvalid={errors.lastName}
                                            color={'primary'}
                                            variant='underlined'
                                            type="text"
                                            value={data.lastName}
                                            name="lastName"
                                            isRequired
                                            onChange={handleChange('lastName')}

                                        />

                                    </div>

                                    <div className="flex">
                                        <Input
                                            type="tel"
                                            variant='faded'
                                            label='טלפון'
                                            value={data.phone}
                                            color={'primary'}
                                            errorMessage="אנא הכנס שם טלפון תקין"
                                            isInvalid={errors.phone}
                                            isRequired
                                            onChange={handleChange('phone')}
                                            style={{
                                                textAlign: 'left', direction: 'ltr',

                                            }}
                                        />

                                    </div>

                                    <Button type="button" color='primary' isLoading={isLoad} onPress={handleSubmit} className="sign-in w-full ">
                                        {isLoad === false && "הבא"}
                                    </Button>


                                </form>
                                <div id="recaptcha-container"></div>
                            </div>
                        </div>
                    }
                    <div className='flex w-full flex-col items-center h-full bg-white' style={{paddingTop: '30px'}}  >
                        <section className="multi_step_form w-full">
                            <form id="msform">
                                <ul id="progressbar">
                                    <li className={step >= 2 ? 'active' : ''}> אימות</li>
                                    <li className={step >= 1 ? 'active' : ''}>פרטים אישיים </li>
                                </ul>


                                {step === 1 && (
                                    <fieldset>
                             
                                        {/* Your form fields for step 1 */}

                                    </fieldset>
                                )}

                                {/* Step 2 */}
                                {step === 2 && (
                                    <fieldset>
                                  
                                        {/* Your form fields for step 2 */}
                                   
                                    </fieldset>
                                )}
                            </form>
                        </section>
                    <div className='h-full '>

                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalDetails;
