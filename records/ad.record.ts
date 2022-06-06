import { AdEntity, NewAdEntity, SimpleAdEntity } from "../types";
import { ValidationError } from "../utils/errors";
import { FieldPacket } from "mysql2";
import { pool } from "../utils/db";
import { v4 as uuid } from "uuid";
import {validationUrl} from "../utils/validation-url";

type AdRecordResults = [AdRecord[], FieldPacket[]];

export class AdRecord implements AdEntity {
  id: string;
  brand: string;
  model: string;
  power: number;
  version: string;
  year: number;
  price: number;
  url: string;
  lat: number;
  lon: number;

  constructor(obj: NewAdEntity) {
    if (!obj.brand || obj.brand.length > 30) {
      throw new ValidationError(
        "Announcement brand name cannot be empty and cannot be longer than 30 characters."
      );
    }

    if (!obj.model || obj.model.length > 30) {
      throw new ValidationError(
        "Announcement model name cannot be empty and cannot be longer than 30 characters."
      );
    }

    if (!obj.price || obj.price < 0 || obj.price > 9999999) {
      throw new ValidationError(
        "Announcement price cannot be empty, smaller than 0 and larger than 9 999 999."
      );
    }

    if (!obj.url || obj.url.length > 500) {
      throw new ValidationError(
        "Announcement url cannot be empty and cannot be longer than 500 characters."
      );
    }

    if (!validationUrl(obj.url)) {
      throw new ValidationError(
          'Announcement url must start with "https://www.otomoto.pl/" or "https://www.olx.pl/".'
      );
    }

    if (obj.version && obj.version.length > 50) {
      throw new ValidationError(
        "Announcement version cannot be longer than 50 characters."
      );
    }

    if (!obj.power) {
      throw new ValidationError("Announcement power cannot be empty.");
    }

    if (!obj.year) {
      throw new ValidationError("Announcement year cannot be empty.");
    }

    if (typeof obj.lat !== "number" || typeof obj.lon !== "number") {
      throw new ValidationError("Announcement cannot be located.");
    }

    this.id = obj.id;
    this.brand = obj.brand;
    this.model = obj.model;
    this.version = obj.version;
    this.year = obj.year;
    this.power = obj.power;
    this.price = obj.price;
    this.url = obj.url;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }

  static async getOne(id: string): Promise<AdRecord | null> {
    const [results] = (await pool.execute(
      "SELECT * from `ads` WHERE id = :id",
      {
        id,
      }
    )) as AdRecordResults;

    return results.length === 0 ? null : new AdRecord(results[0]);
  }

  static async findAll(name: string): Promise<SimpleAdEntity[] | null> {
    const [results] = (await pool.execute(
      "SELECT * FROM `ads` WHERE `brand` LIKE :search",
      {
        search: `%${name}%`,
      }
    )) as AdRecordResults;

    return results.length === 0
      ? null
      : results.map((ad) => {
          const { id, lat, lon } = ad;
          return { id, lat, lon };
        });
  }

  async insert(): Promise<void> {
    if (!this.id) {
      this.id = uuid();
    } else {
      throw new Error("Cannot insert something that is already inserted!");
    }

    await pool.execute(
      "INSERT INTO `ads` VALUES (:id, :brand, :model, :version, :year, :power, :price, :url, :lat, :lon)",
      this
    );
  }
}
