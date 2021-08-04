var React = require('react');
var PropTypes = require('prop-types');
var Layout = require('./layout');


// Contrived example to show how one might use Flow type annotations
function countTo(n: number): string {
  var a = [];
  for (var i = 0; i < n; i++) {
    a.push(i + 1);
  }
  return a.join(', ');
}

function Index(props) {
  const today=new Date();

  return (
    <Layout title={props.title}>
      <h1>{props.title}</h1>
      <p>Welcome to {props.title}</p>
      <p>
        This page refreshes every 5 seconds thanks to this metatag in index: <br/> http-equiv="refresh" content="5"
      </p>
      <p className="tentiamoci">
        Now the time is {today.toLocaleString()}
      </p>
      {/* <script dangerouslySetInnerHTML={{__html: refresh}}></script> */}
    </Layout>
  );
}


Index.propTypes = {
  title: PropTypes.string,
};

module.exports = Index;
