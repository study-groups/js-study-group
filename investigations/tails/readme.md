# Tails

Tails is an application for viewing, searching and reacting
to multiple log files found in a distributed system.

## Motivation
[Serverless computing](https://en.wikipedia.org/wiki/Serverless_computing) 
is commonly thought of as 
"function as as service"
which requires an arbitrary application to connect 
to multiple servers using a server protocol like HTTP. 

In other words, serverless computing is more a 
scheme for dividing work on many servers. Ironically,
'serverless' makes the job of managing servers 
much harder for the provider (Amazon, Google)
 but adds value by providing well-tuned
platform for running arbitrary stateless functions
whose time and memory complexity can be scaled,
monitored and monetized.

## What tails provides
Tails provides a single web-based dashboard for monitoring
distributed logs in real time. It takes its name from
 the Unix command tail, as in, `tail /var/log/syslog`. 

## Architecure
- NodeJs server
- Hosted on Vercel and Digital Ocean 
- Websockets communication to client
- In **Unix**, run tail on:
  - /var/log/ssh/access.log
  - /var/log/nginx/access.log
  - /var/log/nginx/error.log
  - /var/log/tails/access.log
  - /var/log/messages
  - /var/log/syslog

- In **Vercel**, query:
  - [serverless-functions](https://vercel.com/docs/serverless-functions/introduction)
  - [log-drain](https://vercel.com/integrations/sematext-log-drain)
  - [logdna](https://logdna.com/)

### Future
- Prototype log parser for future log transformer
- Pub/Sub (when X happens, do Y)
- Couple to a data lake for object rehydration

## Resources
- https://vercel.com/docs/serverless-functions/introduction
- https://vercel.com/integrations/sematext-log-drain
- https://blog.treasuredata.com/blog/2016/08/03/distributed-logging-architecture-in-the-container-era/
- https://vercel.com/integrations
