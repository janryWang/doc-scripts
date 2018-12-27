const chalk = require("chalk")
const moment = require("moment")
const pkg = require("../package.json")
const log = console.log

const getCurDate = () => moment().format("YYYY-MM-DD hh:mm:ss")

const getMessage = (type, msg, color = "yellow", tab) =>
    log(
        (tab ? "\n\n" : "") +
            chalk[color](
                `【${pkg.name.toUpperCase()} ${getCurDate()}】${type.toUpperCase()}: ` +
                    msg
            )
    )

exports.success = (msg, tab) => getMessage("success", msg, "green", tab)

exports.error = (msg, tab) => getMessage("error", msg, "red", tab)

exports.info = (msg, tab) => getMessage("info", msg, "yellow", tab)

exports.flat = (msg, color = "yellow", tab) =>
    log((tab ? "\n\n" : "") + chalk[color](msg))
