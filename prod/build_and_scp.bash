#!/bin/bash

ng build

rm -rf ./html
mv ../dist/crepus-web ./html

scp -r ../prod/  crepusculumx@121.36.210.113:/home/crepusculumx/web
