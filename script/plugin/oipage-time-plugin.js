const fs = require("fs");
const { deleteSync, listFileSync, copySync } = require("devby");

let pluginName = "OIPageTimePlugin";

class OIPageTimePlugin {

    apply(compiler) {

        compiler.hooks.beforeRun.tap(
            pluginName, () => {

                if (fs.existsSync(process.env.OIPAGE_CACHE)) {
                    deleteSync(process.env.OIPAGE_CACHE);
                }

            }
        );

        compiler.hooks.afterEmit.tap(
            pluginName, () => {

                if (process.env.OIPAGE_PLATFORM != "h5") {
                    if (fs.existsSync(process.env.OIPAGE_CACHE)) {
                        listFileSync(process.env.OIPAGE_CACHE, function (filepath) {
                            copySync(filepath.path, filepath.path.replace(process.env.OIPAGE_CACHE, process.env.OIPAGE_DIST));
                        });
                        deleteSync(process.env.OIPAGE_CACHE);
                    }
                }

            }
        );

    }

}

module.exports = OIPageTimePlugin;