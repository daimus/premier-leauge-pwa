import { openDB } from 'idb';

const db = openDB('Premier Leauge', 1, {
    upgrade(db) {
        const store = db.createObjectStore('teams', {
            keyPath: 'id',
            autoIncrement: true,
        });
        store.createIndex('name', 'name');
    }
});

export const add = async (team) => {
    return (await db).add('teams', team);
}

export const getAll = async () => {
    return (await db).getAll('teams');
}

export const get = async (teamId) => {
    return (await db).get('teams', teamId);
}

export const destroy = async (teamId) => {
    return (await db).delete('teams', teamId);
}