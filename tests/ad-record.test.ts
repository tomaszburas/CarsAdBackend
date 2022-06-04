import { AdRecord } from "../records/ad.record";

const ad = new AdRecord({
  name: "Test",
  description: "Test description",
  url: "https://example.com",
  price: 10,
  lat: 3,
  lon: 8,
});

test("Can build AdRecord", () => {
  expect(ad.name).toBe("Test");
  expect(ad.name.length).toBeLessThan(100);
  expect(typeof ad.lat).toBe("number");
  expect(ad.url).toContain("https://");
});
