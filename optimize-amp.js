(async function () {
    const fetch = require('node-fetch');
    const fs = require('fs');
    const AmpOptimizer = require('@ampproject/toolbox-optimizer');

    const ampOptimizer = AmpOptimizer.create();
    const fsPromises = fs.promises;

    // Self-hosted AMP runtime version:
    // https://ampdemo.cmphys.com/pr25026-runtime/version.txt

    async function optimizeHtml(ampHtml, defineAmpRuntimeVersion, rewriteCacheModifiedExtensions) {
        // AMP runtime URL prefix
        const ampUrlPrefix = `https://ampdemo.cmphys.com/pr25026-runtime`;

        // Prepare transformation options
        const transformOptions = {
            ampUrlPrefix: ampUrlPrefix,
            rewriteCacheModifiedExtensions
        };

        if (defineAmpRuntimeVersion) {
            // Determine AMP runtime version
            const version = await fetch(ampUrlPrefix + '/version.txt').then(r => r.text());
            if (!/^\d+$/.test(version))
                throw new Error('Invalid response received for version.txt');
            transformOptions.ampRuntimeVersion = '01' + version;
        }

        /**
         * Output files:
         * self-hosted-amprt-opt.html - No runtime version specified, do not rewrite amp-geo URLs
         * self-hosted-amprt-opt-rcme.html - No runtime version specified, rewrite amp-geo URLs
         * self-hosted-amprt-opt-drv.html - Runtime version specified, do not rewrite amp-geo URLs
         * self-hosted-amprt-opt-rcme-drv.html - Runtime version specified, rewrite amp-geo URLs
         */
        let outputFilename = 'self-hosted-amprt-opt';
        if (rewriteCacheModifiedExtensions)
            outputFilename += '-rcme';
        if (defineAmpRuntimeVersion)
            outputFilename += '-drv';
        outputFilename += '.html';

        // Optimize AMP HTML
        return {
            html: await ampOptimizer.transformHtml(ampHtml, transformOptions),
            filename: outputFilename
        };
    }

    let ampHtml = await fsPromises.readFile('self-hosted-amprt-amp.html');
    [[false, false], [false, true], [true, false], [true, true]].forEach(async (parms) => {
        let optimized = await optimizeHtml(ampHtml.toString(), parms[0], parms[1]);
        await fsPromises.writeFile(optimized.filename, optimized.html || '');
    });
}());
