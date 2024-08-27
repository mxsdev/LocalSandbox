import pino, { type DestinationStream } from "pino"
const { default: createLogger } = pino
import pretty from "pino-pretty"
import { SonicBoom } from "sonic-boom"

interface LoggerOptions {
  app?: string
  stream?: NodeJS.WritableStream
  level?: string
}

export const getLogger = ({
  app,
  stream,
  level = "info",
}: LoggerOptions = {}) => {
  const pretty_stream = pretty({
    // sync: true,
    // colorize: colorette.isColorSupported, // --colorize
    colorize: true,
    colorizeObjects: true, //--colorizeObjects
    // crlf: false, // --crlf
    errorLikeObjectKeys: ["err", "error"], // --errorLikeObjectKeys (not required to match custom errorKey with pino >=8.21.0)

    // messageFormat: app ? `[${app}] {msg}` : false, // --messageFormat,
    // errorProps: "", // --errorProps
    // levelFirst: false, // --levelFirst
    // messageKey: "msg", // --messageKey (not required with pino >=8.21.0)
    // levelKey: "level", // --levelKey
    // messageFormat: false, // --messageFormat
    // timestampKey: "time", // --timestampKey
    // translateTime: false, // --translateTime
    ignore: "pid,hostname", // --ignore
    // include: "level,time", // --include
    // hideObject: false, // --hideObject
    // singleLine: false, // --singleLine
    // customColors: "err:red,info:blue", // --customColors
    // customLevels: "err:99,info:1", // --customLevels (not required with pino >=8.21.0)
    // levelLabel: "levelLabel", // --levelLabel
    // minimumLevel: "info", // --minimumLevel
    // useOnlyCustomProps: true, // --useOnlyCustomProps
    // // The file or file descriptor (1 is stdout) to write to
    // destination: 1,

    // // Alternatively, pass a `sonic-boom` instance (allowing more flexibility):
    // // destination: new SonicBoom({ dest: 'a/file', mkdir: true })

    // // You can also configure some SonicBoom options directly
    sync: true, // by default we write asynchronously
    // append: true, // the file is opened with the 'a' flag
    // mkdir: true, // create the target destination

    destination: stream,

    // customPrettifiers: {},
  })

  let final_stream: DestinationStream = pretty_stream

  //   if (stream) {
  //     final_stream = pretty_stream.pipe(stream)
  //   }

  return createLogger(
    {
      name: app,
      level,
    },
    final_stream,
  )
}
