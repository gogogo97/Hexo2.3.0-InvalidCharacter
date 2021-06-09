class DatePicker {

    constructor() {
        this.language = $('html').attr('lang');
        this.startDate = '';
        this.endDate = '';
        this.tmp = '';

        // main option
        this.option = {
            dateFormat: 'dd/mm/yy',
            minDate: '-2Y',
            maxDate: '-1d',
            defaultdate: '-1d',
            changeMonth: true,
            changeYear: true,
        }

        // extend option in language TH
        this.optionTH = {
            dayNamesMin: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
            monthNamesShort: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
            beforeShow: function () {
                setTimeout(function () {
                    $.each($(".ui-datepicker-year option"), function (j, k) {
                        var textYear = parseInt($(".ui-datepicker-year option").eq(j).val()) + 543;
                        $(".ui-datepicker-year option").eq(j).text(textYear);
                    });
                }, 50);
            },
            onChangeMonthYear: function () {
                setTimeout(function () {
                    $.each($(".ui-datepicker-year option"), function (j, k) {
                        var textYear = parseInt($(".ui-datepicker-year option").eq(j).val()) + 543;
                        $(".ui-datepicker-year option").eq(j).text(textYear);
                    });
                }, 50);
            },
            onSelect: function (datetime, inst) {
                let arrDatetime = datetime.split("/");
                let yearTH = arrDatetime[0] + "/" + arrDatetime[1] + "/" + (inst.selectedYear + 543);

                if(inst.id == 'startDate') {
                    $('input[name="date_start"]').val(datetime);
                }
                if(inst.id == 'endDate') {
                    $('input[name="date_end"]').val(datetime);
                }

                $(this).val(yearTH);
            }
        }

        // extend option in language EN
        this.optionEN = {
            onSelect: function (datetime, inst) {
                $(this).val(datetime);

                if(inst.id == 'startDate') {
                    $('input[name="date_start"]').val(datetime);
                }
                if(inst.id == 'endDate') {
                    $('input[name="date_end"]').val(datetime);
                }
            }
        }

        if(this.chkSelector())
        {
            this.dataPrepare();
            this.setDatepicker();
        }
    }

    chkSelector() {
        if ($("#startDate").length && $('#endDate').length) {
            return true;
        } else {
            return false;
        }
    }

    dataPrepare() {
        /* autofill from $_GET parameter */
        if(this.language == 'th') {
            if($('input[name="date_start"]').val() != "") {
                this.tmp = $('input[name="date_start"]').val().split("/");
                this.startDate = this.tmp[0] + "/" + this.tmp[1] + "/" + (parseInt(this.tmp[2]) + 543);
            }

            if($('input[name="date_end"]').val() != "") {
                this.tmp = $('input[name="date_end"]').val().split("/");
                this.endDate = this.tmp[0] + "/" + this.tmp[1] + "/" + (parseInt(this.tmp[2]) + 543);
            }
        } else {
            this.startDate = $('input[name="date_start"]').val();
            this.endDate = $('input[name="date_end"]').val();
        }

        $('#startDate').val(this.startDate);
        $('#endDate').val(this.endDate);
    }

    setDatepicker() {
        if (this.language == 'th') {
            $.extend(this.option, this.optionTH);
        } else {
            $.extend(this.option, this.optionEN);
        }

        $("#startDate, #endDate").datepicker(this.option);
    }


}

export default DatePicker
