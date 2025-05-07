import React from 'react'

const InputField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder

}) => {
  return (
    <div className='w-full flex flex-col gap-1'>
        <label 
          htmlFor="id"
          className={`${
            className ? className : "" 
          } text-sm font-semibold text-slate-800`}
        >
            {label}
        </label>
        <input 
          type={type}
          id={id}
          placeholder={placeholder}
          className={`${
            className ? className : ""
          } px-2 py-2 border outline-none bg-transparent text-slate-800 rounded ${
            errors[id]?.message ? "border-red-500" : "border-slate-500"
          }`}
          {...register(id, {
            required: {value: required, message},
            minLength: min
               ? {value: min, message: `Minimum ${min} characters required`}
               : null,
            pattern:
               type === "email" 
               ? {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid Email"}
               : type === "url"
               ? {value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/, message: "Please enter a valid url"}
               : null
          })}
        />
        {errors[id]?.message && (
            <p className='text-sm font-semibold text-red-600 mt-0'>
                {errors[id]?.message}
            </p>
        )}
    </div>
  )
}

export default InputField