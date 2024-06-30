import axios from 'axios';
import React, { useState } from 'react';
import { Button, Offcanvas, Form, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap';

const Test = () => {
    const [show, setShow] = useState(false);
    const [segmentName, setSegmentName] = useState('');
    const [schemas, setSchemas] = useState([]);
    const [loader, setLoader] = useState(false);
    const [availableSchemas, setAvailableSchemas] = useState([
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ]);

    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const handleShow = () => setShow(true);

    const handleAddSchema = (schemaValue) => {
        const schema = availableSchemas.find(s => s.value === schemaValue);
        if (schema) {
            setSchemas([...schemas, schema]);
            const filter = availableSchemas.filter(s => s.value !== schemaValue);
            setAvailableSchemas(filter);
        }
    };

    const handleRemoveSchema = (index) => {
        const removedSchema = schemas[index];
        setSchemas(schemas.filter((_, i) => i !== index));
        setAvailableSchemas([...availableSchemas, removedSchema]);
    };

    const handleSaveSegment = async () => {
        // Validation: Ensure Segment Name and at least one schema is selected
        if (!segmentName) {
            alert('Please enter a name for the segment.');
            return;
        }

        if (schemas.length === 0) {
            alert('Please select at least one schema to save the segment.');
            return;
        }

        const segmentData = {
            segment_name: segmentName,
            schema: schemas.map(schema => ({ [schema.value]: schema.label }))
        };

        try {
            setLoader(true);
            const response = await axios.post('https://668109c956c2c76b495d5169.mockapi.io/api/data/schemas', segmentData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Handle success
            setLoader(false);
            console.log('API call successful:', response.data);
            alert('Segment saved successfully!');

            // Reset form and close modal
            handleClose();
        } catch (error) {
            // Handle error
            console.error('Error calling API:', error);
            alert('Failed to save segment. Please try again.');
        }
    };

    const resetForm = () => {
        setSegmentName('');
        setSchemas([]);
        setAvailableSchemas([
            { label: 'First Name', value: 'first_name' },
            { label: 'Last Name', value: 'last_name' },
            { label: 'Gender', value: 'gender' },
            { label: 'Age', value: 'age' },
            { label: 'Account Name', value: 'account_name' },
            { label: 'City', value: 'city' },
            { label: 'State', value: 'state' },
        ]);
    };

    return (
        <>
            {loader && <div className='loader'></div>}
            <Button variant="primary" onClick={handleShow}>
                Save segment
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Saving Segment</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        <Form.Group controlId="formSegmentName">
                            <Form.Label>Enter the Name of the Segment</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name of the segment"
                                value={segmentName}
                                onChange={(e) => setSegmentName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <p>To save your segment, you need to add the schemas to build the query</p>
                        <Row className="mb-3">
                            <Col><span className="dot bg-success"></span> User Traits</Col>
                            <Col><span className="dot bg-danger"></span> Group Traits</Col>
                        </Row>
                        <div className="border border-primary p-3 mb-3">
                            {schemas.map((schema, index) => (
                                <Row key={index} className="mb-2">
                                    <Col>
                                        <Form.Control readOnly value={schema.label} />
                                    </Col>
                                    <Col xs="auto">
                                        <Button variant="outline-danger" onClick={() => handleRemoveSchema(index)}>-</Button>
                                    </Col>
                                </Row>
                            ))}
                            <Row>
                                <Col>
                                    <DropdownButton
                                        title="Add schema to segment"
                                        onSelect={handleAddSchema}
                                    >
                                        {availableSchemas.map(schema => (
                                            <Dropdown.Item key={schema.value} eventKey={schema.value}>
                                                {schema.label}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </Col>
                            </Row>
                        </div>

                        <div className="position-absolute bottom-0 w-100 d-flex justify-content-end p-3 gap-3 bg-light start-0">
                            <Button variant="danger" onClick={handleClose}>Cancel</Button>
                            <Button variant="success" onClick={handleSaveSegment}>Save the Segment</Button>
                        </div>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Test;
