#!/bin/bash

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.7.0/install.sh | sh

echo "source ~/.nvm/nvm.sh" >> ~/.bashrc

source ~/.nvm/nvm.sh

nvm install 0.10
