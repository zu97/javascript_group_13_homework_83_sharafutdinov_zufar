const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    avatarAllowedTypes: ['.png', '.gif', '.jpg', '.jpeg'],
    mongoConfig: {
        url: 'mongodb://localhost/hw83_zush',
        options: { useNewUrlParser: true }
    },
    facebook: {
        appId: '647634579666946',
        appSecret: '007f10c1d05afba74481f1ff3647e327'
    },
    google: {
        appId: '100603535689-v40d9bfb8p4q6bamicrckn5ttcjao19j.apps.googleusercontent.com',
        appSecret: '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'
    }
};