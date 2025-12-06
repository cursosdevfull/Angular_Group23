export interface IDragonBall {
  items: Item[];
  meta: Meta;
  links: Links;
}

export interface Item {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: Gender;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: null;
  originPlanet?: {
    id: number;
    name: string;
    isDestroyed: boolean;
    description: string;
    image: string;
    deletedAt: null;
  };
  transformations?: [
    {
      id: number;
      name: string;
      image: string;
      ki: string;
      deletedAt: null;
    },
  ];
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
}

export interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
