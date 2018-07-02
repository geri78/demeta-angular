/*
"id": 1,
"name": "Weizen",
"unique": null,
"description": null,
"created_at": "2018-07-01T19:41:36.640Z",
"updated_at": "2018-07-01T19:41:36.640Z"
*/

export class Commodity {

  public constructor( public id: number,
                      public name: string,
                      public created_at: Date,
                      public updated_at: Date,
                      public unique?: string,
                      public description?: string) { }


static assign(o: any): Commodity {
  const com = new Commodity(o.id, o.name, new Date(Date.parse(o.created_at)), new Date(Date.parse(o.updated_at)), o.unique, o.description);
  return com;
}

public toString() {
  return '{' +
  ' id:' + this.id +
  ' name:' + this.name +
  ' created_at:' + this.created_at +
  ' updated_at:' + this.updated_at +
  ' unique:' + this.unique +
  ' description:' + this.description + ' }';
}

}
