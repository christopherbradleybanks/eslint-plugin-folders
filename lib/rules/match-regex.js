"use strict";

const path = require("path")
const parseFilename = require('../common/parseFilename')

module.exports = function(context) {
    const defaultRegexp = /^([a-z0-9]+)([A-Z][a-z0-9]+)*$/g
    const conventionRegexp = context.options[0] ? new RegExp(context.options[0], 'g') : defaultRegexp
    const root = context.options[1]
    return {
        "Program": function(node) {
            const filename = context.getFilename()
            const absoluteFilename = path.resolve(filename)
            const  parsed = parseFilename(absoluteFilename)
            const [,relativePath] = parsed.dir.split(root)
            if(relativePath){
                relativePath.split(`\/`).forEach((directory) => {
                    if(directory){
                        const  matchesRegex = conventionRegexp.test(directory)
                        if (!matchesRegex) {
                            context.report(node, "FolderName '{{name}}' in path '{{path}}' does not match the naming convention.", {
                                name: directory,
                                path: relativePath
                            });
                        }
                    }

                })
            }

        }
    };
};