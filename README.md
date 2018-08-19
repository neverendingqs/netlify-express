# Express.js on Netlify Example

[![Deploy to
Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/neverendingqs/netlify-express)

An example of how to host an Express.js app on Netlify using
[serverless-http](https://github.com/dougmoscrop/serverless-http). See
[express/server.js](express/server.js) for details.

Express.js app is hosted at `/.netlify/functions/server`. Examples of how to
access the different routes:

```sh
curl <domain>/.netlify/functions/server
curl <domain>/.netlify/functions/server/another
curl --header "Content-Type: application/json" --request POST --data '{"json":"POST"}' <domain>/.netlify/functions/server
```
