/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 36.666666666666664, "KoPercent": 63.333333333333336};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.1111111111111111, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.08333333333333333, 500, 1500, "https://www.opencart.com/index.php?route=account/login"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.08333333333333333, 500, 1500, "https://www.opencart.com/blog"], "isController": false}, {"data": [0.08333333333333333, 500, 1500, "https://www.opencart.com/index.php?route=marketplace/extension"], "isController": false}, {"data": [0.25, 500, 1500, "https://www.opencart.com/index.php?route=cms/feature"], "isController": false}, {"data": [0.16666666666666666, 500, 1500, "https://www.opencart.com/index.php?route=common/home"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 30, 19, 63.333333333333336, 536.3666666666668, 16, 2177, 49.0, 2034.1000000000015, 2163.8, 2177.0, 3.531489111241907, 77.74322671424368, 3.16224617422013], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://www.opencart.com/index.php?route=account/login", 6, 5, 83.33333333333333, 144.33333333333331, 42, 643, 45.0, 643.0, 643.0, 643.0, 1.9607843137254901, 20.377923304738562, 1.7763225081699345], "isController": false}, {"data": ["Test", 6, 5, 83.33333333333333, 2681.833333333333, 230, 6067, 2425.0, 6067.0, 6067.0, 6067.0, 0.701344243132671, 77.19797906925774, 3.1400679427235536], "isController": true}, {"data": ["https://www.opencart.com/blog", 6, 5, 83.33333333333333, 263.66666666666663, 16, 1378, 48.0, 1378.0, 1378.0, 1378.0, 1.3654984069185252, 18.238871543582157, 1.201034080564406], "isController": false}, {"data": ["https://www.opencart.com/index.php?route=marketplace/extension", 6, 4, 66.66666666666667, 594.8333333333333, 21, 2177, 47.0, 2177.0, 2177.0, 2177.0, 1.0743061772605194, 45.02416489480752, 0.9816332811101164], "isController": false}, {"data": ["https://www.opencart.com/index.php?route=cms/feature", 6, 3, 50.0, 556.0, 18, 1323, 373.5, 1323.0, 1323.0, 1323.0, 0.9601536245799327, 22.144480616898704, 0.8679513722195552], "isController": false}, {"data": ["https://www.opencart.com/index.php?route=common/home", 6, 2, 33.333333333333336, 1123.0, 52, 2153, 1184.5, 2153.0, 2153.0, 2153.0, 0.721240533717995, 15.397264545017428, 0.6303811305445366], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["429/Too Many Requests", 19, 100.0, 63.333333333333336], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 30, 19, "429/Too Many Requests", 19, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["https://www.opencart.com/index.php?route=account/login", 6, 5, "429/Too Many Requests", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://www.opencart.com/blog", 6, 5, "429/Too Many Requests", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://www.opencart.com/index.php?route=marketplace/extension", 6, 4, "429/Too Many Requests", 4, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://www.opencart.com/index.php?route=cms/feature", 6, 3, "429/Too Many Requests", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://www.opencart.com/index.php?route=common/home", 6, 2, "429/Too Many Requests", 2, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
