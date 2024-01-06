import React, { useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import GenderRadioButtons from './GenderRadioButtons';
import SendIcon from '@mui/icons-material/Send';
import { validation } from '../utils/validation';
import { peopleApi } from '../utils/urls';
import axios from 'axios';

function AddPeopleModal(props) {

    const handleGenderChange = async (event) => {
        setGender(event.target.value);
    };
    const [gender, setGender] = useState(0);
    const inputValueIDRef = useRef(null);
    const inputValueNameRef = useRef(null);
    const inputValueMailRef = useRef(null);
    const inputValueBirthDayRef = useRef(null);
    const inputValuePhonenumberRef = useRef(null);

    const sendPeople = async () => {
        const body = {
            id: inputValueIDRef.current.value,
            name: inputValueNameRef.current.value,
            mail: inputValueMailRef.current.value,
            birthDay: inputValueBirthDayRef.current.value,
            gender: +gender,
            phoneNumber: inputValuePhonenumberRef.current.value,
        }
        const isValidation = validation(body);
        if (isValidation === false) {
            alert("Not Valid Input")

        }
        else {
            try {
                const data = await axios.post(`${peopleApi}`, body);
                props.editClick();
                props.handleClose(false)
            }
            catch (err) {
                alert("People Not Saved")
            }


        }

    }

    return (
        <div className=' absolute
         lg:h-[40%] lg:w-[60%] bg-white ml-56 rounded-xl shadow-lg
         sm:h-[60%] sm:w-[60%]
          '>
            <IconButton color="error" aria-label="icon button" onClick={() => { props.handleClose(false) }}>
                <CloseIcon />
            </IconButton>

            <div className='grid grid-cols-2 items-center gap-2 xl:pr-40 xl:pl-40 pl-20 pr-20 mx-auto text-black sm:pl-1 sm:pr-1  '>
                <h3>ID :</h3>
                <input className={`bg-transparent ${"border border-solid border-gray-400 rounded-full  text-black pl-2 "}`}
                    type='text' ref={inputValueIDRef} />
                <h3>Name :</h3>
                <input className={`bg-transparent ${"border border-solid border-gray-400 rounded-full  text-black pl-2 "}`}
                    type='text' ref={inputValueNameRef} />
                <h3>Email :</h3>
                <input className={`bg-transparent ${"border border-solid border-gray-400 rounded-full  text-black pl-2 "}`}
                    type='text' ref={inputValueMailRef} />
                <h3>BirthDay :</h3>
                <input className={`bg-transparent ${"border border-solid border-gray-400 rounded-full  text-black pl-2 "}`}
                    type='text' ref={inputValueBirthDayRef} />
                <h3>Gender :</h3>
                <GenderRadioButtons enable={true} setGender={handleGenderChange} gender={+gender} />

                <h3>Phone Number</h3>
                <input className={`bg-transparent ${"border border-solid border-gray-400 rounded-full  text-black  pl-2 "}`}
                    type='text' ref={inputValuePhonenumberRef} />

            </div>
            <div className='flex justify-center'>
                <IconButton className='flex justify-center' color="error" aria-label="icon button" onClick={() => { sendPeople() }}>
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default AddPeopleModal