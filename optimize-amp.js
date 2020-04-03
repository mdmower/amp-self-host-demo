(async function () {
    const fetch = require('node-fetch');
    const fs = require('fs');
    const AmpOptimizer = require('@ampproject/toolbox-optimizer');

    const ampOptimizer = AmpOptimizer.create();
    const fsPromises = fs.promises;

    // Self-hosted AMP runtime version:
    // https://ampdemo.cmphys.com/amp-rt/version.txt

    async function optimizeHtml(ampHtml, prefix, defineAmpRuntimeVersion) {
        // Prepare transformation options
        const transformOptions = {};
        if (prefix !== 'standard') {
            transformOptions.ampUrlPrefix = 'https://ampdemo.cmphys.com/amp-rt';
            transformOptions.geoApiUrl = 'https://ampdemo.cmphys.com/amp-geo-api/mock.json';
        }

        if (defineAmpRuntimeVersion) {
            // Determine AMP runtime version
            const host = transformOptions.ampUrlPrefix || 'https://cdn.ampproject.org';
            const version = await fetch(host + '/version.txt').then(r => r.text());
            if (!version || version !== encodeURIComponent(version))
                throw new Error('Invalid response received for version.txt');
            transformOptions.ampRuntimeVersion = '01' + version;
        }

        /**
         * Output files:                Runtime version specified?
         * <prefix>-opt.html            no
         * <prefix>-opt-rtv.html        yes
         */
        let outputFilename = prefix + '-opt';
        if (defineAmpRuntimeVersion)
            outputFilename += '-rtv';
        outputFilename += '.html';

        // Optimize AMP HTML
        return {
            html: await ampOptimizer.transformHtml(ampHtml, transformOptions),
            filename: outputFilename
        };
    }

    let filePrefixes = ['standard', 'self-hosted-amprt'];
    let optimizePromises = filePrefixes.map(async (prefix) => {
        let ampHtml = (await fsPromises.readFile(prefix + '-amp.html')).toString();
        let writePromises = [false, true].map(async (specifyRtv) => {
            let optimized = await optimizeHtml(ampHtml.toString(), prefix, specifyRtv);
            return fsPromises.writeFile(optimized.filename, optimized.html || '');
        });
        return Promise.all(writePromises);
    });
    await Promise.all(optimizePromises);
}());
