export class Username {
  private readonly _username: string;

  constructor(username: string) {
    const formattedUsername = this.formatUsername(username);

    this._username = formattedUsername;
  }

  public get value(): string {
    return this._username;
  }

  private formatUsername(username: string) {
    if (!username) return;
    username = username?.toLowerCase();

    const patternOfFirstLetter = /(\b[a-z])/g;

    const capitalized = username.replace(patternOfFirstLetter, (match) =>
      match.toUpperCase(),
    );

    return capitalized.trim();
  }
}
