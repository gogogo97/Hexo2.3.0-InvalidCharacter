class Form {

    constructor() {

        this.privacyStatement()
        this.multipleAttachFile($('.multiple-file'), 'doc|docx|pdf', 2)
        
    }

    multipleAttachFile ($el, fileType, maxFile) {

        if($el.length){
            $el.MultiFile(
                {
                    accept: fileType,
                    max: maxFile
                }
            );
        }
        
    }

    privacyStatement () {

        let $checkbox = $('input[name="privacyStatement"]');
		let $btn = $('button[type="submit"]');

        if($btn.length && $checkbox.length) {
            $checkbox.click(function () {
                if($(this).prop('checked')) {
                    $btn.removeAttr('disabled');
                } else {
                    $btn.attr('disabled', 'disabled');
                }
            })
        }

    }

}

export default Form