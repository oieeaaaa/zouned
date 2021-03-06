import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

const gridList = [
  {
    name: 'mobile',
    cols: 10,
    gap: 10,
    size: 375,
  },
  {
    name: 'tablet-p',
    cols: 12,
    gap: 10,
    size: 768,
  },
  {
    name: 'tablet-l',
    cols: 18,
    gap: 10,
    size: 1024,
  },
  {
    name: 'desktop',
    cols: 20,
    gap: 10,
    size: 1280,
  },
];

function getCurrentGrid(list) {
  let currentGrid = {};
  if (window.innerWidth > 1280) {
    return list[list.length - 1];
  }

  for (let i = 0; i <= gridList.length - 1; i += 1) {
    if (list[i].size >= window.innerWidth) {
      currentGrid = list[i];
      break;
    }
  }

  return currentGrid;
}

export default () => {
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [gridItem, setGridItem] = useState({});

  useEffect(() => {
    const updateGridItem = throttle(() => {
      setGridItem(getCurrentGrid(gridList));
    }, 100);

    updateGridItem();
    window.addEventListener('resize', updateGridItem);
    return () => window.removeEventListener('resize', updateGridItem);
  }, []);

  useEffect(() => {
    const toggleGrid = throttle((e) => {
      if (!(e.ctrlKey && e.key === 'g')) return;

      setIsGridOpen(!isGridOpen);
    }, 200);

    window.addEventListener('keypress', toggleGrid);

    return () => window.removeEventListener('keypress', toggleGrid);
  });

  const genCols = cols => Array.from({ length: cols }).map((x, i) => <span key={i} />); // eslint-disable-line

  return (
    <div className="grid-guide">
      {genCols(gridItem.cols)}

      <style jsx>
        {`
          .grid-guide {
            display: ${isGridOpen ? 'grid' : 'none'};
            grid-column-gap: ${gridItem.gap}px;
            grid-template-columns: repeat(${gridItem.cols}, 1fr);
          }
        `}
      </style>
    </div>
  );
};
