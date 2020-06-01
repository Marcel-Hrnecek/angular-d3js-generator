import {Component, OnDestroy, OnInit} from '@angular/core';
import {BarChartDataService} from "../../../services/bar-chart-data.service";
import * as d3 from "d3";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less']
})
export class BarChartComponent implements OnInit, OnDestroy {

  size = 400;

  private margin = {top: 10, right: 20, bottom: 0, left: 20};

  private svg: any;
  private rootData: BarMainData;
  private groupKey = 'group';
  private keys = [];
  private subscription: Subscription;

  private x0;
  private x1;
  private y;

  constructor(
    private chartDataService: BarChartDataService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.chartDataService.barData$
      .subscribe(data => {
        if (!this.rootData) {
          this.createChart(data);
        } else {
          this.updateChart(data);
        }
      });
  }

  createChart(data: BarMainData) {

    this.svg = d3.select('.chartContainer').append('svg')
      .attr('width', this.size)
      .attr('height', this.size)
      .style('overflow', 'visible');

    this.svg.append("g")
      .attr('class', 'yAxis');

    this.buildChart(data);
  }

  updateChart(data: BarMainData) {
    this.buildChart(data);
  }

  buildChart(data: BarMainData) {

    this.rootData = data;
    const content = data.content;
    const contentMeta = data.contentMeta;

    this.keys = Object.keys(contentMeta);
    this.x0 = this.computeX0(content);
    this.x1 = this.computeX1();
    this.y = this.computeY(content);

    this.svg
      .style('border-left', `${data.settings.axisThickness}px solid ${data.settings.axisColor}`)
      .style('border-bottom', `${data.settings.axisThickness}px solid ${data.settings.axisColor}`);

    // Bars
    this.svg.selectAll("g.bar-group")
      .data(data.content, function (d) {
        return d.group
      })
      .join("g")
      .attr('class', 'bar-group')
      .attr("transform", d => `translate(${this.x0(d[this.groupKey])},0)`)
      .selectAll("rect")
      .data(d => this.keys.map(key => ({key, value: d[key]})))
      .join("rect")
      .attr("x", d => this.x1(d.key))
      .attr("y", d => this.y(d.value))
      .attr("width", this.x1.bandwidth())
      .attr("height", d => this.y(0) - this.y(d.value))
      .attr("fill", d => contentMeta[d.key].color);

    // Axis
    this.svg.select('g.yAxis')
      .call(this.yAxis);
  }

  private computeX0(data) {
    return d3.scaleBand()
      .domain(data.map(d => d[this.groupKey]))
      .rangeRound([this.margin.left, this.size - this.margin.right])
      .paddingInner(0.1)
  }

  private computeX1() {
    return d3.scaleBand()
      .domain(this.keys)
      .rangeRound([0, this.x0.bandwidth()])
      .padding(0.05)
  }

  private computeY(data) {
    return d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.max(this.keys, key => d[key]))]).nice()
      .rangeRound([this.size - this.margin.bottom, this.margin.top])
  }

  private yAxis = g => g
    .attr("transform", `translate(-${this.rootData.settings.axisThickness},0)`)
    .call(d3.axisLeft(this.y).ticks(null, "s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line")
      .attr("color", this.rootData.settings.axisColor)
    )
    .call(g => g.selectAll(".tick text")
      .attr("font-size", this.rootData.settings.textSize)
      .attr("fill", this.rootData.settings.textShow ? this.rootData.settings.axisColor : 'none')
    );

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
