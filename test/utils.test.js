import {
  camelToKebabCase,
  getValue,
  getElementDefaultProperty,
  isNumber,
  isString,
  isObject,
  isNumeric,
  previousArrayValue,
} from '../src/utils';
import { NO_UNIT, COLOR_UNIT } from '../src/enum/specialUnitEnum';

document.body.innerHTML = `<p>test</p>`;
const element = document.querySelector('p');

describe('utils', () => {
  describe('camelToKebabCase', () => {
    it('converts aaBcDe to aa-bc-de', () => {
      expect(camelToKebabCase('aaBcDe')).toEqual('aa-bc-de');
    });
  });
  describe('getValue', () => {
    describe('returns an array with the value and unit', () => {
      it('return px as default is unit is not specified', () => {
        expect(getValue('20px')).toEqual([20, 'px']);
      });
      it('works for standard css units', () => {
        expect(getValue('20px')).toEqual([20, 'px']);
      });
      it('returns [value, NO_UNIT] if the unit is not specified', () => {
        expect(getValue(1)).toEqual([1, NO_UNIT]);
      });
      describe('works with colors', () => {
        it('returns [value, COLOR_UNIT] if the value is a color', () => {
          expect(getValue('#fff')).toEqual(['rgb(255, 255, 255)', COLOR_UNIT]);
        });
        it('converts the given color into rgb/rgba format', () => {
          expect(getValue('red')).toEqual(['rgb(255, 0, 0)', COLOR_UNIT]);
          expect(getValue('rgba(123, 123, 123, .3)')).toEqual([
            'rgba(123, 123, 123, 0.3)',
            COLOR_UNIT,
          ]);
        });
      });
    });
    describe('works with array values', () => {
      it('returns an array of arrays with the value and unit', () => {
        expect(getValue(['20px', 0.3, '3%'])).toEqual([
          [20, 'px'],
          [0.3, NO_UNIT],
          [3, '%'],
        ]);
      });
    });
    it('throws error if an invalid value is specified', () => {
      expect(() => getValue('px')).toThrow();
    });
  });
  describe('getElementDefaultProperty', () => {
    it('gets a default property of a dom element', () => {
      expect(getElementDefaultProperty(element, 'width')).toEqual(0 || '');
    });
  });
  describe('isNumber', () => {
    it('returns true if the provided parameter is a number', () => {
      expect(isNumber(123)).toBeTruthy();
    });
    it('returns false if the provided parameter is not a number', () => {
      expect(isNumber('123')).toBeFalsy();
    });
  });
  describe('isString', () => {
    it('returns true if the provided parameter is a string', () => {
      expect(isString('123')).toBeTruthy();
    });
    it('returns false if the provided parameter is not a string', () => {
      expect(isString(123)).toBeFalsy();
    });
  });
  describe('isObject', () => {
    it('returns true if the provided parameter is an object', () => {
      expect(isObject({})).toBeTruthy();
    });
    it('returns false if the provided parameter is not an object', () => {
      expect(isObject(213)).toBeFalsy();
    });
  });
  describe('isArray', () => {
    it('returns true if the provided parameter is an array', () => {
      expect(isObject([])).toBeTruthy();
    });
    it('returns false if the provided parameter is not an array', () => {
      expect(isObject('')).toBeFalsy();
    });
  });
  describe('isNumeric', () => {
    it('returns true if the provided parameter is a numeric value', () => {
      expect(isNumeric('123')).toBeTruthy();
      expect(isNumeric(123)).toBeTruthy();
    });
    it('returns false if the provided parameter is not a numeric value', () => {
      expect(isNumeric('123a')).toBeFalsy();
      expect(isNumeric([])).toBeFalsy();
    });
  });
  describe('previousArrayValue', () => {
    const obj = {
      1: {},
      4: {},
      3: {},
    };
    it('returns the previous key of an object', () => {
      expect(previousArrayValue(Object.keys(obj), 3)).toEqual(1);
      expect(previousArrayValue(Object.keys(obj), 4)).toEqual(3);
    });
    it('returns false if the provided key is the first one', () => {
      expect(previousArrayValue(Object.keys(obj), 1)).toBeFalsy();
      expect(typeof previousArrayValue(Object.keys(obj), 1)).toEqual('boolean');
    });
    it("returns false if the provided key doesn't exist ", () => {
      expect(previousArrayValue(Object.keys(obj), 6)).toBeFalsy();
      expect(typeof previousArrayValue(Object.keys(obj), 1)).toEqual('boolean');
    });
  });
});