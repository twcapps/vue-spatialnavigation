'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'
process.env.npm_config_platform = process.env.npm_config_platform ? process.env.npm_config_platform : ''
process.env.npm_config_environment = process.env.npm_config_environment ? process.env.npm_config_environment : 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')

const packageJson = require('../package.json')
const archiver = require('archiver')
const fs = require('fs')
const format = require('date-fns/format')

spinner.start()

// step 1: clear build directory
rm(path.join(config.build.assetsRoot, process.env.npm_config_platform), err => {
  if (err) throw err

  // step 2: build project with webpack
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))

    // step 3: archive dist folder as zip
    const packageName = `${packageJson.name}_${process.env.npm_config_environment}_${packageJson.version}.` +
      `${packageJson.build}_${process.env.npm_config_platform}_${format(new Date(), 'YYYYMMDD')}.` +
      `${process.env.npm_config_platform === 'tizen' ? 'wgt' : 'zip'}`

    rm(path.join(config.build.archiveRoot, packageName), err => {
      if (err) throw err

      if (!fs.existsSync(config.build.archiveRoot)) {
        fs.mkdirSync(config.build.archiveRoot)
      }
      const output = fs.createWriteStream(path.join(config.build.archiveRoot, packageName))

      const archive = archiver('zip')
      archive.on('error', (err) => {
        if (err) throw err
      })
      archive.on('close', () => {
        console.log(chalk.green(`created archive: ${path.join(config.build.archiveRoot, packageName)}\n`))
      })
      archive.pipe(output)
      archive.directory(webpackConfig.output.path, false)
      archive.finalize()
    })
  })
})
