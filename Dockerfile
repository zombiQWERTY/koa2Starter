FROM mhart/alpine-node

MAINTAINER Pavel Zinovev zombiqwerty@yandex.ru

ENV workdir /home/apps/app
WORKDIR ${workdir}

COPY ./package.json ${workdir}/package.json
COPY ./src ${workdir}/src
COPY ./test ${workdir}/test
COPY ./data ${workdir}/data
COPY ./bin ${workdir}/bin
COPY ./package.json ${workdir}

RUN echo "http://dl-2.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories; \
    echo "http://dl-3.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories; \
    echo "http://dl-4.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories; \
    echo "http://dl-5.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories; \

    apk add --update -U make gcc g++ python git bash && \
    rm -rf /var/cache/apk/* && \
    npm install -g nodemon yarn

EXPOSE 8080/tcp
