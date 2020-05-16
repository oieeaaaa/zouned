/*
*******************************
Stylguide for SongList.

NOTE: Not for production use
*******************************
*/

import SongList from './SongList';

export const songs = [
  {
    id: 1,
    title: 'Kathang Isip',
    description: "Kathang Isip -- Joimee's Cover",
    artist: 'Joimee',
    imgSrc: '/assets/joimee.jpg',
    songSrc: '/assets/kathang-isip.m4a',
    createdAt: '2020-05-10T00:35:12.000Z',
    updatedAt: '2020-05-10T00:35:12.000Z',
    category: {
      id: 1,
      name: 'Binaurial',
      createdAt: '2020-05-10T00:35:12.000Z',
      updatedAt: '2020-05-10T00:35:12.000Z',
    },
    duration: 10,
  },
  {
    id: 2,
    title: 'Leavesssssssssssssssssssssssssssssssssss',
    description: "Leaves -- Joimee's Cover",
    artist: 'Joimee',
    imgSrc: '/assets/joimee.jpg',
    songSrc: '/assets/kathang-isip.m4a',
    createdAt: '2020-05-10T00:35:12.000Z',
    updatedAt: '2020-05-10T00:35:12.000Z',
    category: {
      id: 1,
      name: 'Binaurial',
      createdAt: '2020-05-10T00:35:12.000Z',
      updatedAt: '2020-05-10T00:35:12.000Z',
    },
    duration: 83,
  },
  {
    id: 3,
    title: 'Your universe',
    description: "Your universe -- Joimee's Cover",
    artist: 'Joimee',
    imgSrc: '/assets/joimee.jpg',
    songSrc: '/assets/kathang-isip.m4a',
    createdAt: '2020-05-10T00:35:12.000Z',
    updatedAt: '2020-05-10T00:35:12.000Z',
    category: {
      id: 1,
      name: 'Binaurial',
      createdAt: '2020-05-10T00:35:12.000Z',
      updatedAt: '2020-05-10T00:35:12.000Z',
    },
    duration: 55,
  },
];

export default () => (
  <div className="song-list--styleguide">
    <SongList list={songs} />
    <style jsx>
      {`
        .song-list--styleguide {
          grid-column: 2 / -2;
        }
      `}
    </style>
  </div>
);
