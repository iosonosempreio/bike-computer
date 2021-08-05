Install termux and termux api from F-Droid
open Termux

Install again termux api
```pkg install termux-api```

TUrn off battery optimization for both the apps

Install git
```pkg install git```

Install nodejs
```pkg install nodejs```

Clone repo
```https://github.com/iosonosempreio/bike-computer.git```

I also had to run pkg install termux-api, otherwise termux location did not work https://wiki.termux.com/wiki/Termux-location

Use location: https://stackoverflow.com/questions/44975081/access-android-geolocation-using-node-js-under-termux



remote access to device via ftp / ssh: https://wiki.termux.com/wiki/Remote_Access

Starting and stopping OpenSSH server
Since Termux does not use initialization system, services are started manually from command line.
To start OpenSSH server, you need to execute this command:
```sshd```
If you need to stop `sshd`, just kill it's process:
```pkill sshd```




If location -r updates don't work, seeker looks like a solution: https://github.com/thewhiteh4t/seeker