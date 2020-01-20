# Self-hosted AMP runtime example

This repository includes AMP &amp; PWAMP examples of using an alternate AMP cache (i.e. self-hosted AMP runtime).

Demos of the optimized AMP pages and runtime are available at the following URLs:

- [self-hosted-amprt-amp.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-amp.html) - Standard AMP page
- [self-hosted-amprt-opt.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-opt.html) - Optimized AMP page (no runtime version specified, no amp-geo API URL specified)
- [self-hosted-amprt-opt-rtv.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-opt-rtv.html) - Optimized AMP page (runtime version specified, no amp-geo API URL specified)
- [self-hosted-amprt-opt-geo.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-opt-geo.html) - Optimized AMP page (no runtime version specified, amp-geo API URL specified)
- [self-hosted-amprt-opt-rtv-geo.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-opt-rtv-geo.html) - Optimized AMP page (runtime version specified, amp-geo API URL specified)
- [self-hosted-amprt-pwa.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-pwa.html) - PWA that supports loading any of the AMP pages

## amphtml modifications

The AMP runtime is based on version 1912201827130. See tag `1912201827130-selfhost2` of [github.com/mdmower/amphtml](https://github.com/mdmower/amphtml). This tag contains the following extra commits:

- [amp-geo: Fall back to API for country](https://github.com/mdmower/amphtml/commit/f7d323158b09170f1c084cb5cf229a30ecef776e)
- [ampdoc: Support config.urls updates if singleDoc](https://github.com/mdmower/amphtml/commit/5b2517c1d1c6defdd56877d72125f09938167108)

## amp-toolbox modifications

A modified version of `amp-toolbox` is included in this repository's packages. See branch `selfhost2` of [github.com/mdmower/amp-toolbox](https://github.com/mdmower/amp-toolbox). The changes include:

- [optimizer: Add meta tags for singleDoc self-host](https://github.com/mdmower/amp-toolbox/commit/67586c51d514c31b0d1e86997249ee5f218a33c4)
- [optimizer: Support alternate cache boilerplate CSS](https://github.com/mdmower/amp-toolbox/commit/eb8a18d965576389298683fdabfe31f55557f87b)
- [runtime-version: Support alternate AMP caches](https://github.com/mdmower/amp-toolbox/commit/3e2527a0ee11cc28a1ccd8838f3698bd38d6f3bc)
- [Revert "optimizer: Do not append rtv/{rtv}/ to ampUrlPrefix](https://github.com/mdmower/amp-toolbox/commit/6b1b3540d5c0b4d60b85ec1f6a44ee24e2611955)
- [Revert "optimizer: Make dynamic component URL rewrites optional](https://github.com/mdmower/amp-toolbox/commit/5a8bf3d6831fa7a1f563a5b9a5c34d83b93b8b21)

## Runtime hosting notes

- The runtime was built with
  ```
  $ gulp dist --version=1912201827130
  ```
  to ensure a similar version would be available from `cdn.ampproject.org` for extensions which do not load from the alternate AMP cache.
- There is no server-side modification of `amp-geo-0.1.js` implemented. `{{AMP_ISO_COUNTRY_HOTPATCH}}` is left unpatched.
- The runtime is available at both `https://ampdemo.cmphys.com/pr25026-runtime/` and `https://ampdemo.cmphys.com/pr25026-runtime/rtv/011912201827130/`, matching the convention used by `cdn.ampproject.org`.
- The modified optimizer in `amp-toolbox` depends on the availability of `https://ampdemo.cmphys.com/pr25026-runtime/rtv/metadata` (see also [cdn.ampproject.org/rtv/metadata](https://cdn.ampproject.org/rtv/metadata)) to perform boilerplate CSS inlining when `ampRuntimeVersion` is not defined.
