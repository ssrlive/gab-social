import { injectIntl, defineMessages } from 'react-intl'
import { makeGetAccount } from '../../selectors'
import { closeModal } from '../../actions/modal'
import { muteAccount } from '../../actions/accounts'
import ConfirmationModal from './confirmation_modal'

const messages = defineMessages({
  title: { id: 'mute_title', defaultMessage: 'Mute {name}' },
  muteMessage: { id: 'confirmations.mute.message', defaultMessage: 'Are you sure you want to mute {name}?' },
  mute: { id: 'confirmations.mute.confirm', defaultMessage: 'Mute' },
})

const mapStateToProps = (state, { accountId }) => {
  const getAccount = makeGetAccount()

  return {
    account: getAccount(state, accountId),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onConfirm(account, notifications) {
      dispatch(closeModal())
      dispatch(muteAccount(account.get('id'), notifications))
    },
    onClose() {
      dispatch(closeModal())
    },
  }
}

export default
@connect(mapStateToProps, mapDispatchToProps)
@injectIntl
class MuteModal extends PureComponent {

  static propTypes = {
    account: PropTypes.object.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  }

  handleClick = () => {
    this.props.onConfirm(this.props.account)
  }

  handleClose = () => {
    this.props.onClose()
  }

  render() {
    const { account, intl } = this.props

    const title = intl.formatMessage(messages.title, {
      name: !!account ? account.get('acct') : '',
    })
    const message = intl.formatMessage(messages.muteMessage, {
      name: !!account ? account.get('acct') : '',
    })

    return (
      <ConfirmationModal
        title={title}
        message={message}
        confirm={intl.formatMessage(messages.mute)}
        onClose={this.handleClose}
        onConfirm={this.handleClick}
      />
    )
  }

}