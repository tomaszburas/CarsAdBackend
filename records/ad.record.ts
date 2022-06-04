import { AdEntity, NewAdEntity, SimpleAdEntity } from "../types";
import { ValidationError } from "../utils/errors";
import { FieldPacket } from "mysql2";
import { pool } from "../utils/db";
import { v4 as uuid } from "uuid";

type AdRecordResults = [AdRecord[], FieldPacket[]];

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
      throw new ValidationError(
        "Announcement name cannot be empty and cannot be longer than 100 characters."
      );
    }

    if (obj.description.length > 1000) {
      throw new ValidationError(
        "Announcement description cannot be longer than 1000 characters."
      );
    }

    if (obj.price < 0 || obj.price > 9999999) {
      throw new ValidationError(
        "Announcement price cannot be smaller than 0 and larger than 9 999 999."
      );
    }

    if (!obj.url || obj.url.length > 100) {
      throw new ValidationError(
        "Announcement url cannot be empty and cannot be longer than 100 characters."
      );
    }

    if (typeof obj.lat !== "number" || typeof obj.lon !== "number") {
      throw new ValidationError("Announcement cannot be located.");
    }

    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
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
      "SELECT * FROM `ads` WHERE `name` LIKE :search",
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
      "INSERT INTO `ads` VALUES (:id, :name, :description, :url, :price, :lat, :lon)",
      this
    );
  }
}
