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

export const command = (options = {}, webpackConfig) => {
    program
        .option("-i, --input <dir>", "Entry Directory")
        .option("-o, --output <dir>", "Output Directory")
        .option("-l, --lazy <boolean>", "Not Lazy depenedenies", true)
        .arguments("<script>")
        .action(async (script, cmd) => {
            try {
                if (cmd.input)
                    options.input = path.resolve(process.cwd(), cmd.input)
                if (cmd.output)
                    options.output = path.resolve(process.cwd(), cmd.output)
                if (cmd.lazy) options.lazy = cmd.lazy === "false" ? false : true
                await execute(script, options, webpackConfig)
            } catch (e) {
                console.log(e)
            }
        })
    program.parse(process.argv)
}
