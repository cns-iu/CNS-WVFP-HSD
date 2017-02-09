head.js("lib/d3.tip.js");

events.heatMap01 = function(ntwrk) {  



    var totNumAlive = d3.sum(ntwrk.data.get("records").data, function(d, i) {
        return d.NumAlive;
    });
    var totNumPatients = d3.sum(ntwrk.data.get("records").data, function(d, i) {
        return d.NumPatients;
    });
    $("#pspan").html(" " + formatText(totNumPatients))
    $("#sspan").html(" " + Math.round((totNumAlive / totNumPatients) * 10000) / 100 + "%")

    ntwrk.SVG.switchText = function(measure) {
        updateCellValues(measure);
        updateAggBarSize(measure);
    }
    ntwrk.SVG.switchText("p");
    ntwrk.SVG.switchText("s");

    ntwrk.SVG.selectAll("text").text(function(d, i) {
            var text = d3.select(this);
            return text.text().replaceAll("_", "")
        })
        // ntwrk.SVG.selectAll("text").classed("l2", true)

    function formatText(t) {
        // return d3.format("s")(t);
        return d3.format("0,000")(t)
    }
    appendPopups();
    var tipShowing = false;

    function appendPopups() {
        if (tipShowing) {
            tip.hide();
            tipShowing = false;
        } else {
            var tip = d3.tip().attr('class', 'd3-tip').html(function(d) {
                return d; });
            ntwrk.SVG.selectAll(".cell").selectAll("rect").on("click", function(d, i) {
                tip.offset([0, 0]).html("<p>#Tested: " + (formatText(d.values.NumPatients) || "-") + "</p><p>#Surviving (3-Year): " + (formatText(d.values.NumAlive || "-")) + "</p><p>%Survival (3-Year): " + ((Math.floor(d.values.NumAlive / d.values.NumPatients * 10000) / 100) || "-") + "%</p>")
                ntwrk.SVG.call(tip);
                tip.show(d3.select(this))
            })
            tipShowing = true;
        }
    }

    function updateCellValues(measure) {
        var measureVal;
        var textVal;
        var textFunc;
        var legendTitle;

        if (measure == "p") {
            textVal = function(v) {
                return formatText(v)
            }
            measureVal = function(d, i) {
                return d.values.NumPatients
            }
            textFunc = function(d, i) {
                if (typeof d.values.NumPatients == "undefined") {
                    return "-"
                }
                return textVal(d.values.NumAlive) + "/" + textVal(d.values.NumPatients)
            }
            legendTitle = "#Patients"
        } else {
            textVal = function(v) {
                return formatText(Math.round(v * 10000) / 100) + "%"
            }
            measureVal = function(d, i) {
                return d.values.NumAlive / d.values.NumPatients
            };
            textFunc = function(d, i) {
                if (typeof d.values.NumPatients == "undefined") {
                    return "-"
                }
                return textVal(d.values.NumAlive / d.values.NumPatients);
            }

            legendTitle = "3-Year Survival Rate"
        }
        ntwrk.SVG.selectAll(".cell").each(function(d, i) {}).select("text")
            .text(textFunc)
        var dataExtent = d3.extent(ntwrk.SVG.selectAll(".cell").data(), measureVal)
        try {
            // visualizations.componentNodeColorLegend01.SVG.updateText(textVal(dataExtent[0]), textVal(dataExtent[1]))
            // visualizations.componentNodeColorLegend01.SVG.updateTitleText(legendTitle)
        } catch (e) {

        }

    }
    updateCellColor();

    function updateCellColor() {
        var measureVal = function(d, i) {
            return d.values.NumAlive / d.values.NumPatients
        }
        ntwrk.SVG.colorScale = d3.scale.linear()
            .domain([d3.min(ntwrk.SVG.selectAll(".cell").data(), measureVal), d3.mean(ntwrk.SVG.selectAll(".cell").data(), measureVal), d3.max(ntwrk.SVG.selectAll(".cell").data(), measureVal)])
            .range(["#9b524d", "#ffffa8", "#87a26d"]);

        ntwrk.SVG.selectAll(".cell").selectAll("rect")
            .attr("fill", function(d, i) {
                var val = measureVal(d, i);
                if (typeof d.values.NumPatients == "undefined") {
                    return "lightgrey"
                }
                return ntwrk.SVG.colorScale(val)
            })
    }

    function updateAggBarSize(measure) {
        var textVal;
        var measureVal;
        var textFunc;
        var legendTitle;
        if (measure == "p") {
            textVal = function(v) {
                return formatText(v);
            }
            measureVal = function(d, i) {
                return d.values.NumPatients
            }
            textFunc = function(d, i) {
                if (typeof d.values.NumPatients == "undefined") {
                    return "-"
                }
                return textVal(d.values.NumPatients)
            }
            ntwrk.Scales.vBarSize = d3.scale.linear()
                .domain([0, d3.max(ntwrk.SVG.rowBars.data(), measureVal)])
                .range([0, 100])
            ntwrk.Scales.hBarSize = d3.scale.linear()
                .domain([0, d3.max(ntwrk.SVG.colBars.data(), measureVal)])
                .range([0, 100])
            legendTitle = "#Patients";
        } else {
            textVal = function(v) {
                return formatText(v) + "%"
            }
            measureVal = function(d, i) {
                return Math.round(d.values.NumAlive / d.values.NumPatients * 10000) / 100
            }
            textFunc = function(d, i) {
                if (typeof d.values.NumPatients == "undefined") {
                    return "-"
                }
                return textVal(Math.round(d.values.NumAlive / d.values.NumPatients * 10000) / 100)
            }

            ntwrk.Scales.vBarSize = d3.scale.linear()
                .domain([0, 100])
                .range([0, 100])
            ntwrk.Scales.hBarSize = d3.scale.linear()
                .domain([0, 100])
                .range([0, 100])
            legendTitle = "%Survival (3-Year)";

        }
        ntwrk.SVG.rowBars.select("text").text(textFunc)
        ntwrk.SVG.colBars.select("text").text(textFunc)
        ntwrk.Scales.vBarColor = d3.scale.linear()
            .domain([0, d3.max(ntwrk.SVG.rowBars.data(), measureVal)])
            .range(["#dfeef8", "#a9cde7", "#76a7ca"])
        ntwrk.Scales.hBarColor = d3.scale.linear()
            .domain([0, d3.max(ntwrk.SVG.colBars.data(), measureVal)])
            .range(["#f1e4fb", "#d4b6ec", "#b188d2"])
        ntwrk.SVG.rowBars.each(function(d, i) {
            var val = measureVal(d, i);
            d3.select(this).select("rect")
                .attr("width", ntwrk.Scales.vBarSize(val))
                .attr("fill", ntwrk.Scales.vBarColor(val))
        });
        ntwrk.SVG.colBars.each(function(d, i) {
            var val = measureVal(d, i);
            d3.select(this).select("rect")
                .attr("height", ntwrk.Scales.hBarSize(val))
                .attr("fill", ntwrk.Scales.hBarColor(val))
        });

        ntwrk.Scales.xAxis.scale(ntwrk.Scales.hBarSize)
        ntwrk.Scales.yAxis.scale(ntwrk.Scales.vBarSize)
        ntwrk.SVG.yAxis.call(ntwrk.Scales.yAxis);
        ntwrk.SVG.xAxis.call(ntwrk.Scales.xAxis);


        ntwrk.SVG.xAxis.selectAll("g").filter(function(d) {
                return d;
            })
            .classed("minor", true).filter("text");
        ntwrk.SVG.yAxis.selectAll("g").filter(function(d) {
                return d;
            })
            .classed("minor", true);


        var rowDataExtent = [0, d3.max(ntwrk.SVG.rowBars.data(), measureVal)]
        var colDataExtent = [0, d3.max(ntwrk.SVG.colBars.data(), measureVal)]
        try {

            componentNodeColorLegend02.SVG.updateText(textVal(colDataExtent[0]), textVal(colDataExtent[1]))
            componentNodeColorLegend02.SVG.updateTitleText(legendTitle + " per Time Group")
            componentNodeColorLegend03.SVG.updateText(textVal(rowDataExtent[0]), textVal(rowDataExtent[1]))
            componentNodeColorLegend03.SVG.updateTitleText(legendTitle + " per WBC Group")
        } catch (e) {

        }


    }


    componentNodeColorLegend01.update(heatMap01.SVG.colorScale, function(v) {
        return Math.round(v * 10000) / 100 + "%"
    })

    componentNodeColorLegend02.update(heatMap01.Scales.hBarColor, function(v) {
        return Math.round(v * 100) / 100 + "%"
    })

    componentNodeColorLegend03.update(heatMap01.Scales.vBarColor, function(v) {
        return Math.round(v * 100) / 100 + "%"
    })


}

