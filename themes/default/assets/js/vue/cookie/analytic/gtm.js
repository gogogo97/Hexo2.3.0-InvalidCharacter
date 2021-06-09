Vue.component('gtm', {
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
                    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${this.tracking}');`
                    document.head.appendChild(script);
    
                    let iframe = document.createElement('noscript')
                    iframe.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${this.tracking}" height="0" width="0"
                    style="display:none;visibility:hidden"></iframe>`
                    document.head.appendChild(iframe);
                } catch (error) {
                    console.log(error);                    
                }
               
            }
        }
    }
    
})

