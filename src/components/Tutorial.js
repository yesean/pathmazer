import React, { useState } from 'react';
import './../styles/Tutorial.css';

const Tutorial = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [style, setStyle] = useState({});
  const [prevButtonStyle, setPrevButtonStyle] = useState({
    backgroundColor: '#94caec',
  });
  const [nextButtonStyle, setNextButtonStyle] = useState({});
  const [shouldShowAlgorithms, setShouldShowAlgorithms] = useState(false);

  const texts = [
    [
      'Pathfinding, or the process of finding a route between two points, is an ' +
        'important topic in computer science and graph theory.',
      'Tasks, like solving mazes, navigating video game terrain, and calculating ' +
        'Google Maps results, all utilize pathfinding techniques.',
    ],
    [
      'Over time, different algorithms have emerged in pathfinding. Some are ' +
        'designed to guarantee the shortest path, while others trade optimality ' +
        'for speed.',
    ],
    [
      'This site allows you to visualize and play around with how these ' +
        'algorithms work. You can move around the start and end square. You can also click and drag to add walls (impenetrable) ' +
        'or hold W to add weights (penetrable, cost 10 squares) instead.',
      'You can move around the start and end square after a visualization to see how the new position affects path finding.',
      'Lastly, you can adjust the speed of visualization as well as generate mazes to see how these algorithms solve them!',
    ],
  ];
  const algorithmsIndex = 1;

  const algorithms = [
    ['Dijkstra:', 'Gurantees Shortest Path', 'Weighted', 'Slow'],
    ['A* Search:', 'Guarantees Shortest Path', 'Weighted', 'Medium'],
    ['Greedy BFS:', "Doesn't Guarantee Shortest Path", 'Weighted', 'Fast'],
    ['BFS:', 'Guarantees Shortest Path', 'Unweighted', 'Slow'],
    ['DFS:', "Doesn't Guarantee Shortest Path", 'Unweighted', 'Slow'],
  ];

  const onSkip = () => {
    setStyle({ display: 'none' });
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
  };

  return (
    <div className='tutorialPage' style={style}>
      <div className='tutorialTextContainer'>
        {texts[textIndex].map((text) => (
          <p className='tutorialText'>{text}</p>
        ))}
        <div className='algorithmListContainer'>
          <table className='algorithmList'>
            <tbody>
              {shouldShowAlgorithms &&
                algorithms.map((alg) => (
                  <tr>
                    {alg.map((elem) => (
                      <td>{elem}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='directionContainer'>
        <button className='prevButton' onClick={onPrev} style={prevButtonStyle}>
          {String.fromCharCode(8592)}
        </button>
        <button className='nextButton' onClick={onNext} style={nextButtonStyle}>
          {String.fromCharCode(8594)}
        </button>
      </div>
      <div className='skipContainer'>
        <button className='skipButton' onClick={onSkip}>
          {String.fromCharCode(10005)}
        </button>
      </div>
    </div>
  );
};

export default Tutorial;
