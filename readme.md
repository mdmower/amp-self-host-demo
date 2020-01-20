# Self-hosted AMP runtime example

This repository includes AMP &amp; PWAMP examples of using an alternate AMP cache (i.e. self-hosted AMP runtime).

Demos of the optimized AMP pages and runtime are available at the following URLs:

- [self-hosted-amprt-amp.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-amp.html) - Standard AMP page
- [self-hosted-amprt-opt.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-opt.html) - Optimized AMP page (no runtime version specified, do not rewrite amp-geo URLs)
- [self-hosted-amprt-opt-rcme.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-opt-rcme.html) - Optimized AMP page (no runtime version specified, rewrite amp-geo URLs)
- [self-hosted-amprt-opt-drv.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-opt-drv.html) - Optimized AMP page (runtime version specified, do not rewrite amp-geo URLs)
- [self-hosted-amprt-opt-rcme-drv.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-opt-rcme-drv.html) - Optimized AMP page (runtime version specified, rewrite amp-geo URLs)
- [self-hosted-amprt-pwa.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-pwa.html) - PWA that supports loading any of the AMP pages

## amphtml modifications

The AMP runtime is based on [version 1912201827130](https://github.com/mdmower/amphtml/commits/1912201827130-selfhost) and contains the following extra commits:

- [Improve self-hosted runtime support](https://github.com/mdmower/amphtml/commit/6bfa2f5d5aa6317b0b3c36fbd60cc7db1756afb9)
- [ampdoc: Custom runtime support for singleDoc](https://github.com/mdmower/amphtml/commit/44040958692def5217e46b1f55c77626df6a4859)

## amp-toolbox modifications

A modified version of `amp-toolbox` is included in this repository's packages. See branch `selfhost` of [github.com/mdmower/amp-toolbox](https://github.com/mdmower/amp-toolbox/commits/selfhost). The changes include:

- [optimizer: Require rtv/{rtv} paths if self-hosting](https://github.com/mdmower/amp-toolbox/commit/c79ce1b28a28ef3cd2eddee564856b5853dab019)
- [runtime-version: Support alternate AMP caches](https://github.com/mdmower/amp-toolbox/commit/1cc2381dae09c0188d72da40e6bbf0efe9152c2f)
- [optimizer: Support alternate cache boilerplate CSS](https://github.com/mdmower/amp-toolbox/commit/ad5270470bd50104dfb75e571769135375582cf5)
- [optimizer: Add meta tags for single-doc self-host](https://github.com/mdmower/amp-toolbox/commit/3dc2f5a78d34445cf6437e199b3317b20c995437)

## Runtime hosting notes

- The runtime was built with
  ```
  $ gulp dist --version=1912201827130
  ```
  to ensure a similar version would be available from `cdn.ampproject.org` for extensions which do not load from the alternate AMP cache.
- `amp-geo-0.1.js` was updated by hand to replace `{{AMP_ISO_COUNTRY_HOTPATCH}}` with `us` followed by 26 spaces. There is no server-side modification of `amp-geo` implemented.
- The runtime is available at both `https://ampdemo.cmphys.com/pr25026-runtime/` and `https://ampdemo.cmphys.com/pr25026-runtime/rtv/011912201827130/`, matching the convention used by `cdn.ampproject.org`.
- The modified optimizer in `amp-toolbox` depends on the availability of `https://ampdemo.cmphys.com/pr25026-runtime/rtv/metadata` (see also [cdn.ampproject.org/rtv/metadata](https://cdn.ampproject.org/rtv/metadata)) to perform boilerplate CSS inlining when `ampRuntimeVersion` is not defined.