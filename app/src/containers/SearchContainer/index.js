import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";
import Status from "grommet/components/icons/Status";
import Heading from "grommet/components/Heading";
import Anchor from "grommet/components/Anchor";
import Title from "grommet/components/Title";
import Timestamp from "grommet/components/Timestamp";
import Paragraph from "grommet/components/Paragraph";
import Columns from "grommet/components/Columns";
import Footer from "grommet/components/Footer";
import Button from "grommet/components/Button";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import FormField from "grommet/components/FormField";
import Card from "grommet/components/Card";
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  RefinementList,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import axios from "axios";
import { reduxForm } from "redux-form";
import PropTypes from 'prop-types';
import { MainBox, FullSection } from "./styles";
import { Divider, LoadingIndicator } from "components";
import { Navbar, AppFooter } from "components";
import styles from "./index.module.scss";
import { connectHits } from 'react-instantsearch-dom';

class SearchContainer extends Component {
  render() {
    const searchClient = algoliasearch(
      '87LFC799NF',
      '8a9ac5e9296b0ad6d9e995835aff6a44'
    );

    const Hits = ({ hits }) => (
      <div>
        {hits.length > 0 && (
          <div>
            {hits.map(hit => (
              <Hit hit={hit} />
            ))}
          </div>
        )}
        {hits.length === 0 && (
          <div>
            <Heading tag="h4" strong={true} align="center" justify="center">
              No search results have been found.
            </Heading>
            <Footer pad={{ vertical: "medium" }} align="center" justify="center">
              <Button fill label="Go back" href="/" />
            </Footer>
          </div>
        )}
      </div>
    );

    const CustomHits = connectHits(Hits);

    return (
      <div>
        <Box className={styles.container}>
          <Section>
            <br />
            <Heading tag="h2" strong={true}>
              Search
            </Heading>
            <Heading tag="h3">
              Search for people who are currently raising money.
            </Heading>
            <InstantSearch align="center" justify="center" searchClient={searchClient} indexName="User">
              <Box align="center" justify="center">
                <SearchBox className={styles.searchBar} />
              </Box>
              <br />

              <Tiles flush={false} align="center" justify="center">
                <CustomHits align="center" justify="center"/>
              </Tiles>
          </InstantSearch>
          </Section>
        </Box>
      </div>
    );
  }
}

function Hit(hit) {
  return (
    <Tile
      className={styles.cardStyled}>
      <Card
        textSize="small"
        thumbnail={hit.hit.header_image_url}
        heading={hit.hit.name}
        description={`${hit.hit.listing_description.substring(0,149)}...`}
        link={<Anchor href={`/people/${hit.hit.user_id}`}
          label='Learn more' />}
      />
    </Tile>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default SearchContainer;
