import express, { Request, Response } from 'express'
import promClient from 'prom-client'

const main = () => {
    const app = express()
    const homeRequestsNumCounter = new promClient.Counter({
        name: 'home_requests_num',
        help: 'Number of requests to /home route',
    });

    // collect default metrics like CPU/heap/event loop stats
    promClient.collectDefaultMetrics();
    app.get('/metrics', async function (req: Request, res: Response) {
        const metrics = await promClient.register.metrics()
        res.set('Content-Type', promClient.register.contentType)
        res.send(metrics);
    })

    app.get('/home', function (req: Request, res: Response) {
        // business logic
        homeRequestsNumCounter.inc()
        res.send('Hello World!');
    });
    app.listen(3000);
    console.log('Server started on port 3000');
}

main()