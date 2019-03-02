import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import styles from './index.module.scss';
import regeneratorRuntime from 'regenerator-runtime';
import { FullSection, MainContent, MainBox } from './styles';
import { Navbar, AppFooter } from "components";
import { Divider, LoadingIndicator } from 'components';

class AdminGenderContainer extends Component {
  constructor() {
    super();
    this.state = {
      updateQuestionToast: false,
      load_default: false,
      getData: false,
      question: '',
    };
  }

  componentDidMount() {
    if (this.state.getData === false) {
      const axiosGitHubGraphQLAuth = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      const USER_QUERY = `{ getCurrentUser { id name role email } }`;

      axiosGitHubGraphQLAuth
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, {
          query: USER_QUERY,
        })
        .then(result => {
          this.setState({
            currentUser: result.data.data.getCurrentUser[0],
          });
        });

      var axiosGitHubGraphQL = axios.create({
        baseURL: `${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`,
      });

      const MAIN_QUERY = `{ getUsers { id gender } }`;

      axiosGitHubGraphQL
        .post(`${process.env.NODE_ENV === 'development' ? 'https://personly-api.herokuapp.com/graphql' : 'https://api.jamesg.app/graphql'}`, {
          query: MAIN_QUERY,
        })
        .then(result => {
          this.setState({
            users: result.data.data.getUsers,
            getData: true,
          });
        });
    }
  }

  render() {
    if (!this.state.currentUser) {
      return (
        <div />
      );
    }

    if (!this.state.users) {
      return (
        <div />
      );
    }

    if (this.state.currentUser === 'None') {
      window.location.replace('/login');
    }
    if (this.state.currentUser.role !== 'Admin') {
      window.location.replace('/login');
    }

    var user_genders = [];
    var user_genders_result = {};

    for (var item, i = 0; (item = this.state.users[i++]); ) {
      var name = item.gender;

      if (name === '') {
        var name = 'None';
      }

      if (!(name in user_genders)) {
        user_genders_result[name] = 1;
      } else {
        user_genders_result[name] = user_genders_result[name] + 1
      }
    }


    for (var item, i = 0; (item = Object.keys(user_genders_result)[i++]);) {
      console.log(item)
      user_genders.push({ name: item, value: user_genders_result[item] })
    }

    console.log(user_genders)

    var data = user_genders.map(gender => {
      return { name: gender.name, y: gender.value };
    });

    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      title: 'Gender Distribution',
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          name: 'Genders',
          colorByPoint: true,
          data: data,
        },
      ],
    };

    return (
      <div>
        <Navbar pathname={this.props.props.pathname} />
      <div>
        <MainBox
          alignContent="center"
          fill="horizontal"
          align="center"
          className={styles.container}
        >
          <FullSection primary direction="row">
            <MainContent
              align="center"
              justify="start"
              pad={{ vertical: 'large' }}
            >
              <Heading tag="h2">Gender Information</Heading>
              <HighchartsReact highcharts={Highcharts} options={options} />
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Stats</th>
                  </tr>
                </thead>
                <tbody>
                  {user_genders.map(gender => {
                    return (
                      <TableRow>
                        <td>{gender.name}</td>
                        <td>{gender.value}</td>
                      </TableRow>
                    );
                  })}
                </tbody>
              </Table>
            </MainContent>
          </FullSection>
        </MainBox>
      </div>
      <AppFooter />
    </div>
    );
  }
}

export default AdminGenderContainer;
