import Button from 'react-bootstrap/Button';
import React  from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { Bell, Search } from 'react-bootstrap-icons';
import profile from '../../images/user.jpg';
function AdminHeader() {
    return (
        <div className='container content_top_container'>
            <div className='row content_top_row '>
                <div className="search_bar left_side col-md-6">
                    <InputGroup className="">
                        <Form.Control
                            placeholder="Seach"
                            aria-label="Seach"
                            aria-describedby="basic-addon2"
                            variant="outline-success"
                        />
                        <Button variant="outline-success" id="button-addon2">
                            <Search />
                        </Button>
                    </InputGroup>
                </div>
                <div className="search_bar right_side col-md-6">
                    <Dropdown className='notification_div'>
                        <Dropdown.Toggle className='btn-lg btn' variant="outline-success" id="dropdown-basic">
                            <Bell />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='profile_div'>
                        <Dropdown.Toggle className='btn-lg btn' variant="outline-success" id="dropdown-basic">
                            <img src={profile} className="profile" alt="Apna Organic Store" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default AdminHeader;
