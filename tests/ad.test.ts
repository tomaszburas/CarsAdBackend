import {AdRecord} from "../records/ad.record";

test('AdRecord returns data from database for one entry', async () => {
    const ad = await AdRecord.getOne('123abc');

    expect(ad).toBeDefined();
    expect(ad.id).toBe('123abc');
    expect(ad.description).toBe('Test description');
    expect(ad.price).toBe(10.2);
})

test('AdRecord returns null from database for unexisting entry', async () => {
    const ad = await AdRecord.getOne('12121ds');

    expect(ad).toBeNull();
})
