import program from "commander"
import fs from "fs-extra"
import path from "path"
import log from "./log"

export const execute = async (cmd, options, webpackConfig) => {
    try {
        const script = `./scripts/${cmd}.js`
        await fs.access(path.resolve(__dirname, script))
        await require(script)(options, webpackConfig)
    } catch (e) {
        log.error("Executed a command that does not exist.")
        log.error(e.stack)
    }
}

export const command = (options, webpackConfig) => {
    program.arguments("<cmd>").action(async cmd => {
        await execute(cmd, options, webpackConfig)
    })
    program.parse(process.argv)
}
