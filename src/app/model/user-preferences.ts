export class UserPreferences {
  constructor(
    public accompanied: boolean,
    public numberOfChildren: number,
    public specialNeeds?: string
  ) {}

  toObject() {
    return {
      accompanied: this.accompanied,
      numberOfChildren: this.numberOfChildren,
      specialNeeds: this.specialNeeds
    };
  }
}
