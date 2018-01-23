FROM selenium/standalone-chrome

WORKDIR /usr/src

RUN sudo apt-get update ;\
    sudo apt-get install -y curl xvfb git

RUN curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

RUN sudo apt-get -y install nodejs

COPY --chown=seluser:seluser package.json /usr/src/app/

WORKDIR /usr/src/app

RUN npm install -dddd

COPY --chown=seluser:seluser . /usr/src/app

