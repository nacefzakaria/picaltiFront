import React from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const FindCarForm = () => {
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input type="text" placeholder="Min speed" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="Max speed" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="Min price" required />
        </FormGroup>
        <FormGroup className="form__group">
          <input type="text" placeholder="Max price" required />
        </FormGroup>
       
        <FormGroup className="select__group">
          <select>
            <option value="ac">Hybrid</option>
            <option value="non-ac">Electrical</option>
            <option value="non-ac">Non Electrical</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <button className="btn find__car-btn">Find bike</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
