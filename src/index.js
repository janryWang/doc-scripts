import program from "commander"
import fs from "fs-extra"
import path from "path"
import log from "./log"

export const execute = async (cmd, options, webpackConfig) => {
    try {
        const script = `./scripts/${cmd}.js`
        await fs.access(path.resolve(__dirname, script))
        try {
            await require(script)(options, webpackConfig)
        } catch (e) {
            console.log(
                e && (e.stack || e.message)
                    ? e.stack
                        ? e.stack
                        : e.message
                    : e
            )
        }
    } catch (e) {
        log.error("Executed a command that does not exist.")
    }
}

export const command = (options, webpackConfig) => {
    program.arguments("<cmd>").action(async cmd => {
        await execute(cmd, options, webpackConfig)
    })
    program.parse(process.argv)
}
