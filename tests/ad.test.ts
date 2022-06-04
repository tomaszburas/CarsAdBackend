import { AdRecord } from "../records/ad.record";
import { pool } from "../utils/db";

afterAll(async () => {
  await pool.execute("DELETE FROM `ads` WHERE `name` LIKE '[Test]%'");
  await pool.end();
});

test("AdRecord returns data from database for one entry", async () => {
  const ad = await AdRecord.getOne("123abc");

  expect(ad).toBeDefined();
  expect(ad.id).toBe("123abc");
  expect(ad.description).toBe("Test description");
  expect(ad.price).toBe(10.2);
});

test("AdRecord returns null from database for unexisting entry", async () => {
  const ad = await AdRecord.getOne("12121ds");

  expect(ad).toBeNull();
});

test("Added new record to database", async () => {
  const ad = {
    name: "[Test] BMW",
    description: "M3",
    price: 122000.22,
    lat: 52.232938,
    lon: 21.0611941,
    url: "https//allegro.pl",
  };

  const addedAd = new AdRecord(ad);
  await addedAd.insert();

  expect(addedAd.id).toBeDefined();
  expect(typeof addedAd.id).toBe("string");
});

test("AdRecord.findAll returns data from database for search string", async () => {
  const ads = await AdRecord.findAll("------------------------");

  expect(ads).toBeNull();
});
