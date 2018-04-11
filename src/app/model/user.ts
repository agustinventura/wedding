import { UserPreferences } from './user-preferences';

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public admin: boolean,
    public phone?: string,
    public preferences?: UserPreferences,
  ) {}

  isComplete() {
    return this.name && this.email && this.phone;
  }
}
