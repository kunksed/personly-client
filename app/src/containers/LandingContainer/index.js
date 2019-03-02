import React, { Component, } from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Hero from 'grommet/components/Hero';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Timestamp from 'grommet/components/Timestamp';
import Title from 'grommet/components/Title';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import Status from 'grommet/components/icons/Status';
import Columns from 'grommet/components/Columns';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { MainBox, FullSection } from './styles';
import { Navbar, AppFooter } from "components";
import { Divider, LoadingIndicator, LandingQuestionList } from 'components';
import axios from 'axios';
import styles from './index.module.scss';

class LandingContainer extends Component {
  constructor() {
    super();
    this.state = {
      questions: 0,
      getData: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    const axiosGitHubGraphQL = axios.create({
      baseURL: `${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`,
    });

    const MAIN_QUERY = `{ getQuestions(limit: 5) { id title created_on approved closes } }`;

    axiosGitHubGraphQL
      .post(`${process.env.NODE_ENV === 'development' ? 'https://jamesg-test.herokuapp.com/graphql' : `${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`}`, { query: MAIN_QUERY })
      .then(result => {
        this.setState({ questions: result.data.data.getQuestions });
      });

    const TRADES_QUERY = `{ getTrades { id trade_type shares price share_price created_at } }`;

    axiosGitHubGraphQL
      .post(`${process.env.NODE_ENV === 'development' ? process.env.API_URL : 'https://api.jamesg.app/graphql'}`, { query: TRADES_QUERY })
      .then(result => {
        this.setState({ trades: result.data.data.getTrades, getData: true, isLoading: false });
      })
      .catch(error => {
        this.setState({ trades: [], getData: true, isLoading: false });
      });
  }

  render() {
    if (!this.state.trades) {
      return <div />;
    }
    if (!this.state.questions) {
      return <div />;
    }

    (function(H) {
      H.seriesTypes.line.prototype.requireSorting = false;
    })(Highcharts)

    var data = this.state.trades.map(function(vote) {
      var date = Date.parse(vote.created_at);
      return [date, parseFloat(vote.share_price)];
    });

    const options = {
      rangeSelector: {
        selected: 1
      },
      series: [
        {
          data: data,
          type: 'area',
          name: 'JG',
          threshold: null,
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
    };

    return (
      <div>
        <Box className={styles.container}>
          <Box full="horizontal">
            <Hero
              justify="center"
              align="center"
              backgroundColorIndex="dark"
              background={
                <Image
                  fit="cover"
                  full={true}
                  src="https://images.unsplash.com/photo-1518600506278-4e8ef466b810?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=858391bd28bf4aadaa5b3e0750edb485&auto=format&fit=crop&w=1293&q=80"
                />
              }
            >
              <Box basis="1/2" align="center" justify="center" pad="medium">
                <Box
                  align="center"
                  justify="center"
                  pad="large"
                  colorIndex="grey-2-a"
                >
                  <Heading align="center" tag="h1">
                    Invest In My Future
                  </Heading>
                  <Heading align="center" tag="h2">
                    James Gallagher - Publicly Traded Person
                  </Heading>
                  <Button className={styles.registerButton} href="/register" label="Open Account" />
                </Box>
              </Box>
            </Hero>
            <Section align="center" justify="center">
              <Columns size="large" align="center" justify="center">
                <Box align="left" pad="medium" margin="small" pad="large">
                  <Heading tag="h2">Questions</Heading>
                  {this.state.questions.length === 0 && (
                    <Title align="center" tag="h4">
                      No questions have been posted yet.
                    </Title>
                  )}
                  {this.state.questions.length > 0 && (
                    <div>
                      {this.state.questions.map(question => {
                        return (
                          <Columns>
                            <Box>
                              <Timestamp value={question.created_on} fields="date" />
                              {question.approved && (
                                <div>
                                  {question.approved == true && (
                                    <Heading tag="h3">
                                      <Status value="ok" /> {question.title}
                                    </Heading>
                                  )}
                                  {question.approved == false && (
                                    <Heading tag="h3">
                                      <Status value="critical" /> {question.title}
                                    </Heading>
                                  )}
                                </div>
                              )}
                              {!question.approved && (
                                <div>
                                  <Heading tag="h3">
                                    <Status value="unknown" /> {question.title}
                                  </Heading>
                                </div>
                              )}
                              <Anchor href={`/questions/${question.id}`}>
                                Read more
                              </Anchor>
                            </Box>
                            <br />
                          </Columns>
                        );
                      })}
                    </div>
                  )}
                </Box>
                <Box align="center" pad="medium" margin="small" pad="large">
                  <Heading tag="h2">Stock Price</Heading>
                  {this.state.isLoading === false && (
                    <HighchartsReact
                      highcharts={Highcharts}
                      constructorType={'stockChart'}
                      options={options}
                    />
                  )}
                  {this.state.isLoading === false && ( <Title tag="h2">${data[0][1]}</Title>)}
                </Box>
              </Columns>
            </Section>
          </Box>
        </Box>
      </div>
    );
  }
}

export default LandingContainer;
