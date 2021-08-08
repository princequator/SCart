import { useState, useEffect } from 'react';

/**
 * Custom hook to validate and submit signup form.
 * @param callback final callback after form is validated. 
 * @param validate validator.
 * @returns handleChange, handleSubmit, values and errors. 
 */
const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        accType: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {

        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        setErrors(validate(values))
    };

    const handleSubmit = e => {
        e.preventDefault();

        //setErrors(validate(values));
        setIsSubmitting(true);
        // callback();
    };

    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                callback(values);
            }
        },
        [errors]
    );

    return { handleChange, handleSubmit, values, errors };
};

export default useForm;