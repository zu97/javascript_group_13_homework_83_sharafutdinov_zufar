const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    avatarAllowedTypes: ['.png', '.gif', '.jpg', '.jpeg'],
    mongoConfig: {
        url: 'mongodb://localhost/hw83_zush',
        options: { useNewUrlParser: true }
    }
};