export class User {

  constructor(public id: string, public name: string, public email: string, public phone?: string) {
  }

  isComplete() {
    return this.name && this.email && this.phone;
  }
}
