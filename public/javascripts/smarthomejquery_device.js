//This is the data of table

var data=[{
        "id": 0,
        "name": "冰箱",
        "devicestatus": "",
        "power": "5555",
        "time":"updatetime"
    },
    {
        "id": 1,
        "name": "电视机",
        "devicestatus": "",
        "power": "6666",
        "time":"updatetime1"
    }];

//This is the title of table
var columns = [
  [{"field":"status",
    "checkbox":true,
    "colspan": 1,
    "rowspan": 2,
    "align":"center",
    "valign":"middle"
  },{
    "field": "id",
    "title": "设备序列号",
    "colspan": 1,
    "rowspan": 2,
    "align":"center",
    "valign":"middle"
  }, {
    "title": "设备明细",
    "colspan": 4,
    "rowspan": 1,
    "align":"center",
    "valign":"middle"
  }], 
  [{
    "field": "name",
    "title": "设备名称",
    "colspan": 1,
    "rowspan": 1,
    "align":"center",
    "valign":"middle"
  }, {
    "field": "devicestatus",
    "title": "设备状态",
    "class":"statusbtn",
    "colspan": 1,
    "rowspan": 1,
    "align":"center",
    "valign":"middle"
  }, {
    "field": "power",
    "class":"powerrate",
    "title": "累计电量",
    "colspan": 1,
    "rowspan": 1,
    "align":"center",
    "valign":"middle"
  }, {
    "field": "time",
    "class":"updatetime",
    "title": "最后更新时间",
    "colspan": 1,
    "rowspan": 1,
    "align":"center",
    "valign":"middle"
  }]
];


$(function() {
  $('#table').bootstrapTable({
    data:data,
    columns: columns,
    clickToSelect: true
  });
});

var statusbtn='<div class="btn-group" data-toggle="buttons-radio">'+
        '<button id="btnopen"  class="btn btn-primary">开</button>'+
        '<button id="btnclose" class="btn">关</a>'+
        '</div>';


$(function(){
$('.statusbtn:gt(0)').append(statusbtn);
});

$(function(){
$('#btnopen').click(function(){
  $.get("http://192.168.1.8:1984/led/open");
});
$('#btnclose').click(function(){
  $.get("http://192.168.1.8:1984/led/close");
});
});

var $table = $('#table'),
    $button = $('#remove');
  $(function () {
        $button.click(function () {
            var ids = $.map($table.bootstrapTable('getSelections'), function (row) {
                return row.id;
            });
            $table.bootstrapTable('remove', {
                field: 'id',
                values: ids
            });
            $(function(){
            $('.statusbtn:gt(0)').append(statusbtn);
            $('#btnopen').click(function(){
                $.get("http://192.168.1.8:1984/led/open");
            });
            $('#btnclose').click(function(){
                $.get("http://192.168.1.8:1984/led/close");
            });
            });
        });
    });


