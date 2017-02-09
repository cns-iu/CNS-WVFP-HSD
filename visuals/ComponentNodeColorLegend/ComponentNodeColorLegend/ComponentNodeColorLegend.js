configs.componentNodeColorLegend01 = {
    "title": "%Survival (3-Year)",
}
configs.componentNodeColorLegend02 = {
    "title": "%Survival (3-Year) per WBC Group",
}
configs.componentNodeColorLegend03 = {
        "title": "%Survival (3-Year) per Time Group",
    }

visualizationFunctions.ComponentNodeColorLegend = function(element, data, opts) {
    var that = this;
    this.config = this.CreateBaseConfig();
    this.SVG = d3.select(element[0])
        .append("svg")
        .attr("width", this.config.dims.width + this.config.margins.left - this.config.margins.right)
        .attr("height", this.config.dims.height + this.config.margins.top - this.config.margins.bottom)
        .style("background", "none")
        .append("g")
        .attr("class", "canvas " + opts.ngIdentifier)
    this.VisFunc = function() {
        that.update = function(data, formatter) {
            var scale = data
            var legendData = scale.range();
            var w = that.config.dims.width * .75;
            var stopPercentScale = d3.scale.linear()
                .domain([0, legendData.length - 1])
                .range([0, 100])
            that.SVG.gradient = that.SVG.append("svg:defs")
                .append("svg:linearGradient")
                .attr("id", "colorGradient-" + opts.ngIdentifier)
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "100%")
                .attr("y2", "0%")
                .attr("spreadMethod", "pad");
            for (var i = 0; i < legendData.length; i++) {
                that.SVG.gradient.append("svg:stop")
                    .attr("offset", stopPercentScale(i) + "%")
                    .attr("stop-color", legendData[i])
                    .attr("stop-opacity", 1);
            }

            that.SVG.leftText = that.SVG.append("text")
                .attr("class", "l2")
                .attr("x", "10%")
                .attr("y", that.config.dims.fixedHeight / 3 * 2)
                .attr("text-anchor", "start")
            that.SVG.rightText = that.SVG.append("text")
                .attr("class", "l2")
                .attr("x", "90%")
                .attr("y", that.config.dims.fixedHeight / 3 * 2)
                .attr("text-anchor", "end")


            that.SVG.updateText = function(lefttext, righttext) {
                that.SVG.leftText.text(lefttext)
                that.SVG.rightText.text(righttext)
            }

            that.SVG.updateTitleText = function(text) {
                $(element).find("span").html(text)
            }

            that.SVG.updateText(formatter(scale.domain()[0]), formatter(scale.domain()[scale.domain().length - 1]))
            that.SVG.updateTitleText(that.config.meta.title);

            that.SVG.append("svg:rect")
                .attr("class", "b")
                .attr("width", w)
                .attr("height", "25%")
                .attr("x", "12.5%")
                .attr("y", "22.5%")
                .style("fill", "url(#colorGradient-" + opts.ngIdentifier + ")")
        }

    }
    return that;
}
