'use strict';

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import env from 'gulp-env';
import gutil from 'gutil';
import morgan from 'morgan';
import express from 'express';
import proxy from 'proxy-middleware';
import url from 'url';

import webpackConfigDev from './webpack/webpack.development.config';
import webpackConfig from './webpack/webpack.staging.config';

import backend from './src/srv';
import { PORT_PROD, PORT_DEVSERVER } from './src/srv/config';

gulp.task('lint', () => {
  return gulp.src('src/js/**')
  .pipe(eslint({
    "plugins": ["react"]
  }))
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task('webpack', callback => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString());
    callback();
  });
});

gulp.task('devServer', () => {
  env({
    vars: {
      DEVSERVER: true
    }
  });

  const app = express();

  // serve the api
  backend(app);

  // serve the mobile app as a proxied webpack dev server for hot reloading
  app.use('/', proxy(url.parse('http://localhost:' + PORT_DEVSERVER + '/')));

  const frontend = new WebpackDevServer(webpack(webpackConfigDev), {
    contentBase: 'src/html',
    publicPath: '/',
    hot: true,
    quiet: false,
    noInfo: false
  });

  frontend.listen(PORT_DEVSERVER, 'localhost', () => {});

  // morgan logs requests to the console
  app.use(morgan('dev'));

  app.listen(PORT_PROD);
  console.log('Server/client listening on ports', PORT_PROD, ',', PORT_DEVSERVER);
});

gulp.task('productionServer', ['lint', 'webpack'], () => {
  const app = express();

  // serve the api
  backend(app);

  // serve the mobile app statically
  app.use('/', express.static('src/html'));

  app.listen(PORT_PROD);
  console.log('Server listening on port', PORT_PROD);
});

gulp.task('default', ['devServer'], () => {});
