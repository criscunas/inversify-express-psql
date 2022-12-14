import { Sequelize } from 'sequelize-typescript';

export async function getDbConnection() {
    const sequelize = new Sequelize(
        // process.env.PG_DB_NAME,
        // process.env.PG_USER,
        // process.env.PG_PASSWORD,
        // {
        //     host: process.env.PG_HOST,
        //     port: Number(process.env.PG_PORT),
        //     dialect:'postgres'
        // }
        process.env.D_PG_DB_NAME,
        process.env.D_PG_USER,
        process.env.D_PG_PASSWORD,
        {
            host: process.env.D_PG_HOST,
            port: Number(process.env.D_PG_PORT),
            dialect: "postgres",
        }
    );

    try {
        await sequelize.authenticate()
        console.log(`Connected to ${process.env.D_PG_DB_NAME}`)
    } catch (error) {
        console.error('Unable to connect' + error)
    }

    await sequelize.sync({
        force: true,
    })

    return sequelize
}
