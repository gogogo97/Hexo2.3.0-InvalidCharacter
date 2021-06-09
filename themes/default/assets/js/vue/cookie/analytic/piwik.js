Vue.component('piwik', {
    props: ['tracking', 'cookiePerformance'],
    template: `<span></span>`,
    watch: {
        cookiePerformance(value)
        {              
            this.appendScript();     
        }
    },
    methods: {
        appendScript() {  
            if(this.$cookies.isKey('cookie-performance') && this.tracking !== undefined && this.tracking != '') {
                try {
                    let script = document.createElement('script');
                    script.innerHTML = `
                    var _paq = _paq || [];
                    _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
                    _paq.push(["trackPageView"]);
                    _paq.push(["enableLinkTracking"]);
                    (function () {
                        var u = (("https:" == document.location.protocol) ? "https" : "http") + "://webstats.shareinvestor.co.th/";
                        _paq.push(["setTrackerUrl", u + "piwik.php"]);
                        _paq.push(["setSiteId", "${this.tracking}"]);
                        var d = document,
                            g = d.createElement("script"),
                            s = d.getElementsByTagName("script")[0];
                        g.type = "text/javascript";
                        g.defer = true;
                        g.async = true;
                        g.src = u + "piwik.js";
                        s.parentNode.insertBefore(g, s);
                    })();`
                    document.head.appendChild(script);
                } catch (error) {
                    console.log(error);
                }                
            }
        }
    }
    
})

