# Self-hosted AMP runtime example

This repository includes AMP &amp; PWAMP examples of using an alternate AMP cache (i.e. self-hosted AMP runtime).

Demos of the optimized AMP pages and runtime are available at the following URLs:

- [self-hosted-amprt-amp.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-amp.html) - Standard AMP page
- [self-hosted-amprt-opt.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-opt.html) - Optimized AMP page (no runtime version specified)
- [self-hosted-amprt-opt-rtv.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-opt-rtv.html) - Optimized AMP page (runtime version specified)
- [self-hosted-amprt-pwa.html](https://ampdemo.cmphys.com/pr25026/self-hosted-amprt-pwa.html) - PWA that supports loading any of the AMP pages

## amphtml modifications

The AMP runtime was forked from upstream at commit `31c15e390e8c5f46810bd1e80e5cf40a673a1425` (build-system: Fix autocomplete error response (#26824)) and includes the following [additional commit(s)](https://github.com/mdmower/amphtml/commits/pr-selfhost2):

- config: Check doc head for custom URLs
- config: Remove dependencies and workaround lint

## amp-toolbox modifications

A modified version of `amp-toolbox` is included in this repository as a submodule. It was forked from upstream at commit `908b78b9d007d18d97c50b5a79421d5936150233` (v2.0.0) and includes the following [additional commit(s)](https://github.com/mdmower/amp-toolbox/commits/selfhost2):

- optimizer: Add meta tags for singleDoc self-host

## Runtime hosting notes

- Specify a version when building amphtml, e.g.
  ```
  $ gulp dist --version=1912201827130
  ```
- In this example, there is no server-side modification of `amp-geo-0.1.js` implemented (see [cache guidelines](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md#guidelines-adding-a-new-cache-to-the-amp-ecosystem)); `{{AMP_ISO_COUNTRY_HOTPATCH}}` is left unpatched. Eventually, `amp-geo` should have [API support](https://github.com/ampproject/amphtml/pull/26407).
- Matching the convention used by `cdn.ampproject.org`, the runtime is available at both:
  - `<host>/` and
  - `<host>/rtv/<rtv>/`

  where in this example `<host>=https://ampdemo.cmphys.com/pr25026-runtime` and `<rtv>=011912201827130`.
- `amp-toolbox` depends on the availability of `<host>/rtv/metadata` (see also [cdn.ampproject.org/rtv/metadata](https://cdn.ampproject.org/rtv/metadata)) to perform boilerplate CSS inlining when `ampRuntimeVersion` is not defined.
