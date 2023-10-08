#!/bin/bash

echo 'Bootstraping Application'

sh ./start-server.sh & sh ./start-client.sh
