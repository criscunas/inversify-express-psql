import { AsyncContainerModule } from "inversify";
import { getDbConnection } from "./db";

export const bindings = new AsyncContainerModule(async() => {
    await getDbConnection()
})