//add index 
/*function runningFormatter(value, row, index) {
    return index;
}

//add remove function
    var $table = $('#table'),
        $button = $('#button');

    $(function () {
        $button.click(function () {
            var ids = $.map($table.bootstrapTable('getSelections'), function (row) {
                return row.id;
            });
            $table.bootstrapTable('remove', {
                field: 'id',
                values: ids
            });
        });
    });
*/
//function test for highchart
$(function () { 
	    $('#containerforhighchart').highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'My first Highcharts chart'
	        },
	        xAxis: {
	            categories: ['my', 'first', 'chart']
	        },
	        yAxis: {
	            title: {
	                text: 'something'
	            }
	        },
	        series: [{
	            name: 'Jane',
	            data: [1, 0, 4]
	        }, {
	            name: 'John',
	            data: [5, 7, 3]
	        }],
	        credits: {
            text: 'SmartHome',
            href: 'http://www.baidu.com'
        }   
	    });
	});




$(function () {
    $('#containerpie').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares January, 2015 to May, 2015'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Microsoft Internet Explorer',
                y: 56.33
            }, {
                name: 'Chrome',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Firefox',
                y: 10.38
            }, {
                name: 'Safari',
                y: 4.77
            }, {
                name: 'Opera',
                y: 0.91
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2
            }]
        }]
    });
});





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
        '<a href="http://192.168.1.103:1984/led/close" role="button" class="btn btn-primary">开</a>'+
        '<a href="http://192.168.1.103:1984/led/open" role="button"  class="btn">关</a>'+
        '</div>';


$(function(){
$('.statusbtn:gt(0)').append(statusbtn);
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
            });
        });
    });




  var socket = io();
  $('.mytest').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

socket.on('chat message', function(msg,time){
    $('.powerrate:gt(0)').text(msg);
    $('.updatetime:gt(0)').text(time);
  });































var mongodb=require('../../models/db');


function Post(name,title,post) {
	this.name=name;
	this.title=title;
	this.post=post
}

module.exports=Post;

Post.removeItem=function(callback){
	mongodb.open(function(err,db){
		if (err) {
			return callback(err);
		}
		db.collection('posts',function(err,collection){
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.remove({"title" : "0611"},{
				safe:true
			},function(err){
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
};