// heatMap02.events = heatMap01.events
configs1 = {
    "type": "org.cishell.json.vis.metadata",
    "records": {
        "rowAggregator": "LabHourGroup",
        "colAggregator": "LabFlag"
    },

    "labels": {
        "xAxis": "Pathophysiology: WBC Count",
        "yAxis": "HSD: Time of Day"
    },
    "prettyMap": {
        "0": "Midnight - 1am",
        "1": "1am - 2am",
        "2": "2am - 3am",
        "3": "3am - 4am",
        "4": "4am - 5am",
        "5": "5am - 6am",
        "6": "6am - 7am",
        "7": "7am - 8am",
        "8": "8am - 9am",
        "9": "9am - 10am",
        "10": "10am - 11am",
        "11": "11am - Noon",
        "12": "Noon - 1pm",
        "13": "1pm - 2pm",
        "14": "2pm - 3pm",
        "15": "3pm - 4pm",
        "16": "4pm - 5pm",
        "17": "5pm - 6pm",
        "18": "6pm - 7pm",
        "19": "7pm - 8pm",
        "20": "8pm - 9pm",
        "21": "9pm - 10pm",
        "22": "10pm - 11pm",
        "23": "11pm - Midnight"
    }
}
configs2 = {
    "type": "org.cishell.json.vis.metadata",
    "records": {
        "rowAggregator": "LabHour",
        "colAggregator": "LabFlag"
    },
    "labels": {
        "xAxis": "Pathophysiology: WBC Count",
        "yAxis": "HSD: Time of Day - Hourly View"
    }
}
configs2.prettyMap = configs1.prettyMap
configs.heatMap01 = configs1;

