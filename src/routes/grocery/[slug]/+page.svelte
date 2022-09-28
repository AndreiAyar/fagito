<script lang="ts">
	import type { PageData } from '../../../../.svelte-kit/types/src/routes/product/[slug]/$types';
	import * as d3 from 'd3';
	import moment from 'moment';
	import { onMount } from 'svelte';
	export let data: PageData;
	let d3Data = data.priceHistory;
	let el;

	const margin = { top: 10, right: 100, bottom: 30, left: 100 },
		width = 1360 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	onMount(() => {
		const svg = d3
			.select(el)
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);
		const x = d3
			.scaleLinear()
			.domain(
				d3.extent(d3Data, function (d) {
					return d3.timeParse('%Y-%m-%d')(d.date);
				})
			)
			.range([0, width]);

		svg
			.append('g')
			.attr('transform', `translate(0, ${height})`)
			.call(d3.axisBottom(x).tickFormat(d3.timeFormat('%Y-%m-%d')));

		const y = d3
			.scaleLinear()
			.domain([
				0,
				d3.max(d3Data, function (d) {
					return +d.avg + 10;
				})
			])
			.range([height, 0]);
		svg.append('g').call(d3.axisLeft(y));

		svg
			.append('path')
			.datum(d3Data)
			.attr('fill', 'none')
			.attr('stroke', 'steelblue')
			.attr('stroke-width', 1.5)
			.attr(
				'd',
				d3
					.line()
					.x(function (d) {
						return x(d3.timeParse('%Y-%m-%d')(d.date));
					})
					.y(function (d) {
						return y(+d.avg);
					})
			);
		svg
			.append('g')
			.selectAll('rect')
			.data(d3Data)
			.enter()
			.append('rect')
			.attr('fill', 'purple')
			.attr('width', 60)
			.attr('fill', "#EAB307")
			.attr('height', 30)
            .attr('rx',10)
            .attr('ry',10)
			.attr('x', function (d) {
				return x(d3.timeParse('%Y-%m-%d')(d.date)) - 20;
			})
			.attr('y', function (d) {
				return y(d.avg) - 30;
			})
			.text(function (d) {
				return +d.avg.toFixed(2);
			});
		svg
			.append('g')
			.selectAll('text')
			.data(d3Data)
			.enter()
			.append('text')
			.attr('x', function (d) {
				return x(d3.timeParse('%Y-%m-%d')(d.date)) - 10;
			})
			.attr('y', function (d) {
				return y(d.avg) - 10;
			})
			.text(function (d) {
				return +d.avg.toFixed(2);
			});
	});
</script>

<div class="container m-auto">
	{#if data}
		<h1>{data?.product?.title || ''}</h1>
	{/if}
	{#if data}
    <div class="justify-center text-center items-center flex-col">
		<img class="w-80 h-80 m-auto pt-2 rounded-lg object-contain" src={data?.product?.imageSrc} alt="Product" />
        <a href={data?.product?.url}  target="_blank">View product 👉</a>
        <p class="dark:bg-purple-500 bg-primary-200 w-[30%] mx-auto mt-4 p-2 rounded-lg">Price history:</p>
    </div>
   
	{/if}
 
	<div bind:this={el} class="chart" />
</div>
