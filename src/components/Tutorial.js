import React, { useState } from 'react';
import './../styles/Tutorial.css';

const Tutorial = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [prevButtonStyle, setPrevButtonStyle] = useState({
    backgroundColor: '#94caec',
  });
  const [nextButtonStyle, setNextButtonStyle] = useState({});
  const [shouldShowTutorialPage, setShouldShowTutorialPage] = useState(true);
  const [shouldShowAlgorithms, setShouldShowAlgorithms] = useState(false);
  const [shouldShowSiteOptions, setShouldShowSiteOptions] = useState(false);

  const texts = [
    [
      'Pathfinding, or the process of finding a route between two points, is an ' +
        'important topic in computer science and graph theory.',
      'Tasks, like solving mazes, navigating video game terrain, and calculating ' +
        'Google Maps, all utilize pathfinding techniques.',
    ],
    [
      'Over time, different algorithms have emerged in pathfinding. Some are ' +
        'designed to guarantee the shortest path, while others trade optimality ' +
        'for speed.',
    ],
    [
      'You can play around with and visualize how these ' +
        'algorithms work.',
    ],
  ];
  const algorithmsIndex = 1;
  const siteOptionsIndex = 2;

  const algorithms = [
    ['Dijkstra:', 'Gurantees Shortest Path', 'Weighted', 'Slow'],
    ['A* Search:', 'Guarantees Shortest Path', 'Weighted', 'Medium'],
    ['Greedy BFS:', "Doesn't Guarantee Shortest Path", 'Weighted', 'Fast'],
    ['BFS:', 'Guarantees Shortest Path', 'Unweighted', 'Slow'],
    ['DFS:', "Doesn't Guarantee Shortest Path", 'Unweighted', 'Slow'],
  ];

  const siteOptions = [
    ['Move around the start and end square'],
    ['Click and drag to add walls (impenetrable)'],
    ['Hold W to add weights (penetrable, cost 10 squares) instead'],
    [
      'Move around the start and end square after a visualization to see how the new position affects path finding',
    ],
    [
      'Adjust the speed of visualization as well as generate mazes to see how these algorithms solve them!',
    ],
  ];

  const onSkip = () => {
    setShouldShowTutorialPage(false);
  };
  const onPrev = () => {
    if (textIndex > 0) {
      setTutorialPage(textIndex - 1);
      setTextIndex((i) => i - 1);
    }
  };
  const onNext = () => {
    if (textIndex < texts.length - 1) {
      setTutorialPage(textIndex + 1);
      setTextIndex((i) => i + 1);
    }
  };

  const setTutorialPage = (textIndex) => {
    if (textIndex === texts.length - 1) {
      setNextButtonStyle({
        backgroundColor: '#94caec',
      });
    } else {
      setNextButtonStyle({});
    }
    if (textIndex === 0) {
      setPrevButtonStyle({
        backgroundColor: '#94caec',
      });
    } else {
      setPrevButtonStyle({});
    }
    if (textIndex === algorithmsIndex) {
      setShouldShowAlgorithms(true);
    } else {
      setShouldShowAlgorithms(false);
    }
    if (textIndex === siteOptionsIndex) {
      setShouldShowSiteOptions(true);
    } else {
      setShouldShowSiteOptions(false);
    }
  };

  return (
    shouldShowTutorialPage && (
      <div className='tutorialPage'>
        <div className='tutorialTextContainer'>
          {texts[textIndex].map((text) => (
            <p key={text} className='tutorialText'>
              {text}
            </p>
          ))}
          {shouldShowAlgorithms && (
            <div className='algorithmListContainer'>
              <table className='algorithmList'>
                <tbody>
                  {algorithms.map((alg) => (
                    <tr key={alg}>
                      {alg.map((elem) => (
                        <td key={elem}>{elem}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {shouldShowSiteOptions && (
            <div className='siteOptionsListContainer'>
              <ul className='siteOptionsList'>
                {siteOptions.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className='directionContainer'>
          <button
            className='prevButton'
            onClick={onPrev}
            style={prevButtonStyle}>
            {String.fromCharCode(8592)}
          </button>
          <button
            className='nextButton'
            onClick={onNext}
            style={nextButtonStyle}>
            {String.fromCharCode(8594)}
          </button>
        </div>
        <div className='skipContainer'>
          <button className='skipButton' onClick={onSkip}>
            {String.fromCharCode(10005)}
          </button>
        </div>
      </div>
    )
  );
};

export default Tutorial;
