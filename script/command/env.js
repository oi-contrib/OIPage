const path = require('path');

module.exports = function (parsed) {
    process.env.OIPAGE_MODE = parsed.mode;
    process.env.OIPAGE_PLATFORM = parsed.platform;
    process.env.OIPAGE_ROOT = path.resolve(process.cwd(), parsed.root, "./");
    process.env.OIPAGE_DIST = path.resolve(process.env.OIPAGE_ROOT, "./dist", parsed.mode == "production" ? "build" : "dev", parsed.platform);
    process.env.OIPAGE_CACHE = path.resolve(process.cwd(), "./node_modules/.cache/OIPage");
};