Vue.component('ga', {
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
                    let ga = document.createElement('script')
                    ga.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id='+this.tracking);
                    document.head.appendChild(ga);

                    let script = document.createElement('script');
                    script.innerHTML = `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());        
                    gtag('config', "${this.tracking}");`
                    document.head.appendChild(script);
                } catch (error) {
                    console.log(error);                    
                }
                
            }
        }
    }
    
})

