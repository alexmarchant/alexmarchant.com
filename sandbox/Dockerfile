FROM node:lts

# Deps
RUN apt-get update && apt-get install -y zsh

# Setup limited access user
RUN useradd --create-home --shell /bin/zsh stranger
USER stranger
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
USER root
COPY ./home /home/stranger
RUN chown -R stranger:stranger /home/stranger 

# Setup server dir
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN chown -R stranger:stranger /usr/src/app 

USER stranger
EXPOSE 3002
CMD npm run build && npm run prod
