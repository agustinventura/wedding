import { UserPreferences } from './user-preferences';

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public admin: boolean,
    public enabled: boolean,
    public phone?: string,
    public preferences?: UserPreferences
  ) {
    if (!preferences) {
      this.preferences = new UserPreferences(false, 0, '');
    }
  }

  isComplete() {
    return this.name && this.email && this.phone;
  }
}
