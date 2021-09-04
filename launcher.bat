Echo off
title Barbie - DevOp
color 4
cls
Echo Barbie DevOps - API
Echo ============================================================================
Echo 1 Install Modules           Installs Required modules to load app!  (AFTER INSTALL RELAUNCH APP)          
Echo 2 Download NODEJS           Downloads NODEJS (Windows/Default Browser)
Echo 3 Start Node App            Launches Gen on [PORT Specified] - DC API
Echo 4 Exit Launcher/Close       Closes this menu
Echo ============================================================================
Choice /C 1234 /M "Select a choice below "

If Errorlevel 4 Goto 4
If Errorlevel 3 Goto 3
If Errorlevel 2 Goto 2
If Errorlevel 1 Goto 1

Goto End


:4
:End

:3
npm run start
pause
:End

:2
start   https://nodejs.org/dist/v10.13.0/node-v10.13.0-x64.msi
pause
:End

:1
npm i
pause
:End
