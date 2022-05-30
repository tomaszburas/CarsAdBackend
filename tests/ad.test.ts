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

test('Added new AdRecord to database', async () => {
    const ad = {
        name: 'BMW',
        description: 'M3',
        price: 122000.22,
        lat: 52.232938,
        lon: 21.0611941,
        url: 'https//allegro.pl'
    }

    const addedAd = new AdRecord(ad);
    await addedAd.insert();


})

test('AdRecord returns data from database for all entry', async () => {
    const ads = await AdRecord.getAll();

    if (!ads.length) {
        expect(ads).toBeNull();
    }
})
