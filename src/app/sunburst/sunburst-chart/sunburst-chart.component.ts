import {Component, OnInit} from '@angular/core';
import * as d3 from "d3";
import {svg} from "d3";
import {ChartDataService} from "../../services/chart-data.service";

@Component({
  selector: 'app-sunburst-chart',
  templateUrl: './sunburst-chart.component.html',
  styleUrls: ['./sunburst-chart.component.less']
})
export class SunburstChartComponent implements OnInit {

  size = 400;
  radius = 200; // this.width / 2;

  private svg: any;
  private rootData: any;

  constructor(
    private chartDataService: ChartDataService
  ) {
  }

  ngOnInit(): void {
    this.chartDataService.sunburstData$
      .subscribe(data => {
        if (!this.rootData) {
          this.createChart(data);
        } else {
          this.updateChart(data);
        }
      });
  }

  createChart(data: any) {
    this.rootData = this.partition(data);

    this.svg = d3.select('.chartContainer').append('svg')
      .attr('width', this.size)
      .attr('height', this.size)
      .attr("viewBox", `-${this.size / 2}, -${this.size / 2}, ${this.size}, ${this.size}`);

    // Sunburst-Slices
    this.svg.append("g");
    // Texts in those slices
    this.svg.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif");

    this.buildChart(data);
  }

  updateChart(data: any) {
    this.rootData = this.partition(data);
    this.buildChart(data);
  }

  buildChart(data: any) {

    this.svg.selectAll("g")
      .filter((d, i) => i === 0)
      .selectAll("path")
      .data(this.rootData.descendants().filter(d => d.depth))
      .join("path")
      .attr("fill", d => d.data.color)
      .attr("fill-opacity", d => {
        if (d && d.depth === 1) return 0.6; else return 1;
      })
      .attr("d", this.arc());

    this.svg.selectAll("g")
      .filter((d, i) => i === 1)
      .style('visibility', () => data.show_text ? 'visible' : 'hidden')
      .selectAll("text")
      .data(this.rootData.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
      .join("text")
      .attr("transform", function (d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr("dy", "0.35em")
      .attr("fill", "white")
      .text(d => d.data.name);
  }

  partition(data) {
    return d3.partition()
      .size([2 * Math.PI, this.radius])
      (d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => a.data.order - b.data.order)
      )
  }

  arc() {
    return d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 4, 0.005))
      .padRadius(this.radius / 2)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1 - 1);
  }
}
