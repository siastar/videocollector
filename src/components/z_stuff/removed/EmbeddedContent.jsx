import React from "react";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";

export default class EmbeddedContent extends React.Component {
  //constructor(props) {
  // super(props);
  // this.state = {
  //   testState: "state reached!",
  // };
  //}

  componentDidMount() {}

  render() {
    const content = (
      <iframe
        width="90%"
        src="https://www.youtube.com/embed/6bQGLT_cuSU"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );

    return (
      <div className="embeddedcontent">
        <div style={{ width: 660, height: "auto" }}>
          <ResponsiveEmbed aspectRatio="16by9">{content}</ResponsiveEmbed>
        </div>
      </div>
    );
  }
}
