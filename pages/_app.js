import Player from 'components/Player/Player';
import 'scss/main.scss';

export default ({ Component, pageProps }) => (
  <div>
    <Component {...pageProps} />
    <Player
      title="Sample Sound"
      songSrc="https://uploads.codesandbox.io/uploads/user/dd963ec2-b0b8-442b-b101-60b82b72b396/0b67-20200211%20214500.m4a"
    />
  </div>
);
