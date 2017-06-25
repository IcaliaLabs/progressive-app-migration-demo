# 1: Use node 6.9.0 as base:
FROM node:6.9.0

# 2: We'll set the application path as the working directory
WORKDIR /usr/src/app

# 3: We'll add the app's binaries path to $PATH:
ENV PATH=/usr/src/app/bin:$PATH

# 4: Install ember-cli and friends:
RUN set -ex && npm install -g ember-cli bower yarn

# The previous command was broken into two parts, so the dev.Dockerfile and the Dockerfile would
# share the exact same base... now on to installing phantomjs and check-dependencies:

# 5: Install PhantomJS and check-dependencies:
RUN set -ex && npm install -g phantomjs-prebuilt check-dependencies

# 6: Install watchman:
RUN set -ex \
  && export WATCHMAN_VERSION=4.7.0 \
  && curl -SL "https://github.com/facebook/watchman/archive/v${WATCHMAN_VERSION}.tar.gz" | tar -xz -C /tmp/ \
  && cd /tmp/watchman-${WATCHMAN_VERSION} \
  && ./autogen.sh \
  && ./configure \
  && apt-get update && apt-get install -y --no-install-recommends python-dev \
  && make \
  && make install \
  && apt-get purge -y --auto-remove python-dev \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /tmp/*

# 7: Expose the app and live-reload ports:
EXPOSE 4200 35730

# 8: Set the default command:
CMD ["ember", "server", "--live-reload-port", "35730"]
