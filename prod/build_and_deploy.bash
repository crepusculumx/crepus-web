#!/bin/bash

ng build

rm -rf ./html
mv ../dist/crepus-web ./html

ssh crepusculumx@121.36.210.113 rm -rf /home/crepusculumx/web

scp -r ../prod/  crepusculumx@121.36.210.113:/home/crepusculumx/web

ssh crepusculumx@121.36.210.113 "bash /home/crepusculumx/web/podman_run.prod.bash nginx"
