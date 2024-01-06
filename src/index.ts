import express from "express";
import { connectDatabase, migrate } from "./repository/database.js";
import { PersonRepository } from "./repository/person.repository.js";
import { BookRepository} from "./repository/book.repository.js";
import { PersonController } from "./controller/person.controller.js";

console.log("💾 Connecting to database");
const db = await connectDatabase();

console.log("🏃‍♂️ Executing migrations");
await migrate(db)

console.log("📚 Initializing repositories")
const personRepository = new PersonRepository(db)
const bookRepository = new BookRepository(db)

console.log("🚪 Initializing controller")
const personController = new PersonController( personRepository, bookRepository);


console.log("🔨 configuring express");
const api: express.Express = express();
const port = 3000;
api.use(express.json())

console.log("🧭 Registering routes");
api.get("/person", personController.findPersons())
api.post("/person", personController.addPersons())
api.put("/person/:personID", personController.updatePerson())
api.delete("/person/:personID", personController.deletePersons())

console.log("✈️ Starting express");
api.listen(port, () => {
    console.log('💡 Express JS listening on port ${port}');
})


