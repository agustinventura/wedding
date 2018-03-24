export class User {

  constructor(public name: string, public email: string, public phone?: string) {
  }

  isComplete() {
    return this.name && this.email && this.phone;
  }
}
