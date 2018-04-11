export class UserPreferences {
  constructor(
    public accompanied: boolean,
    public numberOfChildren: number,
    public specialNeeds?: string
  ) {}
}
