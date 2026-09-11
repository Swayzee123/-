@echo off
:loop
"C:\Users\swpoe\AppData\Roaming\npm\lt.cmd" --port 8080
timeout /t 5 /nobreak >nul
goto loop
