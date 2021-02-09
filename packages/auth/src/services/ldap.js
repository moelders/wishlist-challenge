const { createClient } = require('ldapjs');
const { getError } = require('../errors');

module.exports = function(host, port, domain) {
  const _domain = domain.toLowerCase();
  const _client = createClient({
    url: `ldap://${ host }:${ port }/OU=EMUser,DC=${ _domain },DC=adsint,DC=biz`
  });

  async function bind(userId, pass) {
    return new Promise((resolve, reject) => {
      _client.bind(`${ _domain }\\${ userId }`, pass, (error) => {
        if (error) {
          reject(getError('unauthorized'));
        } else {
          resolve();
        }
      });
    });
  }

  async function search(userId) {
    return new Promise((resolve, reject) => {
      _client.search(`OU=EMUser,DC=${ _domain },DC=adsint,DC=biz`, {
        filter: `(sAMAccountName=${ userId })`,
        scope: 'sub',
        attributes: [ 'objectGUID', 'displayName', 'userPrincipalName' ]
      }, (error, emitter) => {
        if (error) {
          reject(getError('unauthorized'));
        } else {
          emitter.on('searchEntry', (entry) => {
            const user = entry.object;

            resolve({
              userName: userId,
              fullName: user.displayName,
              mail: user.userPrincipalName
            });
          });

          emitter.on('error', () => reject(getError('unauthorized')));
          emitter.on('end', () => reject(getError('invalidUser')));
        }
      });
    });
  }

  async function getUser(userId, pass) {
    return bind(userId, pass).then(async () => search(userId));
  }

  return {
    getUser
  };
};
