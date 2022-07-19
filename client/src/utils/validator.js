import validator from 'validator';

class ValidateFields {
    //this could be confusing so to clear things out
    //true means error except for EXCEPTION SECTION
    //Bool of string also return true so that also indicates error

    validateText(text, min = 0, max = 1000) {
        if (this.validateEmpty(text)) return "Please enter something"
        if (validator.isAlpha(text, 'en-US', { ignore: " " })) {
            if (validator.isLength(text, { min: min, max: max })) return false
            return `should be of ${min} to ${max} characters`
        }
        return "Please enter something";
    }

    validateEmail(email) {
        if (this.validateEmpty(email)) return "Please enter something"
        if (validator.isEmail(email)) return false
        return "Please enter a valid email"
    }

    validatePassword(password) {
        if (validator.isEmpty(password)) {
            return 'Password is required';
        } else if (!validator.isLength(password, { min: 8 })) {
            return 'Password should be minimum 8 characters';
        }
        return false;
    }
    
    validateDateTime(datetime){
        if (!validator.isDate(datetime.split('T')[0])) {
            return 'Enter a valid date';
        }
        return false;
    }

    
    validateUrl(url){
        if (validator.isURL(url))
            return false
        return "This is not a valid url"
    }

    //EXCEPTION SECTION BELOW

    validateEmpty(name) {
        if(!name)
            return true
        if (validator.isEmpty(name.trim())) {
            return true
        }
        return false;
    }

    validateLength(size, min, max) {
        return min <= size && max >= size
    }
}

const validateFields = new ValidateFields();

export { validateFields };