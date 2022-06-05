export interface SimpleAdEntity {
  id: string;
  lat: number;
  lon: number;
}

export interface AdEntity extends SimpleAdEntity {
  brand: string;
  model: string;
  version: string;
  year: number;
  power: number;
  price: number;
  url: string;
}

export interface NewAdEntity extends Omit<AdEntity, "id"> {
  id?: string;
}
