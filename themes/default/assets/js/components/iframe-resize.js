class IframeResize {

    constructor() {
        this.init()
    }

    init() {

        if ($('iframe').length) {
            $('iframe').iFrameResize({
                checkOrigin: true,
                autoResize: true,
                resizeFrom: 'child'
            });
        }

    }

}

export default IframeResize