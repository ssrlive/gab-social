import ImmutablePropTypes from 'react-immutable-proptypes'
import ImmutablePureComponent from 'react-immutable-pure-component'
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl'
import classNames from 'classnames/bind'
import {
  followAccount,
  unfollowAccount,
  blockAccount,
  unblockAccount,
} from '../actions/accounts'
import { openPopover, closePopover } from '../actions/popover'
import { initReport } from '../actions/reports'
import { openModal } from '../actions/modal'
import { unfollowModal } from '../initial_state'
import Avatar from './avatar'
import Image from './image'
import Text from './text'
import Button from './button'
import DisplayName from './display_name'
import TabBar from './tab_bar'

const cx = classNames.bind(_s)

const messages = defineMessages({
  followers: { id: 'account.followers', defaultMessage: 'Followers' },
  follows: { id: 'account.follows', defaultMessage: 'Follows' },
  profile: { id: 'account.profile', defaultMessage: 'Profile' },
})

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = (dispatch, { intl }) => ({

  openProfileOptionsPopover(props) {
    console.log("props:", props)
    dispatch(openPopover('PROFILE_OPTIONS', props))
  },

  onFollow (account) {
    if (account.getIn(['relationship', 'following']) || account.getIn(['relationship', 'requested'])) {
      if (unfollowModal) {
        dispatch(openModal('CONFIRM', {
          message: <FormattedMessage id='confirmations.unfollow.message' defaultMessage='Are you sure you want to unfollow {name}?' values={{ name: <strong>@{account.get('acct')}</strong> }} />,
          confirm: intl.formatMessage(messages.unfollowConfirm),
          onConfirm: () => dispatch(unfollowAccount(account.get('id'))),
        }));
      } else {
        dispatch(unfollowAccount(account.get('id')));
      }
    } else {
      dispatch(followAccount(account.get('id')));
    }
  },

  onBlock (account) {
    if (account.getIn(['relationship', 'blocking'])) {
      dispatch(unblockAccount(account.get('id')));
    } else {
      dispatch(openModal('CONFIRM', {
        message: <FormattedMessage id='confirmations.block.message' defaultMessage='Are you sure you want to block {name}?' values={{ name: <strong>@{account.get('acct')}</strong> }} />,
        confirm: intl.formatMessage(messages.blockConfirm),
        onConfirm: () => dispatch(blockAccount(account.get('id'))),
        secondary: intl.formatMessage(messages.blockAndReport),
        onSecondary: () => {
          dispatch(blockAccount(account.get('id')));
          dispatch(initReport(account));
        },
      }));
    }
  },

  onRepostToggle (account) {
    if (account.getIn(['relationship', 'showing_reblogs'])) {
      dispatch(followAccount(account.get('id'), false));
    } else {
      dispatch(followAccount(account.get('id'), true));
    }
  },

});

