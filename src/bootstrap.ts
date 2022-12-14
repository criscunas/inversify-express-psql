import dotenv from 'dotenv'
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import { Container } from 'inversify';
import { bindings } from './postgres/inversify.config';
import './controller/welcome'


(async () => {

    dotenv.config()

    const container = new Container()
    await container.loadAsync(bindings)

    let server = new InversifyExpressServer(container)

    server.setConfig((app) => {
        app.use(bodyParser.urlencoded({
            extended: true
          }));
        app.use(bodyParser.json());
    });

    let app = server.build();
    
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server started at ${process.env.SERVER_PORT}`)
    });
})();


