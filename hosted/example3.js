'use strict';

var initialFriendContainerState = function initialFriendContainerState() {
  return {
    name: 'Cody',
    friends: ['My', 'Myself', 'I', 'The gangs all here']
  };
};

var initialFriendState = function initialFriendState() {
  return {
    newFriend: ''
  };
};

var defaultListProps = function defaultListProps() {
  return {
    names: []
  };
};

var addFriendToContainer = function addFriendToContainer(friend) {
  this.setState({
    friends: this.state.friends.concat([friend])
  });
};

var renderFriendContainer = function renderFriendContainer() {
  /** Items passed in as attributes are called props.
      These will be inherited as this.props in children
      made by this element. 
    
      The attribute name is the variable name
      <ShowList names=['Cody', 'V'] />
      would make a new ShowList object
      with this.props.names set equal to ['Cody', 'V']
      
      In this 
      <AddFriend addNew={this.addFriendToContainer} />
      line we are setting a prop inside of
      an AddFriend object as this.props.addNew 
      that is set equal to the Container object's 
      this.addFriendToContainer function.
      
      That has to be a function, because our
      AddFriend object's have a propTypes config
      for addNew set to a React.PropTypes.func 
      which is a function. 
      
      PropTypes allow type checking on a variable.
      Check out prop type options here
      https://facebook.github.io/react/docs/typechecking-with-proptypes.html
  **/
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h3',
      null,
      ' Name: ',
      this.state.name,
      ' '
    ),
    React.createElement(AddFriend, { addNew: this.addFriendToContainer }),
    React.createElement(ShowList, { names: this.state.friends })
  );
};

var renderList = function renderList() {
  //map is a build-in for-each loop for an array
  //but lets you selectively add/edit/remove
  //on the fly while building a new array
  var listItems = this.props.names.map(function (friend) {
    return React.createElement(
      'li',
      null,
      ' ',
      friend,
      ' '
    );
  });
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h3',
      null,
      ' Friends '
    ),
    React.createElement(
      'ul',
      null,
      listItems
    )
  );
};

var updateNewFriend = function updateNewFriend(e) {
  this.setState({
    newFriend: e.target.value
  });
};

var addNewFriend = function addNewFriend(e) {
  this.props.addNew(this.state.newFriend);
  this.setState({
    newFriend: ''
  });
};

var renderFriend = function renderFriend() {
  return React.createElement(
    'div',
    null,
    React.createElement('input', { type: 'text', value: this.state.newFriend, onChange: this.updateNewFriend }),
    React.createElement(
      'button',
      { onClick: this.handleAddNew },
      ' Add Friend '
    )
  );
};

var FriendsContainer = React.createClass({
  displayName: 'FriendsContainer',

  getInitialState: initialFriendContainerState,
  addFriendToContainer: addFriendToContainer,
  render: renderFriendContainer
});

var AddFriend = React.createClass({
  displayName: 'AddFriend',

  getInitialState: initialFriendState,
  updateNewFriend: updateNewFriend,
  handleAddNew: addNewFriend,
  render: renderFriend,
  propTypes: {
    addNew: React.PropTypes.func.isRequired
  }
});

var ShowList = React.createClass({
  displayName: 'ShowList',

  getDefaultProps: defaultListProps,
  render: renderList
});

var init = function init() {
  ReactDOM.render(React.createElement(FriendsContainer, null), document.getElementById('app'));
};

window.onload = init;
