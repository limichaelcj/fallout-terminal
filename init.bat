@echo off

SET port=8080
if exist %1 set port=%1
start chrome http://localhost:%port%
http-server -c-1 -p %port%