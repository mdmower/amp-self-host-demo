(async function () {
    const fetch = require('node-fetch');
    const fs = require('fs');
    const AmpOptimizer = require('@ampproject/toolbox-optimizer');

    const ampOptimizer = AmpOptimizer.create();
    const fsPromises = fs.promises;

    // Self-hosted AMP runtime version:
    // https://ampdemo.cmphys.com/amp-rt/version.txt

    async function optimizeHtml(ampHtml, defineAmpRuntimeVersion) {
        // AMP runtime URL prefix
        const ampUrlPrefix = 'https://ampdemo.cmphys.com/amp-rt';

        // Prepare transformation options
        const transformOptions = {
            ampUrlPrefix: ampUrlPrefix,
            geoApiUrl: 'https://ampdemo.cmphys.com/amp-geo-api/mock.json',
        };

        if (defineAmpRuntimeVersion) {
            // Determine AMP runtime version
            const version = await fetch(ampUrlPrefix + '/version.txt').then(r => r.text());
            if (!version || version !== encodeURIComponent(version))
                throw new Error('Invalid response received for version.txt');
            transformOptions.ampRuntimeVersion = '01' + version;
        }

        /**
         * Output files:                         Runtime version specified?
         * self-hosted-amprt-opt.html            no
         * self-hosted-amprt-opt-rtv.html        yes
         */
        let outputFilename = 'self-hosted-amprt-opt';
        if (defineAmpRuntimeVersion)
            outputFilename += '-rtv';
        outputFilename += '.html';

        // Optimize AMP HTML
        return {
            html: await ampOptimizer.transformHtml(ampHtml, transformOptions),
            filename: outputFilename
        };
    }

    let ampHtml = await fsPromises.readFile('self-hosted-amprt-amp.html');
    [false, true].forEach(async (specifyRtv) => {
        let optimized = await optimizeHtml(ampHtml.toString(), specifyRtv);
        await fsPromises.writeFile(optimized.filename, optimized.html || '');
    });
}());
