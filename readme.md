# Self-hosted AMP runtime example

This repository includes AMP &amp; PWAMP examples of using a self-hosted AMP framework:

- [self-hosted-amprt-amp.html](https://ampdemo.cmphys.com/amp-sh/self-hosted-amprt-amp.html) - Standard AMP page
- [self-hosted-amprt-opt.html](https://ampdemo.cmphys.com/amp-sh/self-hosted-amprt-opt.html) - Optimized AMP page (no runtime version specified)
- [self-hosted-amprt-opt-rtv.html](https://ampdemo.cmphys.com/amp-sh/self-hosted-amprt-opt-rtv.html) - Optimized AMP page (runtime version specified)
- [self-hosted-amprt-pwa.html](https://ampdemo.cmphys.com/amp-sh/self-hosted-amprt-pwa.html) - PWA that supports loading any of the AMP pages

For comparison, the same set of AMP pages using `cdn.ampproject.org` (the default host) are also available in this repository:

- [standard-amp.html](https://ampdemo.cmphys.com/amp-sh/standard-amp.html) - Standard AMP page
- [standard-opt.html](https://ampdemo.cmphys.com/amp-sh/standard-opt.html) - Optimized AMP page (no runtime version specified)
- [standard-opt-rtv.html](https://ampdemo.cmphys.com/amp-sh/standard-opt-rtv.html) - Optimized AMP page (runtime version specified)
- [standard-pwa.html](https://ampdemo.cmphys.com/amp-sh/standard-pwa.html) - PWA that supports loading any of the AMP pages

A guide to hosting the AMP framework is available at [github.com/ampproject/amphtml/blob/master/spec/amp-framework-hosting.md](https://github.com/ampproject/amphtml/blob/master/spec/amp-framework-hosting.md).

Support for this feature exists in [amphtml](https://github.com/ampproject/amphtml) as of April 2020 and [amp-toolbox](https://github.com/ampproject/amp-toolbox) 2.1.0+. Validation of these AMP pages is under discussion in [ampproject/amphtml issue #27546](https://github.com/ampproject/amphtml/issues/27546).
