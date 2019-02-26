import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class UseCase extends Component {
  render() {
    const {
      title,
      image,
      heading,
      subImage,
      list
    } = this.props;

    return (
      <section className="section ">
        <div className="section__inner">

          {title &&
            <div className="grid">

            		<div className="col__sm-12 col__md-9 col__lg-7">
            			<div className="content content--head content--centered">

                    <div className="content__body">
                      <h3 className="heading3">{title}</h3>
                    </div>

            			</div>
            		</div>

            	</div>
          }

          <div className="grid">

        		<div className="col__sm-12 col__md-6">

              <div className="content__main-img">
								<img src={image} alt="" />
              </div>

        		</div>

            <div className="col__sm-12 col__md-6 grid">
        			<div className="content grid">

                <div className="content__body">
                  <h3 className="heading3">{heading}</h3>

									<ul>
                    {list &&
                      list.map((item, index) => {
                        return (
                          <li className="para1" key={`use-case-${index}`}>{item.use_case_list_item}</li>
                        );
                      })
                    }
									</ul>

                  <div className="content__icon-group">
                    <img src={subImage} alt="" />
                  </div>

                </div>

        			</div>
        		</div>

        	</div>

        </div>
      </section>
    );
  }
}

UseCase.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  heading: PropTypes.string,
  list: PropTypes.array,
  subImage: PropTypes.string
};

export default UseCase;
