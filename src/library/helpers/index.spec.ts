import { getClassName } from './index';

describe('helpers', () => {
  describe('getClassName function', () => {
    it('should return given block if only block is given', () => {
      expect(getClassName('some-block')).toEqual('some-block');
    });
    it('should return given block joined with given element by "__"', () => {
      expect(getClassName('some-block', 'some-element')).toEqual('some-block__some-element');
    });
    it('should return given block joined with given modifier by "--"', () => {
      expect(getClassName('some-block', undefined, 'some-modifier')).toEqual('some-block--some-modifier');
    });
    it('should return given block joined with given element by "__" joined with given modifier by "--"', () => {
      expect(getClassName('some-block', 'some-element', 'some-modifier')).toEqual('some-block__some-element--some-modifier');
    });
    it('should return given block joined with given element by "__" joined with given modifier by "_"', () => {
      expect(getClassName('some-block', 'some-element', 'some-modifier', undefined, '_')).toEqual('some-block__some-element_some-modifier');
    });
    it('should return given block joined with given element by "__" joined with given modifier by "_"', () => {
      expect(getClassName('some-block', 'some-element', 'some-modifier', true, '_')).toEqual('some-block__some-element_some-modifier');
    });
    it('should return given block joined with given element by "__" joined with given modifier with value by "--"', () => {
      expect(getClassName('some-block', 'some-element', 'some-modifier', 'some-value')).toEqual('some-block__some-element--some-modifier--some-value');
    });
  });
});
