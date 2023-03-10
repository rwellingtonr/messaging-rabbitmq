import { Error400 } from '../errors/400';
import { capitalize } from '../helpers/capitalize';

export class Name {
  private readonly _name: string;

  constructor(name: string) {
    this.validateName(name);
    const formattedName = this.formatName(name);
    this._name = formattedName;
  }

  private validateName(name: string) {
    if (!name) {
      throw new Error400('Name is required!');
    }
  }

  private formatName(name: string) {
    const formattedName = capitalize(name);
    return formattedName;
  }

  public get value(): string {
    return this._name;
  }
}
