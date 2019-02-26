import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Banner1 extends Component {
  render() {
    const {
      title,
      content
    } = this.props;

    return (
      <section className="section section--banner1">

        <div className="section__inner-wrap theme--blue">
          <div className="section__inner">

            <div className="grid">

              <div className="col__sm-12 col__md-8 col__lg-6">
                <div className="content content--centered">

                  <div className="content__body">

                    <h1 className="heading1">{title}</h1>

                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

        {content &&
          <div className="section__inner">

            <div className="grid">

          		<div className="col__sm-12 col__md-8 col__lg-7">
          			<div className="content">

                  <div
                    className="content__body"
                    dangerouslySetInnerHTML={{
                        __html: content
                    }}
                  />

          			</div>
          		</div>

          	</div>

          </div>
        }

      </section>
    );
  }
}

Banner1.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
};

export default Banner1;
