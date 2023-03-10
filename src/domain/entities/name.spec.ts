import { Error400 } from '../errors/400';
import { capitalize } from '../helpers/capitalize';
import { Name } from './name';

describe('Name Entity', () => {
  it('Should APPROVE and capitalize the name', () => {
    const nameFake = 'john doe';
    const name = new Name(nameFake);
    expect(name.value).toBe(capitalize(nameFake));
  });
  it('Should REPROVE name cannot be undefined', () => {
    const nameFake = undefined;

    expect(() => new Name(nameFake)).toThrow(Error400);
  });
});
