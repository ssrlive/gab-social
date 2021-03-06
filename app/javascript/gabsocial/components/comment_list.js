import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import ImmutablePureComponent from 'react-immutable-pure-component'
import Button from './button'
import Comment from './comment'
import ScrollableList from './scrollable_list'
import Text from './text'
import Dummy from './dummy'

class CommentList extends ImmutablePureComponent {

  render() {
    const {
      descendants,
      commentsLimited,
      onViewComments,
      ancestorAccountId
    } = this.props

    const size = descendants.size
    const upperLimit = commentsLimited ? 6 : size
    const max = Math.min(commentsLimited ? 2 : upperLimit, size)

    const Wrapper = !commentsLimited ? ScrollableList : Dummy

    return (
      <React.Fragment>
        <Wrapper scrollKey='comments'>
          {
            descendants.slice(0, max).map((descendant, i) => (
              <Comment
                key={`comment-${descendant.get('statusId')}-${i}`}
                id={descendant.get('statusId')}
                ancestorAccountId={ancestorAccountId}
                indent={descendant.get('indent')}
                isHighlighted={descendant.get('isHighlighted')}
              />
            ))
          }
        </Wrapper>
        {
          size > 0 && size > max && commentsLimited &&
          <div className={[_s.d, _s.flexRow, _s.px15, _s.pb5, _s.mb10, _s.aiCenter].join(' ')}>
            <Button
              isText
              backgroundColor='none'
              color='tertiary'
              onClick={onViewComments}
            >
              <Text weight='bold' color='inherit'>
                View more comments
              </Text>
            </Button>
            <div className={[_s.d, _s.mlAuto].join(' ')}>
              <Text color='tertiary'>
                {max}
                &nbsp;of&nbsp;
                {size}
              </Text>
            </div>
          </div>
        }
      </React.Fragment>
    )
  }

}

CommentList.propTypes = {
  commentsLimited: PropTypes.bool,
  descendants: ImmutablePropTypes.list,
  onViewComments: PropTypes.func.isRequired,
  ancestorAccountId: PropTypes.string.isRequired,
}

export default CommentList