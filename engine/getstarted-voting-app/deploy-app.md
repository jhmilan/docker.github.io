---
description: Setup for voting app example
keywords: multi-container, services, swarm mode, cluster, voting app, docker-stack.yml, docker stack deploy
title: Deploy the application
---

In these steps, you'll use the `docker-stack.yml` file to
deploy the voting application to the swarm you just created.

## Copy docker-stack.yml to the manager

The `docker-stack.yml` file must be located on a manager for the swarm where you want to deploy the application stack.

1.  Get `docker-stack.yml` either from the [source code in the lab](https://github.com/docker/example-voting-app/blob/master/docker-stack.yml) or by copying it from the example given [here](https://docs.docker.com/engine/getstarted-voting-app/#/docker-stackyml-deployment-configuration-file).

    If you prefer to download the file directly from our GitHub
    repository rather than copy it from the documentation, you can use a tool like `curl`. This command downloads the raw file to the current directory on your local host. You can copy-paste it into your shell if you have `curl`:

    ```
     curl -o docker-stack.yml https://raw.githubusercontent.com/docker/example-voting-app/master/docker-stack.yml
    ```

    >**Tips:**
    >
    *  To get the URL for the raw file on GitHub, either use the link in the example command above, or go to the file on GitHub [here](https://github.com/docker/example-voting-app/blob/master/docker-stack.yml), then click **Raw** in the upper right.
    *  You might already have `curl` installed. If not, you can [get curl here](https://curl.haxx.se/).

2.  Copy `docker-stack.yml` from your host machine onto the manager.

    ```
    $ docker-machine scp ~/sandbox/voting-app/docker-stack.yml manager:/home/docker/.
    docker-stack.yml                                                                      100% 1558     1.5KB/s   00:00
    ```

3.  Log into the manager node.

    ```
    $ docker-machine ssh manager
    ```

    The `ssh` login should put you in `/home/docker/` by default.

4.  Check to make sure that the `.yml` file is there, using `ls`.

    ```
    docker@manager:~$ ls /home/docker/
    docker-stack.yml
    ```

    You can use `vi` or `cat` to inspect the file.

## Deploy the app

We'll deploy the application from the manager.

1.  Deploy the application stack based on the `.yml` using the command `docker stack deploy` as follows.

    ```
    docker stack deploy --compose-file docker-stack.yml vote
    ```

    Here is an example of the command and the output.

    ```
    docker@manager:~$ docker stack deploy --compose-file docker-stack.yml vote
    Creating network vote_default
    Creating network vote_backend
    Creating network vote_frontend
    Creating service vote_result
    Creating service vote_worker
    Creating service vote_visualizer
    Creating service vote_redis
    Creating service vote_db
    Creating service vote_vote
    ```

2.  Verify that the stack deployed as expected with `docker stack services <APP-NAME>`. It could take a long while (see 2.1)

    ```
    docker@manager:~$ docker stack services vote
    ID            NAME             MODE        REPLICAS  IMAGE
    0y3q6lgc0drn  vote_result      replicated  2/2       dockersamples/examplevotingapp_result:before
    fvsaqvuec4yw  vote_redis       replicated  2/2       redis:alpine
    igev2xk5s3zo  vote_worker      replicated  1/1       dockersamples/examplevotingapp_worker:latest
    vpfjr9b0qc01  vote_visualizer  replicated  1/1       dockersamples/visualizer:stable
    wctxjnwl22k4  vote_vote        replicated  2/2       dockersamples/examplevotingapp_vote:before
    zp0zyvgaguox  vote_db          replicated  1/1       postgres:9.4
    ```

2.1. It could take a long while replicating the nodes because images need to be downloaded, you can run `docker stack ps vote`

    ```
    $ docker stack ps vote
    ID            NAME               IMAGE                                         NODE     DESIRED STATE  CURRENT STATE             ERROR  PORTS
    ys32v6r3k6wo  vote_visualizer.1  dockersamples/visualizer:stable               manager  Running        Preparing 25 minutes ago
    z418vpsnrzxt  vote_worker.1      dockersamples/examplevotingapp_worker:latest  manager  Running        Preparing 25 minutes ago
    78yrmvtycvs5  vote_result.1      dockersamples/examplevotingapp_result:before  worker   Running        Running 3 minutes ago
    ptj490z8sqb6  vote_vote.1        dockersamples/examplevotingapp_vote:before    worker   Running        Running 16 minutes ago
    nl4451ovks0a  vote_db.1          postgres:9.4                                  manager  Running        Running 6 minutes ago
    vwncli57w1p0  vote_redis.1       redis:alpine                                  worker   Running        Running 23 minutes ago
    iyqvq5x4vrat  vote_vote.2        dockersamples/examplevotingapp_vote:before    manager  Running        Running 10 minutes ago
    u6xha96kiw09  vote_redis.2       redis:alpine                                  manager  Running        Running 22 minutes ago
    ```

## What's next?

In the next steps, we'll view components of the running app
on web pages, and [take the app for a test drive](test-drive.md).
