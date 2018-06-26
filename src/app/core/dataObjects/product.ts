

export class Product {

  public constructor (public id: number, public name: string, public description: string , public parameters?: string) {

  }

  public static assign(o: any): Product {

    const p = new Product(o.number, o.name, o.description, o.parameters);
    return p;
  }

  public toString(): string {
    return 'id:' + this.id +
           'name:' + this.name +
           'description:' + this.description +
           'paramters:' + this.parameters;
  }

}
