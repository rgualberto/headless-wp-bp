import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UseCase from "./UseCase.js";

export class UseCases extends Component {
  render() {
    const {
      useCases
    } = this.props;

    return (
      <div className="use-cases" id="use-cases">
        {useCases.map((item, index) => {
          return (
            <UseCase
              key={`use-cases-${index}`}
              title={item.use_case_section_title}
              heading={item.use_case_heading}
              image={item.use_case_image.url}
              list={item.use_case_list}
              subImage={item.use_case_sub_image.url}
            />
          );
        })}
      </div>
    );
  }
}

UseCases.propTypes = {
  useCases: PropTypes.array
};

export default UseCases;
