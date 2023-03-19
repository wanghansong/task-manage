import { createConnection, Connection } from 'typeorm';
import 'reflect-metadata';
import config from './ormconfig';

export default class Database {
    private connection: Connection;

    constructor() {
        this.init();
    }

    public async init(): Promise<void> {
        this.connection = await createConnection(config as any);

        if (this.connection.isConnected) {
            this.connection.synchronize();
        }
    }

}