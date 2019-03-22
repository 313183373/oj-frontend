import isEmail from 'validator/lib/isEmail'
import PasswordValidator from "password-validator";
import validator from 'validator';

export function emailValidator(value) {
  return value && !isEmail(value.trim()) ? 'Invalid email' : null;
}

function isDirty(value) {
  return value && value.trim();
}

export function required(requiredFields, values) {
  return requiredFields.reduce(
    (fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: 'Required' }),
    }),
    {},
  );
}

const passwordSchema = new PasswordValidator();

passwordSchema.is().min(6).is().max(36).has().digits().has().letters().has().not().spaces();

export function passwordValidator(password) {
  return passwordSchema.validate(password);
}

export function usernameValidator(username) {
  // return validator.
}