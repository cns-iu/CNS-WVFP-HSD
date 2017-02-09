barGraph01.events = function(ntwrk) {
    var colDom = [];

    ntwrk.SVG.barGroups.each(function(d, i) {
        var currG = d3.select(this);
        var rects = currG.selectAll("rect")
        rects.each(function(d1, i1) {
            colDom.push(d.LabFlag[i1].values.NumAlive / d.LabFlag[i1].values.NumPatients)
        })
    })

    ntwrk.Scales.colorScale = d3.scale.linear()
        .domain([d3.min(colDom), d3.mean(colDom), d3.max(colDom)])
        .range(["#9b524d", "#ffffa8", "#87a26d"])

    ntwrk.SVG.barGroups.each(function(d, i) {
        var currG = d3.select(this);
        var rects = currG.selectAll("rect")
        rects.each(function(d1, i1) {
            d3.select(this).attr("fill", ntwrk.Scales.colorScale(d.LabFlag[i1].values.NumAlive / d.LabFlag[i1].values.NumPatients))
        }).on("mouseover", function(d1, i1) {
            console.log("Hour: " + i)
            console.log("LabGroup: " + d.LabFlag[i1].key)
            console.log("Survival Rate: " + Math.floor((d.LabFlag[i1].values.NumAlive / d.LabFlag[i1].values.NumPatients) * 100) + "%")
        }).attr("stroke", "black").attr("stroke-width", .5);
    })
}
barGraph02.events = barGraph01.events
barGraph01.configs = {
    "type": "org.cishell.json.vis.metadata",
    "records": {
        "colAggregator": "LabHour",
        "rowAggregator": "LabFlag"
    },
    "bars": {
    	"styleEncoding": {
    		"size": {
                "attr": "NumPatients"
            }
    	}
    },
    "labels": {
        "xAxis": "HSD: Time of Day",
        "yAxis": "Patient Count"
    }
}
barGraph02.configs = {
    "type": "org.cishell.json.vis.metadata",
    "records": {
        "colAggregator": "LabHourGroup",
        "rowAggregator": "LabFlag"
    },
    "bars": {
        "styleEncoding": {
            "size": {
                "attr": "NumPatients"
            }
        }
    },
    "labels": {
        "xAxis": "HSD: Time of Day",
        "yAxis": "Patient Count"
    }
}

barGraph01.dataprep = function(ntwrk) {
    ntwrk.filteredData.records.data = ntwrk.filteredData.records.data.sort(function(a, b) {
        var priority = ["L", "@", "H"];
        if (priority.indexOf(a[configs.barGraph01.records.colAggregator]) > priority.indexOf(b[configs.barGraph01.records.colAggregator])) {
            return 1
        }
        return -1
    });
    ntwrk.filteredData.records.data.forEach(function(d, i) {
        if (d.LabFlag) d.LabFlag = {
            "L": "  Low",
            "@": " Normal",
            "H": "High"
        }[d.LabFlag]
        if (d.LabHourGroup) {
            d.LabHourGroup = {
                "0 (12am-8am)": "12am-8am",
                "1 (8am-4pm)": "_8am-4pm",
                "2 (4pm-12am)": "__4pm-12am"
            }[d.LabHourGroup]
        }
    })
}
barGraph02.dataprep = barGraph01.dataprep;
