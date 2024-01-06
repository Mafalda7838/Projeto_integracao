import sqlite3 from "sqlite3";
import { Database } from "sqlite";
import { open } from "sqlite";

export async function connectDatabase(): Promise<Database> {
    const db = await open({
        filename: "database.db",
        driver: sqlite3.Database,
    })

    await db.run("PRAGMA foreign_keys = ON;")

    return undefined;
}

export async function migrate(db:Database) {
    await db.migrate();
    
}

