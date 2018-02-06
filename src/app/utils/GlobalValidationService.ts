//====================== Handle Global Validation Throughout the Application =============

export class GlobalValidationService {
	static getValidatorErrorMessage(validatorName: string, validatorValue: any){
		let config = {
			'required' : 'Required Field',
			'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'invalidPhoneNumber':'Invalid Phone Number. Phone Number Must be in 10 digits',
            'minlength': `Minimum length ${validatorValue.requiredLength}`
		};
		return config[validatorName];
	}

	static emailValidator(control){
		if(control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
			return null;
		}else{
			return { 'invalidEmailAddress': true };
		}
	} 

	static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    static phoneValidator(control) {
    	if (control.value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
            return null;
        } else {
            return { 'invalidPhoneNumber': true };
        }
    }
}