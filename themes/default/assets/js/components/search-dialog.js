
class SearchDialog {

    constructor() {
        this.init()
    }

    init() {

        let lang = $('html').attr('lang')
        let key_j = 74;


        $.get(`/api/${lang}/menus`, function(data){
                $('.autocomplete').autocomplete({
                    lookup: data,
                    onSelect: function (suggestion) {
                        window.location = suggestion.data
                    }
                })
                
        }, 'json')
        
        //Detect keydown
        $(document).on("keydown", function(e) {
            if(e.ctrlKey && (e.keyCode === key_j)) {
                e.preventDefault()

                $('.search-dialog').children('.modal').modal('show')
            }
        });

        
        $('.search-dialog').children('.modal').on('shown.bs.modal', function (e) {
            setTimeout(function() {
                $('.autocomplete').focus()
            }, 300)
        })

    }
    
}

export default SearchDialog