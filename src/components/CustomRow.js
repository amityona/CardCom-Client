import React, { useRef, useState } from 'react';
import { Gender } from '../utils/genderEnum';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { peopleApi } from '../utils/urls';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import GenderRadioButtons from './GenderRadioButtons';
import { validation } from '../utils/validation';

function CustomRow(props) {

    const [editable, setEdit] = useState(false);
    const [gender, setGender] = useState(props?.people?.gender);
    const inputValueIDRef = useRef(null);
    const inputValueNameRef = useRef(null);
    const inputValueMailRef = useRef(null);
    const inputValueBirthDayRef = useRef(null);
    const inputValuePhonenumberRef = useRef(null);

    const sendEdit = async (id) => {
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
            inputValueIDRef.current.value = props?.people?.id;
            inputValueNameRef.current.value = props?.people?.name;
            inputValueMailRef.current.value = props?.people?.mail;
            inputValueBirthDayRef.current.value = props?.people?.birthDay;
            inputValuePhonenumberRef.current.value = props?.people?.phoneNumber;
            setGender(props?.people?.gender);
            setEdit(true);
        }
        else {

            try {
                const data = await axios.put(`${peopleApi}/${id}`, body);
                props.editClick();
            }
            catch (err) {
                alert("Update Failed Try Again. ")
            }

        }
        setEdit(false);
    }

    const handleGenderChange = async (event) => {
        setGender(event.target.value);
    };
    const deletePeople = async (id) => {
        try {
            const data = await axios.delete(`${peopleApi}/${id}`);
            props.editClick();
        }
        catch (err) {
            alert("Delete People Fail");
        }
    }
    return (
        <tr className='mt-5'>

            <td> <input className={`bg-transparent ${editable && "border border-solid border-gray-400 rounded-full  text-red-400 pl-2 "}`}
                type='text' disabled={!editable} ref={inputValueIDRef} defaultValue={props?.people?.id} /></td>
            <td> <input className={`bg-transparent ${editable && "border border-solid border-gray-400 rounded-full  text-red-400 pl-2 "}`}
                type='text' disabled={!editable} ref={inputValueNameRef} defaultValue={props?.people?.name} /></td>
            <td> <input className={`bg-transparent ${editable && "border border-solid border-gray-400 rounded-full  text-red-400 pl-2 "}`}
                type='text' disabled={!editable} ref={inputValueMailRef} defaultValue={props?.people?.mail} /></td>
            <td> <input className={`bg-transparent ${editable && "border border-solid border-gray-400 rounded-full  text-red-400 pl-2 "}`}
                type='text' disabled={!editable} ref={inputValueBirthDayRef} defaultValue={props?.people?.birthDay} /></td>
            {/*<td> <input className={`bg-transparent ${editable && "border border-solid border-gray-400 rounded-full  text-red-400 pl-2 "}`}
                type='text' disabled={!editable} placeholder={Gender[props?.people?.gender]} /></td> */}
            <td> <GenderRadioButtons enable={editable} setGender={handleGenderChange} gender={+gender} /></td>

            <td> <input className={`bg-transparent ${editable && "border border-solid border-gray-400 rounded-full  text-red-400 pl-2 "}`}
                type='text' disabled={!editable} ref={inputValuePhonenumberRef} defaultValue={props?.people?.phoneNumber} /></td>

            <td className='flex space-x-2 justify-center'>
                <IconButton color="error" aria-label="icon button" onClick={() => { deletePeople(props?.people?.id) }}>
                    <DeleteIcon />
                </IconButton>

                {editable && <IconButton color="success" aria-label="icon button" onClick={() => { sendEdit(props?.people?.id) }}>
                    <SendIcon />
                </IconButton>}

                <IconButton color="primary" aria-label="icon button" onClick={() => { setEdit(prev => !prev) }}>
                    <EditIcon />
                </IconButton>

            </td>
        </tr>
    )
}

export default CustomRow