// heatMap02.configs.styleEncoding = heatMap01.configs.styleEncoding

dataprep.heatMap01 = function(ntwrk) {
    console.log(ntwrk.filteredData.records.data)
    heatmapGenericDataprep(ntwrk, "heatMap01");
}

function heatmapGenericDataprep(ntwrk, identifier) {

    var schema = ntwrk.filteredData.records.schema;
    var config;
    for (index = 0; index < schema.length; ++index) {
        entry = schema[index];
        console.log(entry);
        if (entry.name == "LabHour") {
            console.log("hereo");
            break;
        } else if (entry.name == "LabHourGroup") {
            config = configs1;
            break;
        }
    }

    heatMap01.configs = config;

    ntwrk.filteredData.records.data = ntwrk.filteredData.records.data.sort(function(a, b) {
        var priority = ["L", "@", "H"];
        if (priority.indexOf(a[config.records.colAggregator]) > priority.indexOf(b[config.records.colAggregator])) {
            return 1
        }
        return -1
    });
    ntwrk.filteredData.records.data.forEach(function(d, i) {
        if (d.LabFlag) d.LabFlag = {
            "L": "Low WBC Count",
            "@": " Normal WBC Count",
            "H": "  High WBC Count"
        }[d.LabFlag]
        if (d.LabHourGroup) {
            d.LabHourGroup = {
                "0 (12am-8am)": "Midnight-8am",
                "1 (8am-4pm)": "_8am-4pm",
                "2 (4pm-12am)": "__4pm-Midnight"
            }[d.LabHourGroup]
        }

    })
}
