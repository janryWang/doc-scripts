import program from "commander"
import fs from "fs-extra"
import path from "path"
import chalk from "chalk"
import log from "./log"

export const execute = async (cmd, options, webpackConfig) => {
    const script = `./scripts/${cmd}.js`
    try {
        await fs.access(path.resolve(__dirname, script))
    } catch (e) {
        throw chalk.red(`"doc-scripts ${cmd}" is invalid command.`)
    }
    try {
        await require(script)(options, webpackConfig)
    } catch (e) {
        throw e && (e.stack || e.message) ? (e.stack ? e.stack : e.message) : e
    }
}

export const command = (options, webpackConfig) => {
    program.arguments("<cmd>").action(async cmd => {
        try {
            await execute(cmd, options, webpackConfig)
        } catch (e) {
            console.log(e)
        }
    })
    program.parse(process.argv)
}
