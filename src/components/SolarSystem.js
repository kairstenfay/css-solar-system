import React from 'react';
import styled from 'styled-components';

import { revolve } from './utils';

export default class SolarSystem extends React.Component {
    render() {
        const [width, height, margin] = [300, 300, 10];

        const sunRadius = 20;

        const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
        const planetColors = [
            ["#9a3718", "#b0983c"],
            ["#fd4425", "#ecc349"],
            ["#2b76a3", "#3a6f9e"],
            ["#be3025", "#b55254"],
            ["#a5804a", "#c2afa0"],
            ["#6e3e21", "#b5a395"],
            ["#475d7b", "#5d71b1"],
            ["#2c46af", "#3a4fa7"]
        ];

        const mercuryDistanceFromSun = 30;
        const planetMercuryRadii = [1, 1.5, 2, 1.8, 3, 2.4, 2.3, 2.5];

        return (
            <div>
                <h1>The Solar System</h1>

                <svg viewBox={`0 0 ${width + margin * 2} ${height + margin * 2}`}
                     width="100%"
                     height="100%">

                    <defs>
                        <radialGradient id="SunGradient">
                            <stop offset="0%" stopColor="yellow"/>
                            <stop offset="100%" stopColor="orange"/>
                        </radialGradient>

                        {planets.map((m, i) =>
                            <radialGradient
                                key={`planet${i}`}
                                id={`Planet${i}`}
                                fx="0.5" fy="0.5"
                                cx="0.5" cy="0.5"
                                r="0.9">
                                <stop offset="0%" stopColor={planetColors[i][0]} />
                                <stop offset="100%" stopColor={planetColors[i][1]} />
                            </radialGradient>
                        )};
                    </defs>

                    <g key="stars">
                        {planets.map((m, i) =>
                            <circle key={`star${i}`}
                                    cx={Math.floor(Math.random() * height)}
                                    cy={Math.floor(Math.random() * width)}
                                    r={Math.random()}
                                    fill="white" />
                        )};
                    </g>
                    <g key="sun-and-orbits"
                       transform={`translate(${width / 2}, ${height / 2})`}>
                        <circle key="sun"
                                cx="0" cy="0"
                                r={sunRadius}
                                fill="url(#SunGradient)" />

                        {planets.map((m, i) =>
                            <circle key={`orbit${i}`}
                                    cx="0" cy="0"
                                    r={i * 15 + mercuryDistanceFromSun} // TODO planetaryOrbitLengths
                                    fill="transparent"
                                    stroke="grey"
                                    strokeWidth="1" />
                        )};
                    </g>

                    <g key="planets"
                       transform={`translate(${width / 2}, ${height / 2})`}>
                        {planets.map((m, i) => {

                            const Revolve = styled.g`
                            display: inline-block;
                            width: 100%;
                            animation: ${revolve} ${i * 4 + 5}s linear infinite;
                            `
                            return (
                                <Revolve>
                                    <circle key={'planet' + i}
                                            cx={i * 15 + mercuryDistanceFromSun}
                                            cy="0"
                                            r={planetMercuryRadii[i] * 4}
                                            fill={`url(#Planet${i})`} />
                                </Revolve>
                            );
                        })}
                    </g>
                </svg>
            </div>
        )
    }
}