export default
@connect(mapStateToProps, mapDispatchToProps)
@injectIntl
class ProfileHeader extends ImmutablePureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map,
    intl: PropTypes.object.isRequired,
    onFollow: PropTypes.func.isRequired,
    onBlock: PropTypes.func.isRequired,
    openProfileOptionsPopover: PropTypes.func.isRequired,
  }

  handleOpenMore = () => {
    const { openProfileOptionsPopover, account } = this.props
    openProfileOptionsPopover({
      targetRef: this.openMoreNode,
      position: 'top',
      account: this.props.account,
    })
  }

  handleStartChat = () => {

  }

  handleFollow = () => {

  }

  makeInfo() {
    const { account, intl } = this.props;

    let info = [];

    if (!account || !me) return info;

    if (me !== account.get('id') && account.getIn(['relationship', 'followed_by'])) {
      info.push(<span key='followed_by' className='relationship-tag'>{intl.formatMessage(messages.accountFollowsYou)}</span>);
    } else if (me !== account.get('id') && account.getIn(['relationship', 'blocking'])) {
      info.push(<span key='blocked' className='relationship-tag'>{intl.formatMessage(messages.accountBlocked)}</span>);
    }

    if (me !== account.get('id') && account.getIn(['relationship', 'muting'])) {
      info.push(<span key='muted' className='relationship-tag'>{intl.formatMessage(messages.accountMuted)}</span>);
    } else if (me !== account.get('id') && account.getIn(['relationship', 'domain_blocking'])) {
      info.push(<span key='domain_blocked' className='relationship-tag'>{intl.formatMessage(messages.domainBlocked)}</span>);
    }

    return info;
  };

  getActionBtn() {
    const { account, intl } = this.props;

    let actionBtn = null;

    if (!account || !me) return actionBtn;

    if (me !== account.get('id')) {
      if (!account.get('relationship')) { // Wait until the relationship is loaded
        //
      } else if (account.getIn(['relationship', 'requested'])) {
        actionBtn = <Button className='logo-button' text={intl.formatMessage(messages.requested)} onClick={this.props.onFollow} />;
      } else if (!account.getIn(['relationship', 'blocking'])) {
        actionBtn = <Button disabled={account.getIn(['relationship', 'blocked_by'])} className={classNames('logo-button', { 'button--destructive': account.getIn(['relationship', 'following']) })} text={intl.formatMessage(account.getIn(['relationship', 'following']) ? messages.unfollow : messages.follow)} onClick={this.props.onFollow} />;
      } else if (account.getIn(['relationship', 'blocking'])) {
        actionBtn = <Button className='logo-button' text={intl.formatMessage(messages.unblock, { name: account.get('username') })} onClick={this.props.onBlock} />;
      }
    }

    return actionBtn
  }

  setOpenMoreNodeRef = (n) => {
    this.openMoreNode = n
  }

  render() {
    const { account, intl } = this.props

    const tabs = !account ? null : [
      {
        to: `/${account.get('acct')}`,
        title: 'Timeline',
      },
      {
        to: `/${account.get('acct')}/comments`,
        title: 'Comments',
      },
      {
        to: `/${account.get('acct')}/media`,
        title: 'Media',
      },
      {
        to: '',
        title: 'More',
      },
    ]

    const headerSrc = !!account ? account.get('header') : ''
    const headerMissing = headerSrc.indexOf('/headers/original/missing.png') > -1 || !headerSrc

    const avatarContainerClasses = cx({
      circle: 1,
      marginTopNeg75PX: !headerMissing,
      borderColorWhite: 1,
      border2PX: 1,
    })

    const avatarSize = headerMissing ? '75' : '150'

    return (
      <div className={[_s.default, _s.z1, _s.width100PC].join(' ')}>

        {
          !headerMissing &&
          <div className={[_s.default, _s.height350PX, _s.width100PC, _s.radiusSmall, _s.overflowHidden].join(' ')}>
            <Image
              className={_s.height350PX}
              src={headerSrc}
            />
          </div>
        }

        <div className={[_s.default, _s.borderBottom1PX, _s.borderColorSecondary, _s.width100PC].join(' ')}>

          <div className={[_s.default, _s.flexRow, _s.px15].join(' ')}>
            <div className={avatarContainerClasses}>
              <Avatar size={avatarSize} account={account} />
            </div>

            <div className={[_s.default, _s.px15, _s.py10].join(' ')}>
              <DisplayName account={account} multiline large />
            </div>
          </div>

          <div className={[_s.default, _s.flexRow, _s.borderBottom1PX, _s.borderColorSecondary, _s.mt5, _s.height53PX].join(' ')}>
            <div className={[_s.default].join(' ')}>
              <TabBar tabs={tabs} large />
            </div>

            <div className={[_s.default, _s.flexRow, _s.marginLeftAuto, _s.py5].join(' ')}>
              <div ref={this.setOpenMoreNodeRef}>
                <Button
                  outline
                  icon='ellipsis'
                  iconWidth='18px'
                  iconHeight='18px'
                  iconColor='brand'
                  iconColorHover='white'
                  color='brand'
                  backgroundColor='none'
                  className={[_s.justifyContentCenter, _s.alignItemsCenter, _s.mr10, _s.px10].join(' ')}
                  onClick={this.handleOpenMore}
                />
              </div>

              <Button
                outline
                icon='chat'
                iconWidth='18px'
                iconHeight='18px'
                iconColor='brand'
                iconColorHover='white'
                color='brand'
                backgroundColor='none'
                className={[_s.justifyContentCenter, _s.alignItemsCenter, _s.mr10, _s.px10].join(' ')}
                onClick={this.handleStartChat}
              />

              <Button
                className={[_s.justifyContentCenter, _s.alignItemsCenter].join(' ')}
                onClick={this.handleFollow}
              >
                <span className={[_s.px15].join(' ')}>
                  <Text
                    color='white'
                    weight='bold'
                    size='medium'
                    className={[_s.px15].join(' ')}
                  >
                    Follow
                  </Text>
                </span>
              </Button>

            </div>
          </div>
        </div>
      </div>
    )
  }

}
