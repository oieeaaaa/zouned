/*
***************************************
Component: PlayCard
Author: Joimee
Description:
***************************************
*/
import Icon from 'components/Icon/Icon';

export default ({
  title,
  coverImg,
  isPlaying,
  onPlay,
}) => (
  <div className="play-card">
    <button className="play-card__btn" type="button" onClick={onPlay}>
      <Icon
        src={isPlaying ? 'pause-icon--white-md.svg' : 'play-icon--white-md.svg'}
      />
    </button>
    <h3 className="play-card__title">{title}</h3>
    <style jsx>
      {`
          .play-card {
            background-image: url(${coverImg});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
      `}
    </style>
  </div>
);
