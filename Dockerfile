FROM node:7

RUN apt-get update;

# install Chrome
RUN apt-get install -y curl

RUN curl -sL https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - ;\
    echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list.d/google.list ;\
    echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" >> /etc/apt/sources.list.d/oracle.list ;\
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys EEA14886 ;\
    apt-get update

RUN apt-get install -y google-chrome-stable

# install Firefox 46
RUN apt-get install -y wget tar
RUN wget -O /usr/local/firefox-46.0.1.tar.bz2 http://ftp.mozilla.org/pub/mozilla.org/firefox/releases/46.0.1/linux-x86_64/en-US/firefox-46.0.1.tar.bz2
RUN tar xvjf /usr/local/firefox-46.0.1.tar.bz2 -C /usr/local
RUN ln -s /usr/local/firefox/firefox /usr/bin/firefox

RUN apt-get install -y xvfb

RUN echo 'oracle-java8-installer shared/accepted-oracle-license-v1-1 boolean true' | debconf-set-selections ;\
    DEBIAN_FRONTEND=noninteractive apt-get install -y oracle-java8-installer

WORKDIR /usr/src

ADD package.json .

RUN npm install -ddd

ADD . .
