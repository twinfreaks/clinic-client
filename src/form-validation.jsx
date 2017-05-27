import React from 'react';
import Validation from 'react-validation';
import validator from 'validator';

Object.assign(Validation.rules, {
    required: {
        rule: value => {
            return value.toString().trim();
        },
        hint: value => {
            return <span className='form-error is-visible'>Required</span>
        }
    },
    minThree: {
      rule: value => {
        return value.toString().trim().length > 2;
      },
      hint: value => {
        return <span className='form-error is-visible'>Minimum 3 characters</span>
      }
    },
    number: {
      rule: value => {
        return validator.isNumeric(value);
      },
      hint: value => {
        return <span className='form-error is-visible'>{value} isn't a number.</span>
      }
    },
    onlyLetters: {
      rule: value => {
        return value.match(/^[a-zA-Z.\-_]*$/);
      },
      hint: value => {
        return <span className='form-error is-visible'>Only latin letters allowed</span>
      }
    },
    email: {
        rule: value => {
            return validator.isEmail(value);
        },
        hint: value => {
            return <span className='form-error is-visible'>{value} isn't an Email.</span>
        }
    },
    password: {
        rule: (value, components) => {
            const password = components.password.state;
            const passwordConfirm = components.passwordConfirm.state;
            const isBothUsed = password
                && passwordConfirm
                && password.isUsed
                && passwordConfirm.isUsed;
            const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;
 
            if (!isBothUsed || !isBothChanged) {
                return true;
            }
 
            return password.value === passwordConfirm.value;
        },
        hint: () => <span className="form-error is-visible">Passwords should be equal.</span>
    }
});

export default class FormValidation extends React.Component {

}