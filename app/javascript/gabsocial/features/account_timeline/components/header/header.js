import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import InnerHeader from '../inner_header';
import MovedNote from '../moved_note';

export default class Header extends ImmutablePureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map,
    identity_proofs: ImmutablePropTypes.list,
    onFollow: PropTypes.func.isRequired,
    onBlock: PropTypes.func.isRequired,
    onMention: PropTypes.func.isRequired,
    onDirect: PropTypes.func.isRequired,
    onRepostToggle: PropTypes.func.isRequired,
    onReport: PropTypes.func.isRequired,
    onMute: PropTypes.func.isRequired,
    onBlockDomain: PropTypes.func.isRequired,
    onUnblockDomain: PropTypes.func.isRequired,
    onEndorseToggle: PropTypes.func.isRequired,
    onAddToList: PropTypes.func.isRequired,
    domain: PropTypes.string.isRequired,
    username: PropTypes.string,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  handleFollow = () => {
    this.props.onFollow(this.props.account);
  }

  handleBlock = () => {
    this.props.onBlock(this.props.account);
  }

  handleMention = () => {
    this.props.onMention(this.props.account, this.context.router.history);
  }

  handleDirect = () => {
    this.props.onDirect(this.props.account, this.context.router.history);
  }

  handleReport = () => {
    this.props.onReport(this.props.account);
  }

  handleRepostToggle = () => {
    this.props.onRepostToggle(this.props.account);
  }

  handleMute = () => {
    this.props.onMute(this.props.account);
  }

  handleBlockDomain = () => {
    const domain = this.props.account.get('acct').split('@')[1];

    if (!domain) return;

    this.props.onBlockDomain(domain);
  }

  handleUnblockDomain = () => {
    const domain = this.props.account.get('acct').split('@')[1];

    if (!domain) return;

    this.props.onUnblockDomain(domain);
  }

  handleEndorseToggle = () => {
    this.props.onEndorseToggle(this.props.account);
  }

  handleAddToList = () => {
    this.props.onAddToList(this.props.account);
  }

  render () {
    const { account, identity_proofs } = this.props;
    const moved = (account) ? account.get('moved') : false;

    return (
      <div className='account-timeline__header'>
        { moved && <MovedNote from={account} to={account.get('moved')} /> }

        <InnerHeader
          account={account}
          identity_proofs={identity_proofs}
          onFollow={this.handleFollow}
          onBlock={this.handleBlock}
          onMention={this.handleMention}
          onDirect={this.handleDirect}
          onRepostToggle={this.handleRepostToggle}
          onReport={this.handleReport}
          onMute={this.handleMute}
          onBlockDomain={this.handleBlockDomain}
          onUnblockDomain={this.handleUnblockDomain}
          onEndorseToggle={this.handleEndorseToggle}
          onAddToList={this.handleAddToList}
          domain={this.props.domain}
          username={this.props.username}
        />
      </div>
    );
  }

}