import psl from './vendor/parse-domain';
import './analytic';

if(document.getElementById("cookie")){
    Vue.config.devtools = false;
    Vue.config.productionTip = false;
    new Vue({
        el: '#cookie',
        data() {
            return {
                showCookieBar: true,
                showSettings: false,
                acceptExpire: '1d',
                rejectExpire: '1d',

                /* add 3rd party cookies */
                enableCookiePerformance: false,
                cookiePerformance: false,
            }
        },

        mounted() {
            this.showCookieBar = this.$cookies.isKey('cookie-policy') ? false : true;
            this.init();
        },

        methods: {
            init()
            {
                this.acceptExpire = cookieSetting['accept'];
                this.rejectExpire = cookieSetting['reject'];

                this.cookiePerformance = this.getCookiePerformance();
                this.enableCookiePerformance = this.cookiePerformance;

                if(this.cookiePerformance && !this.$cookies.isKey('cookie-policy'))
                {
                    this.$cookies.set('cookie-performance', true, this.acceptExpire);
                }
            },

            getCookiePerformance()
            {
                if(this.$cookies.isKey('cookie-performance')){
                    return this.$cookies.get('cookie-performance')
                } else {
                    return cookieSetting['cookie-performance'] == "1" ? true : false;
                }
            },

            toggleSetting()
            {
                this.showSettings = !this.showSettings;
            },

            toggleCookiePerformance()
            {
                this.enableCookiePerformance = !this.enableCookiePerformance;
            },

            accept()
            {
                this.enableCookiePerformance = true;
                this.onSave(this.acceptExpire);
            },

            reject()
            {
                this.enableCookiePerformance = false;
                this.onSave(this.rejectExpire);
            },

            onSave(expire)
            {
                this.showSettings = false;
                this.showCookieBar = false;
                if(typeof expire == undefined || expire == '') {
                    expire = this.acceptExpire;
                }

                // define 3rd party cookies
                this.cookiePerformance = this.enableCookiePerformance;
                if(this.cookiePerformance)
                {
                    this.$cookies.set('cookie-performance', true, this.acceptExpire);
                } else {
                    this.removeAnalyticCookies();
                }

                // necessary cookies
                this.$cookies.set('cookie-policy', true, expire)
            },

            removeAnalyticCookies()
            {
                let domain = window.location.hostname;
                domain = psl.parse(domain).domain;

                let cookies = this.$cookies.keys();

                for(const key of cookies) {  
                    // remove associate piwik
                    if(key.includes('_pk')) {
                        this.$cookies.remove(key);
                    }
                    // remove associate google
                    if(key.includes('_g')) {
                        this.$cookies.remove(key, '/', domain);
                    }
                }

                this.$cookies.remove('cookie-performance');
            }


        },
    });
}
