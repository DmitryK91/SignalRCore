import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Logout } from "../User/userActions";
import './NavMenu.css';

class NavMenu extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light >
                    <Container>
                        <NavbarBrand tag={Link} to="/">SignalRCore</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink className="text-dark" onClick={() => this.props.onLogout()}>{this.props.userInfo.userName}</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(Logout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavMenu);