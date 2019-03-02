import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Hero from 'grommet/components/Hero';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Anchor from 'grommet/components/Anchor';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Columns from 'grommet/components/Columns';
import RCPagination from 'rc-pagination';
import { MainBox, FullSection } from "./styles";
import { Divider, LoadingIndicator } from "components";
import { Navbar, AppFooter } from "components";
import axios from 'axios';
import styles from './index.module.scss';

class UserContainer extends Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      getData: false,
      currentPage: 1,
      length: 0,
      isLoading: true
    };
  }

  setNewPage(newPage) {
    this.setState({ currentPage: newPage });
  }

  render() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQL = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? 'https://jamesg.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`,
      });

      const MAIN_QUERY = `{ getUsers(limit: 100) { id name shares balance work_badge friend_badge } }`;

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://jamesg.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, { query: MAIN_QUERY })
        .then(result => {
          this.setState({
            users: result.data.data.getUsers,
            total: result.data.data.getUsers.length,
            getData: true,
            isLoading: false
          });
        })
        .catch(error => {
          this.setState({ users: [], length: 0, getData: true, isLoading: false });
        });
    }


    if (this.state.isLoading === true) {
      return (
        <div />
      );
    }

    return (
      <div>
        <Navbar pathname={this.props.props.pathname} />
      <Box className={styles.container}>
        <Box full="horizontal">
          <Hero
            justify="center"
            align="center"
            size="small"
            backgroundColorIndex="dark"
            background={
              <Image
                fit="cover"
                full={true}
                className={styles.heroImage}
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2fc341e1e6a4ae6a405bb98e5947559f&auto=format&fit=crop&w=634&q=80"
              />
            }
          >
            <Box align="center" justify="center">
              <Heading align="center" tag="h1">
                Shareholders
              </Heading>
            </Box>
          </Hero>
          <Section align="center" justify="center">
            <Columns size="large" align="center" justify="center">
              <Box align="left" pad="medium" margin="small" pad="large">
                {this.state.users && (
                  <div>
                    <Table>
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Shares</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.map(user => {
                          return (
                            <TableRow>
                              <td>
                                <Anchor
                                  href={`/profile/${user.id}`}
                                  label={`${user.name} ${user.work_badge == true ? '💼' : '' } ${user.friend_badge == true ? '🙌' : '' }`}
                                />
                              </td>
                              <td>{user.shares}</td>
                              <td>${parseFloat(user.balance).toFixed(2)}</td>
                            </TableRow>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Box>
            </Columns>
            <Footer align="center" justify="center" pad="medium">
              <RCPagination
                style={{ color: 'white' }}
                onChange={newPage => this.setNewPage(newPage)}
                defaultCurrent={1}
                pageSize={25}
                current={this.state.currentPage}
                total={this.state.total}
              />
            </Footer>
          </Section>
        </Box>
      </Box>
      <AppFooter />
    </div>
    );
  }
}

export default UserContainer;
