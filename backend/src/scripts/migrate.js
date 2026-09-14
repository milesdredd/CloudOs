import mongoose from "mongoose";
import User from "../model/user.model.js";
import pg from "pg";

const { Client } = pg;

const client = new Client({
    host: "localhost",
    port: 5432,
    database: "cloudDb",
    user: "cloudos",
    password: "milesraj"
});

try {
    await client.connect();
    console.log("PostgreSQL connected");

    await mongoose.connect("mongodb://127.0.0.1:27017/cloudOs");
    console.log("MongoDB connected");

    // Get MongoDB collections directly
    const db = mongoose.connection.db;

    const mongoUsers = db.collection("users");
    const mongoNotes = db.collection("notes");
    const mongoAppLists = db.collection("applists");

    const users = await mongoUsers.find({}).toArray();
    const notes = await mongoNotes.find({}).toArray();
    const applists = await mongoAppLists.find({}).toArray();

    console.log(`Users: ${users.length}`);
    console.log(`Notes: ${notes.length}`);
    console.log(`AppLists: ${applists.length}`);

    await client.query("BEGIN");

    // --------------------------------------------------
    // USERS
    // --------------------------------------------------

    // Map Mongo _id -> custom userid
    const userIdMap = new Map();

    for (const user of users) {
        if (!user.userid) {
            throw new Error(`User ${user._id} has no userid`);
        }

        userIdMap.set(user._id.toString(), user.userid);

        await client.query(
            `
            INSERT INTO users
                (userid, email, password, role, profile, created_at, updated_at)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (userid) DO NOTHING
            `,
            [
                user.userid,
                user.email,
                user.password,
                user.role,
                user.profile,
                user.createdAt,
                user.updatedAt
            ]
        );

        console.log(`User migrated: ${user.userid}`);
    }

    // --------------------------------------------------
    // APPLISTS
    // --------------------------------------------------

    for (const app of applists) {
        await client.query(
            `
            INSERT INTO applists
                (id, name, icon, app_id, created_at, updated_at)
            VALUES
                ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO NOTHING
            `,
            [
                app._id.toString(),
                app.Name,
                app.Icon,
                app.AppId,
                app.createdAt,
                app.updatedAt
            ]
        );

        console.log(`App migrated: ${app.AppId}`);
    }

    // --------------------------------------------------
    // NOTES
    // --------------------------------------------------

    for (const note of notes) {
        const userid = userIdMap.get(note.userId.toString());

        if (!userid) {
            throw new Error(
                `Could not find user for note ${note._id}`
            );
        }

        await client.query(
            `
            INSERT INTO notes
                (id, title, content, markdown, userid, created_at, updated_at)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (id) DO NOTHING
            `,
            [
                note._id.toString(),
                note.title,
                note.content,
                note.markdown,
                userid,
                note.createdAt,
                note.updatedAt
            ]
        );

        console.log(`Note migrated: ${note.title}`);
    }

    await client.query("COMMIT");

    console.log("\nMigration completed successfully!");
    console.log(`Users migrated: ${users.length}`);
    console.log(`AppLists migrated: ${applists.length}`);
    console.log(`Notes migrated: ${notes.length}`);

} catch (err) {
    try {
        await client.query("ROLLBACK");
    } catch { }

    console.error("\nMigration failed:");
    console.error(err);

} finally {
    await mongoose.disconnect();
    await client.end();

    console.log("Connections closed.");
}