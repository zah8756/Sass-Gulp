'use strict';

var initialContainerState = function initialContainerState() {
  return {
    songs: []
  };
};

var renderSongContainer = function renderSongContainer() {
  if (this.state.songs.length === 0) {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h3',
        null,
        'No Songs Yet!'
      )
    );
  }

  var songList = this.state.songs.map(function (song) {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h2',
        null,
        song.artist,
        ' - ',
        React.createElement(
          'i',
          null,
          song.title
        )
      )
    );
  });

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      ' My favoritest songs ever!!@! '
    ),
    songList
  );
};

var loadSongsFromServer = function loadSongsFromServer() {
  var xhr = new XMLHttpRequest();

  var setSongs = function setSongs() {
    var songResponse = JSON.parse(xhr.response);

    this.setState({
      songs: songResponse
    });
  };

  xhr.onload = setSongs.bind(this);

  xhr.open('GET', '/getSongs');

  xhr.send();
};

var SongContainer = React.createClass({
  displayName: 'SongContainer',

  loadSongs: loadSongsFromServer,
  getInitialState: initialContainerState,
  render: renderSongContainer,
  componentDidMount: function componentDidMount() {
    this.loadSongs();
  }
});

var init = function init() {
  ReactDOM.render(React.createElement(SongContainer, null), document.getElementById('app'));
};

window.onload = init;
