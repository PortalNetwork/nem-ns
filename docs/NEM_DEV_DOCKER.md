# NEM NIS Docker node setup

## NIS - NEM Infrastructure Server
The NEM Infrastructure Server (short: NIS) was written in Java. It allows you interact with NEM.

## Let's start
For rapid development, NEM officially offers a helper script file to automatically deploy docker container. If you insist on setup docker manually, here is [reference](https://blog.nem.io/nem-docker/). Below is tutorial of using helper script:

1. Download script first
```
mkdir nem-dev
cd nem-dev
curl -q https://raw.githubusercontent.com/rb2nem/nem-dev-guide/master/docker/ndev > ndev
chmod +x ndev
```

2. Execute script
```
$ ./ndev
```

The first time you run the script, it will:

- check if its `settings.sh` file exists, and create it if needed. The user is prompted for values to be provided.
- check if the required docker-compose.yml file is present, and download it from github if needed
- Download docker images from the DockerHub

To check that the containers are running:
```
$ ./ndev --status
```

It will print:
```
running containers are:
nem-dev_nemdevnis_1
nem-dev_nemdevtools_1
```

And open a shell in the NIS container: 
```
$ ./ndev -c nis bash
```
In container shell, check if NIS is running:
```
[root@23627cb63be0 /]# ps aux 
```
This shows that NIS is running (this is the java -Xms512M -Xmx1G ... process).

![psaux](./assets/psaux.png)

If not, type below command:
```
[root@23627cb63be0 /]# supervisorctl start nis
```
You can access the logs of NIS with `tail /var/log/nis-stderr.log -f`:
```
[root@23627cb63be0 /]# tail /var/log/nis-stderr.log -f
```
![NIS](./assets/log.png)

If you see that the NIS instance is communicating with other instances (synchronizing with Node [Hi, I am MedAlice2...) which means our NIS instance is synchronized ongoing. You can start to interact with NEM through [NEM-SDK](https://github.com/QuantumMechanics/NEM-sdk) now.

## Reference
[NEM Official docs](https://docs.nem.io/ja/nem-dev-basics-docker)