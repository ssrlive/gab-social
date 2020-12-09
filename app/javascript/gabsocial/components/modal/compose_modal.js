import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl'
import ImmutablePureComponent from 'react-immutable-pure-component'
import { openModal } from '../../actions/modal'
import { cancelReplyCompose } from '../../actions/compose'
import TimelineComposeBlock from '../timeline_compose_block'
import Block from '../block'
import Heading from '../heading'
import Text from '../text'
import Button from '../button'

class ComposeModal extends ImmutablePureComponent {

  onClickClose = () => {
    const {
      composeText,
      dispatch,
      onClose,
      intl,
    } = this.props

    if (composeText) {
      dispatch(openModal('CONFIRM', {
        title: <FormattedMessage id='discard-gab-title' defaultMessage='Discard gab?' />,
        message: <FormattedMessage id='discard-gab-message' defaultMessage="This can't be undone and you'll lose your draft." />,
        confirm: intl.formatMessage(messages.confirm),
        onConfirm: () => dispatch(cancelReplyCompose()),
        onCancel: () => dispatch(openModal('COMPOSE')),
      }))
    }
    else {
      onClose('COMPOSE')
    }
  }

  onHandleSubmit = () => {
    
  }

  render() {
    const {
      intl,
      isEditing,
      isComment,
    } = this.props

    const title = isEditing ? messages.edit : isComment ? messages.comment : messages.title

    return (
      <div style={{width: '512px'}} className={[_s.d, _s.modal].join(' ')}>
        <Block>
          <div className={[_s.d, _s.flexRow, _s.aiCenter, _s.jcCenter, _s.borderBottom1PX, _s.borderColorSecondary, _s.h53PX, _s.px15].join(' ')}>
            <Button
              backgroundColor='none'
              title={intl.formatMessage(messages.close)}
              onClick={this.onClickClose}
              color='secondary'
              icon='close'
              iconSize='10px'
            />
            <Heading size='h2'>
              {intl.formatMessage(title)}
            </Heading>
            <Button
              backgroundColor='none'
              title={intl.formatMessage(messages.close)}
              className={_s.mlAuto}
              onClick={this.onHandleSubmit}
              color='secondary'
            >
              <Text>Post</Text>
            </Button>
          </div>
          <div className={[_s.d].join(' ')}>
            <TimelineComposeBlock isModal />
          </div>
        </Block>
      </div>
    )
  }
}

const messages = defineMessages({
  confirm: { id: 'confirmations.delete.confirm', defaultMessage: 'Delete' },
  title: { id: 'navigation_bar.compose', defaultMessage: 'Compose new gab' },
  comment: { id: 'navigation_bar.compose_comment', defaultMessage: 'Compose new comment' },
  edit: { id: 'navigation_bar.edit_gab', defaultMessage: 'Edit' },
  close: { id: 'lightbox.close', defaultMessage: 'Close' },
})

const mapStateToProps = (state) => {
  const status = state.getIn(['statuses', state.getIn(['compose', 'id'])])

  return {
    composeText: state.getIn(['compose', 'text']),
    isEditing: !!status,
    isComment: !!state.getIn(['compose', 'in_reply_to']),
  }
}

ComposeModal.propTypes = {
  intl: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  composeText: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  isComment: PropTypes.bool,
}

export default injectIntl(connect(mapStateToProps)(ComposeModal))