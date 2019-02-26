import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Hero from "./Hero.js";

export class Heros extends Component {
  render() {
    const {
      heros
    } = this.props;

    return (
      <div className="heros" id="heros">
        {heros.map((item, index) => {
          return (
            <Hero
              key={`heros-${index}`}
              icon={item.hero_icon.url}
              heading={item.hero_heading}
              subHeading={item.hero_text}
              backgroundImage={item.hero_background_image.url}
              testimonials={item.testimonials}
            />
          );
        })}
      </div>
    );
  }
}

Heros.propTypes = {
  heros: PropTypes.array
};

export default Heros;
