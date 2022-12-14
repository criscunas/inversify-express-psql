import { Sequelize } from 'sequelize-typescript';

export async function getDbConnection() {
    const sequelize = new Sequelize(
        process.env.D_PG_DB_NAME || "db",
        process.env.D_PG_USER || "user",
        process.env.D_PG_PASSWORD || "pass",
        {
            host: process.env.D_PG_HOST || "postgres",
            port: Number(process.env.D_PG_PORT) || 5432,
            dialect: "postgres",
        }
    );

    try {
        await sequelize.authenticate()
        console.log(`Connected to database`)
    } catch (error) {
        console.error('Unable to connect' + error)
    }

    await sequelize.sync({
        force: true,
    })

    return sequelize
}
