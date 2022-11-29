# Base image
FROM node:13.12.0-alpine
# make
RUN apk add make
# Set working directory
WORKDIR /app
# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Copy dependency file
COPY package.json ./
# Copy source files
COPY . ./
# Install
RUN make install
# Start NextJS app
CMD ["make", "start"]