# NEM NIS Docker node setup

## NIS - NEM Infrastructure Server
The NEM Infrastructure Server (short: NIS) was written in Java. It allows you interact with NEM.

## Let's start
For rapid development, NEM officialy offers a helper script file to automatically deploy docker container. If you insist on setup docker manually, here is [reference](https://blog.nem.io/nem-docker/). Below is tutorial of using helper script:

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
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.4  0.0  18240  3332 ?        Ss   13:09   0:00 bash
root        18  0.1  0.4  56200 15436 ?        Ss   13:09   0:00 /usr/bin/python /usr/bin/supervisord -c /etc/supervisord.conf
nem         23  305  8.3 3608648 320760 ?      Sl   13:09   0:15 java -Xms512M -Xmx1G -cp .:./*:../libs/* org.nem.deploy.CommonStarter
root        41  0.0  0.0  34424  2784 ?        R+   13:09   0:00 ps aux
```
This shows that NIS is running (this is the java -Xms512M -Xmx1G ... process).

If not, type below command:
```
[root@23627cb63be0 /]# supervisorctl start nis
```
You can access the logs of NIS with `tail /var/log/nis-stderr.log -f`:
```
[root@23627cb63be0 /]# tail /var/log/nis-stderr.log -f
2018-09-14 10:18:35.670 INFO synchronizing with Node [TBR2PTTGTINUOW5ENEXYWPIITRJ6XTVVZNYNUCMP <TBR2PTTGTINUOW5ENEXYWPIITRJ6XTVVZNYNUCMP>] @ [80.240.29.150] finished (org.nem.peer.services.NodeSynchronizer b)
2018-09-14 10:18:38.672 INFO synchronizing with Node [Hi, I am MedAlice2 <TALIC37AGCDGQIBK3Y2IPFHSRAJ4HLJPNJDTSTJ7>] @ [23.228.67.85] (org.nem.peer.services.NodeSynchronizer b)
2018-09-14 10:18:44.777 INFO received 400 blocks (12 transactions) in 4786 ms from remote (398833 ?s/tx) (org.nem.nis.sync.BlockChainUpdater c)
2018-09-14 10:18:44.908 INFO clustering completed: { clusters: 2 (average size: 10.50), hubs: 0, outliers: 523 } (org.nem.nis.pox.poi.PoiContext$AccountProcessor dh)
2018-09-14 10:18:44.910 INFO Iterations required: 6; converged?: true (org.nem.nis.cx.na.qcw run)
2018-09-14 10:18:44.911 INFO POI iterator needed 2ms. (org.nem.nis.pox.poi.PoiImportanceCalculator c)
2018-09-14 10:18:45.110 INFO validated 400 blocks (12 transactions) in 327 ms (27250 ?s/tx) (org.nem.nis.sync.BlockChainUpdateContext fz)
2018-09-14 10:18:45.111 INFO new block's score: 11226358709252895 (org.nem.nis.sync.BlockChainUpdateContext a)
2018-09-14 10:18:45.611 INFO chain update of 400 blocks (12 transactions) needed 499 ms (41583 ?s/tx) (org.nem.nis.sync.BlockChainUpdateContext fz)
2018-09-14 10:18:45.619 INFO synchronizing with Node [Hi, I am MedAlice2 <TALIC37AGCDGQIBK3Y2IPFHSRAJ4HLJPNJDTSTJ7>] @ [23.228.67.85] finished (org.nem.peer.services.NodeSynchronizer b)
2018-09-14 10:18:48.622 INFO synchronizing with Node [do-nem <TBQWT47B5GHLSGKX7CMKNPDAX2DA6MNQ7HZ3ATSI>] @ [178.62.61.222] (org.nem.peer.services.NodeSynchronizer b)
2018-09-14 10:18:51.583 INFO received 400 blocks (4 transactions) in 887 ms from remote (221750 ?s/tx) (org.nem.nis.sync.Blo
```

If you see that the NIS instance is communicating with other instances (synchronizing with Node [Hi, I am MedAlice2...) which means our NIS instance is synchronized ongoing. You can start to interact with NEM through [NEM-SDK](https://github.com/QuantumMechanics/NEM-sdk) now.