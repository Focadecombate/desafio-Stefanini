import { MissingParamError } from '../../../presentation/errors';
import { RequiredFieldValidation } from './required-field-validation';

describe('Required Field Validation', () => {
  test('should return a missingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field');
    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('field'));
  });
  test('should return undefined if is valid', () => {
    const sut = new RequiredFieldValidation('field');
    const error = sut.validate({ field: 'any_name' });
    expect(error).toBeFalsy();
  });
});
