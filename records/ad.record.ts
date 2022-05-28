import {AdEntity} from "../types";
import {ValidationError} from "../utils/errors";

interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}

export class AdRecord implements AdEntity {
    id: string;
    name: string;
    price: number;
    description: string;
    url: string;
    lat: number;
    lon: number;

    constructor(obj: NewAdEntity) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('Announcement name cannot be empty and cannot be longer than 100 characters.');
        }

        if (obj.description.length > 1000) {
            throw new ValidationError('Announcement description cannot be longer than 1000 characters.');
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Announcement price cannot be smaller than 0 and larger than 9 999 999.')
        }

        if (!obj.url || obj.url.length > 100) {
            throw new ValidationError('Announcement url cannot be empty and cannot be longer than 100 characters.');
        }

        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Announcement cannot be located.')
        }

        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

}