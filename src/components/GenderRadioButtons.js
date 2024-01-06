import React from 'react'

function GenderRadioButtons(props) {
    const { gender } = props;
    return (
        <div className='flex space-x-3'>

            {(props.enable || gender === 0) && <label>

                <input
                    type="radio"
                    value={0}
                    checked={gender === 0}
                    onChange={props.setGender}
                    disabled={!props.enable}

                />
                M

            </label>
            }

            {(props.enable || gender === 1) && <label>
                <input
                    type="radio"
                    value={1}
                    className={`${gender === 1 && "text-red-700 underline bg-red-200"}`}
                    checked={gender === 1}
                    onChange={props.setGender}
                    disabled={!props.enable}
                />
                F
            </label>
            }
            {(props.enable || gender === 2) && <label>
                <input
                    type="radio"
                    value={2}
                    checked={gender === 2}
                    onChange={props.setGender}
                    disabled={!props.enable}
                />
                Another
            </label>
            }
        </div>
    )
}

export default GenderRadioButtons