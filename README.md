# Craft

## Ansible

We use ansible for server config and deployment. [Find installation instructions here](http://docs.ansible.com/ansible/latest/intro_installation.html).

Ansible commands must be run from the `./server` folder.

### Vaults

Secrets are stored in `vault.yml` files. You can edit them with `ansible-vault edit`. e.g. `ansible-vault edit group_vars/staging/vault.yml`

You must have a `.vault_pass` file in the `./server` directory. This contains the password to decrypt the `vault.yml` files. That file should not be commited to the git repo.

### Server

The following command will automatically run through setup on a new server (or update settings on an existing server). Change staging to production to target that host.

```sh
ansible-playbook server.yml -e env=staging
```

### Deployment

The following will deploy from the github master branch to the target server. Change staging to production to target that host.

```sh
ansible-playbook deploy.yml -e env=staging
```

## Development

### Server

I recommend using Valet to serve the app if you're on a mac. https://laravel.com/docs/5.5/valet (There is also a good fork of this for linux https://github.com/cpriego/valet-linux)

You'll also need to have the webpack-dev-server running to continually compile and update the site JS and Sass. `npm run start` from the `./site` directory.

### Assets

We use Webpack to bundle our JS and Sass. See `./site/package.json` for some useful script commands and `./site/assets/build/webpack.config.js` for Webpack settings.

#### Linters

Eslint and Stylelint are both strict JS and Sass linters. The goal is to keep coding style consistent across the app and across different developers.

#### Sass

We use BEM naming conventions http://getbem.com/.

