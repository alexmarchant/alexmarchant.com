FROM node:lts

# Deps
RUN apt-get update && apt-get install -y zsh

# Setup server dir
WORKDIR /usr/src/app
RUN chmod 555 /usr/src/app
COPY package.json package-lock.json ./
RUN npm install

# Setup limited access user
RUN useradd --create-home --shell /bin/zsh stranger
USER stranger
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
COPY ./home /home/stranger

EXPOSE 3002
CMD [ "npm", "build", "&&", "node", "./dist/index.js" ]
