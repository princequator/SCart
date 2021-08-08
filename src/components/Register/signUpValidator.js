export default function validateInfo(values) {
    let errors = {};

    if (!values.username.trim() || !values.password || !values.phoneNumber || !values.email || !values.accType) {
        errors.mandatory = 'All fields are mandatory';
    }

    if (values.username) {
        const pat = new RegExp("^[A-Za-z]+$");
        let isPatternValid = pat.test(values.username);

        if (!isPatternValid) {
            errors.username = 'Name contains invalid characters'
        }
    }

    if (values.phoneNumber.length !== 10) {
        errors.phoneNumber = 'Phone Number is Invalid'
    }

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (values.email.match(mailformat)) {
        errors.email = 'email is invalid'
    }

    if (values.password) {
        const pattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');

        let isPatternValid = pattern.test(values.password);
        if (!isPatternValid) {
            errors.password = 'Password should contain atleast an uppercase and a lowercase character, a number and a special character'
        }
    }

    if (values.confirmPassword) {
        if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Password and Confirm Password are not matching';
        }
    }

    return errors;
}