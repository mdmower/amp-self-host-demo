# Self-hosted AMP framework example

This repository includes AMP &amp; PWAMP examples of using a self-hosted AMP framework:

- [standard-amp.html](https://ampdemo.cmphys.com/amp-sh/standard-amp.html) - Standard AMP page using framework from `https://cdn.ampproject.org`
- [standard-amp-optimized.html](https://ampdemo.cmphys.com/amp-sh/standard-amp-optimized.html) - Optimized AMP page using framework from `https://cdn.ampproject.org`
- [self-hosted-amp.html](https://ampdemo.cmphys.com/amp-sh/self-hosted-amp.html) - Standard AMP page using framework from `https://ampdemo.cmphys.com/amp-rt`
- [self-hosted-amp-optimized.html](https://ampdemo.cmphys.com/amp-sh/self-hosted-amp-optimized.html) - Optimized AMP page using framework from `https://ampdemo.cmphys.com/amp-rt`

A guide to hosting the AMP framework is available from [github.com/ampproject/amphtml/blob/master/spec/amp-framework-hosting.md](https://github.com/ampproject/amphtml/blob/master/spec/amp-framework-hosting.md). Support for this feature exists in [amphtml](https://github.com/ampproject/amphtml) as of April 2020 and [amp-toolbox](https://github.com/ampproject/amp-toolbox) 2.1.0+. Validation of these AMP pages is under discussion in [ampproject/amphtml issue #27546](https://github.com/ampproject/amphtml/issues/27546).

## How the framework was built and hosted

The instruction below are meant to demonstrate how the AMP pages in this repository take advantage of a self-hosted AMP framework. This is just a single example of how this goal can be accomplished. Be sure to review [Hosting the AMP framework](https://github.com/ampproject/amphtml/blob/master/spec/amp-framework-hosting.md) by the AMPHTML project for complete instructions and other options.

1. Fetch and prepare a [stable tag from ampproject/amphtml](https://github.com/ampproject/amphtml/releases)

   ```bash
   $ cd ~/source/amphtml
   $ git fetch upstream
   $ git checkout 2007242032002
   $ yarn
   $ gulp clean
   ```

1. Push tag to your own fork (e.g. `github.com/mdmower/amphtml`)

   ```bash
   $ git push origin 2007242032002
   ```

1. Create `build-system/global-configs/custom-config.json`

   ```json
   {
     "cdnUrl": "https://ampdemo.cmphys.com/amp-rt",
     "geoApiUrl": "https://ampdemo.cmphys.com/geoip"
   }
   ```

1. Build the AMP framework

   ```bash
   $ gulp dist --version_override=2007242032002 --sourcemap_url="https://raw.githubusercontent.com/mdmower/amphtml/2007242032002/"
   ```

1. Push the built framework to your server and make available from `https://ampdemo.cmphys.com/amp-rt/rtv/012007242032002` and `https://ampdemo.cmphys.com/amp-rt` (in that order)

   ```bash
   # Sample commands provided for illustration; your instructions will vary depending on hosting setup.
   $ rsync -av --delete dist/ user@server.com:~/amp-rt/
   $ ssh user@server.com
   server.com$ sudo rsync --chown=www-data:www-data -av --delete ~/amp-rt/ /var/www/html/amp-rt/rtv/012007242032002/
   server.com$ sudo rsync --chown=www-data:www-data -av --delete --exclude="rtv" ~/amp-rt/ /var/www/html/amp-rt/
   ```

1. Create `https://ampdemo.cmphys.com/amp-rt/rtv/metadata` JSON file

   ```json
   {
     "ampRuntimeVersion": "012007242032002",
     "ampCssUrl": "https://ampdemo.cmphys.com/amp-rt/rtv/012007242032002/v0.css"
   }
   ```

1. Setup [GeoIP Web API](https://github.com/mdmower/geoip-web-api) on server for AMP-GEO API fallback at `https://ampdemo.cmphys.com/geoip`.

1. Point AMP pages at custom framework host

   - Basic: Replace all occurrences of `https://cdn.ampproject.org` with `https://ampdemo.cmphys.com/amp-rt` in AMPHTML document

     ```bash
     $ sed 's|https://cdn.ampproject.org|https://ampdemo.cmphys.com/amp-rt|g' standard-amp.html > self-hosted-amp.html
     ```

   - Optimized: Install and run amp-toolbox's optimizer

     ```bash
     $ npm install @ampproject/toolbox-cli -g
     $ amp optimize --host="https://ampdemo.cmphys.com/amp-rt" --geoapi="https://ampdemo.cmphys.com/geoip" standard-amp.html > self-hosted-amp-optimized.html
     ```

     Note that `--geoapi` is optional if you build the framework yourself (as in this example) because you can define the same variable at build time using `build-system/global-configs/custom-config.json`. It is necessary if you download the framework, though.
