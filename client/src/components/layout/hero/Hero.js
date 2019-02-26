import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

export class Hero extends Component {
  render() {
    const {
      icon,
      backgroundImage,
      heading,
      subHeading,
      testimonials
    } = this.props;

    const bgImage = {
        backgroundImage: `url( ${backgroundImage} )`
    };

    const heroClasses = classNames({
      "section": true,
      "section--hero": true,
      "theme--dark": true,
      "section--testimonials": !_.isEmpty(testimonials)
    });

    return (
      <section className={heroClasses} style={bgImage}>

        <div className="section__inner">

          <div className="grid">

        		<div className="col__sm-12 col__md-8 col__lg-6">
        			<div className="content content--centered">

                <div className="content__body">

  								<div className="content__icon-img">
  									<img src={icon} alt="icon of item" />
  								</div>

                  <h1 className="heading1">{heading}</h1>

                  <p className="para2">{subHeading}</p>

                  <div className="content__btn content__btn--arrow">
                    <img src="http://edyakovich.com/test/wp/wp-content/themes/wp-test-1/assets/images/icon-arrow.png" alt="arrow icon" />
                  </div>

                </div>

        			</div>
        		</div>

        	</div>

          {!_.isEmpty(testimonials) &&
            <div className="grid section--hero__testimonial">

              {testimonials.map((item, index) => {
                return (
                  <div key={`testimonials-${index}`} className="col__sm-12 col__md-6">
                    <div className="content content--centered">

                      <div className="content__body">
                        <p className="para1"><em>{item.testimonial_text}</em></p>
                        <p className="para3"><span className="text-orange">{item.testimonial_source}</span></p>
                      </div>

              			</div>
                  </div>
                );
              })}

            </div>
          }

        </div>
      </section>
    );
  }
}

Hero.propTypes = {
  icon: PropTypes.string,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  backgroundImage: PropTypes.string,
  testimonials: PropTypes.array
};

export default Hero;
