import React, {useRef, useEffect} from "react";
import * as d3 from 'd3';

const BarChart = ({data, width, height}) => {
    const svgRef = useRef()

    useEffect(()=>{
        if (!data || data.length===0) return;
        const svg = d3.select(svgRef.current)

        // clear the previous element
        svg.selectAll('*').remove();

        // set all dimensions and margins
        const margin = {top: 20, right: 20, bottom: 30, left: 40}
        const innerWidth = width - margin.left - margin.right
        const innerHeight = height - margin.top  - margin.bottom

        // create x nd y scales
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.label))
            .range([0, innerWidth])
            .padding(0.1)

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d=> d.value)])
            .nice()
            .range([innerHeight, 0])
        
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)
        
        // create bars
        g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d.label))
            .attr('y', d => yScale(d.value))
            .attr('width', xScale.bandwidth())
            .attr('height', d => innerHeight - yScale(d.value))
            .attr('fill', 'steelblue')
        
        // add x axis
        g.append('g')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .style('text-anchor', 'center')
            // .attr('transform', 'rotate(-90)');
        
        // add y axis
        g.append('g')
            .call(d3.axisLeft(yScale))

    }, [data, width, height])

    return (
        <svg ref={svgRef} width={width} height={height}>
            {/* svg elements will be contained here */}
        </svg>
    )

}

export default BarChart