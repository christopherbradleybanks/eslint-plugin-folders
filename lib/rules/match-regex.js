"use strict";

const path = require("path")
const parseFilename = require('../common/parseFilename')

module.exports = function(context) {
    const defaultRegexp = /^([a-z0-9]+)([A-Z][a-z0-9]+)*$/g
    const conventionRegexp = context.options[0] ? context.options[0] : defaultRegexp
    const root = context.options[1]
    return {
        "Program": function(node) {
            const filename = context.getFilename()
            const absoluteFilename = path.resolve(filename)
            const  parsed = parseFilename(absoluteFilename)
            const [,relativePath] = parsed.dir.split(root)
            if(relativePath){
                relativePath.split(path.sep).forEach((directory) => {
                    if(directory){
                        const regex = new RegExp(conventionRegexp)
                        const matchesRegex = regex.test(directory)
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