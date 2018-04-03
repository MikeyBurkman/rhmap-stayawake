# rhmap-stayawake
Import this module to keep your rhmap app from ever falling asleep due to inactivity.

### Why?
RHMAP will automatically suspend an app if hasn't gotten any requests in a while. It will wake up as soon as it gets a request, but if you have long-running processes/crons on the server, they may get interrupted. This prevents the app from getting suspended.

### Usage
```js
require('rhmap-keepawake')();
```
That's it!

### How does it work?
It simply pings this server every 30 minutes so that the app never goes without incoming requests for too long.
