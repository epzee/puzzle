var PuzzleApp = React.createClass({
  render: function () {
    //timer
    //overlay
    //imgGrid
    //terminal (parser + feedback)
    return (
      <div>
        <Timer/>
      </div>
    );
  }
});

React.render(<PuzzleApp/>, document.getElementById('main'));