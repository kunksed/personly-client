import React from 'react';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import DashboardIcon from 'grommet/components/icons/base/Dashboard';
import ToolsIcon from 'grommet/components/icons/base/Tools';
import LicenseIcon from 'grommet/components/icons/base/License';
import Menu from 'grommet/components/Menu';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import BriefcaseIcon from 'grommet/components/icons/base/Briefcase';
import ArchiveIcon from 'grommet/components/icons/base/Archive';
import AtmIcon from 'grommet/components/icons/base/Atm';
import ArticleIcon from 'grommet/components/icons/base/Article';
import CircleQuestionIcon from 'grommet/components/icons/base/CircleQuestion';
import UserExpertIcon from 'grommet/components/icons/base/UserExpert';
import BookIcon from 'grommet/components/icons/base/Book';
import { ThumbnailImage, Wrapper } from './styles';
import cssModules from 'react-css-modules';
import styles from './index.module.scss'

class SettingsSidebar extends React.Component {
  render() {
    return (
      <Box
        basis="1/4"
        pad={{ vertical: 'large', horizontal: 'small' }}
        align="center"
        className={styles.aside}>
        <div>
          <div className={styles.avatarWrapper}>
            <Wrapper imageSize={200}>
              <ThumbnailImage src={this.props.currentUser.profile_picture} />
            </Wrapper>
          </div>
          <Box
            className={styles.careerResourcesBlurb}
            align="center"
            pad={{ horizontal: 'small', vertical: 'small' }}>
            <Heading tag="h3" align="center">
              {`Hello, ${this.props.currentUser.name}!`}
            </Heading>
          </Box>
          <Box
            className={styles.careerResourcesBlurb}
            basis="2/3"
            align="center"
            pad={{ horizontal: 'small', vertical: 'small' }}>
            <Button
              className={styles.button}
              label="Account"
              onClick={e => e}
              plain
              path="/settings"
              icon={<ToolsIcon />}
            />
            {this.props.currentUser.is_public === true && (
              <Button
                className={styles.button}
                label="Dashboard"
                onClick={e => e}
                plain
                path="/dashboard"
                icon={<DashboardIcon />}
              />
            )}
            {this.props.currentUser.is_public === true && (
              <Button
                className={styles.button}
                label="Relations"
                onClick={e => e}
                plain
                path="/dashboard/relations"
                icon={<UserExpertIcon />}
              />
            )}
            <Button
              className={styles.button}
              label="Investments"
              onClick={e => e}
              plain
              path="/settings/investments"
              icon={<ArchiveIcon />}
            />
            <Button
              className={styles.button}
              label="Deposit"
              onClick={e => e}
              plain
              path="/settings/deposit"
              icon={<AtmIcon />}
            />
            {this.props.currentUser.is_public === true && (
              <Button
                className={styles.button}
                label="Shareholders"
                onClick={e => e}
                plain
                path="/dashboard/shareholders"
                icon={<BriefcaseIcon />}
              />
            )}
            {this.props.currentUser.is_public === true && (
              <Button
                className={styles.button}
                label="Leaderboard"
                onClick={e => e}
                plain
                path="/dashboard/leaderboard"
                icon={<LicenseIcon />}
              />
            )}
            {this.props.currentUser.is_public === true && (
              <Button
                className={styles.button}
                label="Update Listing"
                onClick={e => e}
                plain
                path="/dashboard/listing"
                icon={<BookIcon />}
              />
            )}
          </Box>
        </div>
      </Box>
    );
  }
}


export default SettingsSidebar;
