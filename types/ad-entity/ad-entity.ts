export interface AdEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;
}

export interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}
