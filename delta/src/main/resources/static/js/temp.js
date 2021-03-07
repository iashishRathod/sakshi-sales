
    //<![CDATA[
    $(function () {
        'use strict';
        var mydata = [
                { id: "1",  invdate: "2007-10-01", name: "test1",  note: "note1",  amount: "200.00", tax: "10.00", closed: true,  ship_via: "TN", total: "210.00" },
                { id: "2",  invdate: "2007-10-02", name: "test2",  note: "note2",  amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" },
                { id: "3",  invdate: "2007-09-01", name: "test3",  note: "note3",  amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00" },
                { id: "4",  invdate: "2007-10-04", name: "test4",  note: "note4",  amount: "200.00", tax: "10.00", closed: true,  ship_via: "TN", total: "210.00" },
                { id: "5",  invdate: "2007-10-31", name: "test5",  note: "note5",  amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" },
                { id: "6",  invdate: "2007-09-06", name: "test6",  note: "note6",  amount: "400.00", tax: "30.00", closed: false, ship_via: "FE", total: "430.00" },
                { id: "7",  invdate: "2007-10-04", name: "test7",  note: "note7",  amount: "200.00", tax: "10.00", closed: true,  ship_via: "TN", total: "210.00" },
                { id: "8",  invdate: "2007-10-03", name: "test8",  note: "note8",  amount: "300.00", tax: "20.00", closed: false, ship_via: "FE", total: "320.00" },
                { id: "9",  invdate: "2007-09-01", name: "test9",  note: "note9",  amount: "400.00", tax: "30.00", closed: false, ship_via: "TN", total: "430.00" },
                { id: "10", invdate: "2007-09-08", name: "test10", note: "note10", amount: "500.00", tax: "30.00", closed: true,  ship_via: "TN", total: "530.00" },
                { id: "11", invdate: "2007-09-08", name: "test11", note: "note11", amount: "500.00", tax: "30.00", closed: false, ship_via: "FE", total: "530.00" },
                { id: "12", invdate: "2007-09-10", name: "test12", note: "note12", amount: "500.00", tax: "30.00", closed: false, ship_via: "FE", total: "530.00" }
            ],
            $grid = $("#list"),
            initDateEdit = function (elem) {
                $(elem).datepicker({
                    dateFormat: 'dd-M-yy',
                    autoSize: true,
                    changeYear: true,
                    changeMonth: true,
                    showButtonPanel: true,
                    showWeek: true
                });
            },
            initDateSearch = function (elem) {
                setTimeout(function () {
                    $(elem).datepicker({
                        dateFormat: 'dd-M-yy',
                        autoSize: true,
                        changeYear: true,
                        changeMonth: true,
                        showWeek: true,
                        showButtonPanel: true
                    });
                }, 100);
            },
            numberTemplate = {formatter: 'number', align: 'right', sorttype: 'number',
                editrules: {number: true, required: true},
                searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge', 'nu', 'nn', 'in', 'ni'] }},
            editingRowId,
            myEditParam = {
                keys: true,
                oneditfunc: function (id) {
                    editingRowId = id;
                },
                afterrestorefunc: function (id) {
                    editingRowId = undefined;
                }
            };
        $grid.jqGrid({
            data: mydata,
            datatype: "local",
                colNames: ['Client', 'Date', 'Amount', 'Tax', 'Total', 'Closed', 'Shipped via', 'Notes'],
                colModel: [
                    { name: 'name', index: 'name', align: 'center', editable: true, width: 65, editrules: {required: true} },
                    { name: 'invdate', index: 'invdate', width: 80, align: 'center', sorttype: 'date',
                        formatter: 'date', formatoptions: { newformat: 'd-M-Y' }, editable: true, datefmt: 'd-M-Y',
                        editoptions: { dataInit: initDateEdit },
                        searchoptions: { sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge'], dataInit: initDateSearch } },
                    { name: 'amount', index: 'amount', width: 75, editable: true, template: numberTemplate },
                    { name: 'tax', index: 'tax', width: 52, editable: true, template: numberTemplate },
                    { name: 'total', index: 'total', width: 60, template: numberTemplate },
                    {name: 'closed', index: 'closed', width: 70, align: 'center', editable: true, formatter: 'checkbox',
                        edittype: 'checkbox', editoptions: {value: 'Yes:No', defaultValue: 'Yes'},
                        stype: 'select', searchoptions: { sopt: ['eq', 'ne'], value: ':Any;true:Yes;false:No' } },
                    {name: 'ship_via', index: 'ship_via', width: 105, align: 'center', editable: true, formatter: 'select',
                        edittype: 'select', editoptions: {
                            value: 'FE:FedEx;TN:TNT;IN:Intim',
                            dataInit: function (elem) {
                                setTimeout(function () {
                                    $(elem).multiselect({
                                        minWidth: 100, //'auto',
                                        height: "auto",
                                        selectedList: 2,
                                        checkAllText: "all",
                                        uncheckAllText: "no",
                                        noneSelectedText: "Any",
                                        open: function () {
                                            var $menu = $(".ui-multiselect-menu:visible");
                                            $menu.width("auto");
                                            return;
                                        }
                                    });
                                }, 50);
                            },
                            multiple: true,
                            defaultValue: 'IN'
                        },
                        stype: 'select', searchoptions: { sopt: ['eq', 'ne'], value: ':Any;FE:FedEx;TN:TNT;IN:IN' } },
                    { name: 'note', index: 'note', width: 60, sortable: false, editable: true, edittype: 'textarea' }
                ],
            pager: '#pager',
            rowNum: 10,
            rowList: [5, 10, 20, 50],
            sortname: 'id',
            sortorder: 'asc',
            viewrecords: true,
            gridview: true,
            height: "100%",
            editurl: 'clientArray',
            onSelectRow: function (id) {
                if (editingRowId) {
                    $(this).jqGrid('restoreRow', editingRowId, myEditParam);
                }
                $(this).jqGrid('editRow', id, myEditParam);
            },
            caption: "Demonstrate the usage of jQuery UI MultiSelect Widget"
        });
    });
    //]]>
    
    $(yourgrid).setColProp('Country', { editoptions: { value: countries} });
    $('#editDataGridList').jqGrid('delRowData',rowid);