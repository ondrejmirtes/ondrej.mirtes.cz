FROM alpine:3.8

ENV LANG C.UTF-8
ENV BUILD_PACKAGES \
	bash curl-dev ruby-dev build-base nodejs libffi-dev libxml2 libxslt \
	libxslt-dev libxml2-dev zlib-dev zlib git
ENV RUBY_PACKAGES ruby ruby-io-console ruby-bundler ruby-rdoc ruby-irb
ENV JAVA_HOME=/usr/lib/jvm/default-jvm

ENV PATH=$PATH:$JAVA_HOME/jre/bin:$JAVA_HOME/bin \
    LANG=C.UTF-8

#####################################################################
## Install packages
#####################################################################
RUN apk update && \
        apk upgrade && \
        apk add --no-cache $BUILD_PACKAGES && \
    apk add --no-cache $RUBY_PACKAGES && \
    apk add --no-cache curl python2 && \
    apk add --no-cache openjdk8 && \
    apk add --no-cache ruby-webrick && \
    gem install bundler && \
        curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py && \
        ln -sf /usr/bin/python2 /usr/bin/python && \
        python get-pip.py && \
        pip install --upgrade pip && \
        rm get-pip.py && \
        python -m pip install Pygments


#####################################################################
## Install ruby dependencies
#####################################################################
RUN bundle config --global frozen 1

RUN mkdir -p /usr/install && mkdir -p /usr/deploy

WORKDIR /usr/install

COPY Gemfile /usr/install/
COPY Gemfile.lock /usr/install/
RUN bundle install

WORKDIR /usr/deploy
