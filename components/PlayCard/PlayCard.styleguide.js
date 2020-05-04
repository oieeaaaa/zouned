/*
*******************************
Stylguide for PlayCard.

NOTE: Not for production use
*******************************
*/
import { useState } from 'react';
import PlayCard from './PlayCard';

export default () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="play-card--styleguide">
      <PlayCard
        title="Moonlight Sonata"
        coverImg="https://images.unsplash.com/photo-1524843496980-e84a553ed501?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2302&q=80"
        isPlaying={isPlaying}
        onPlay={() => setIsPlaying(!isPlaying)}
      />
      <style jsx>
        {`
          .play-card--styleguide {
            grid-column: 2 / -2;
          }
        `}
      </style>
    </div>
  );
};
