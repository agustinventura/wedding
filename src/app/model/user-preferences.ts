export class UserPreferences {
  constructor(
    public id: string,
    public accompanied: boolean,
    public numberOfChildren: number,
    public specialNeeds?: string
  ) {}
}
