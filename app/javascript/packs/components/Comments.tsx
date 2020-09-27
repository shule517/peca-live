import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { CommentInterface } from '../types/Comment'
import styled from 'styled-components'
import Channel from '../types/Channel'

type Props = {
  commentId: string
  channel: Channel
  comments: CommentInterface[]
}

const Comments = (props: Props) => {
  const { commentId, channel, comments } = props

  return (
    <StyledDiv id={commentId}>
      {!comments && (
        <div style={{ margin: '15px', color: 'rgba(0, 0, 0, 0.5)' }}>
          <CircularProgress size={30} style={{ color: 'lightgray' }} />
        </div>
      )}

      {comments && comments.length == 0 && (
        // threads &&
        // threads.length === 0 &&
        <div style={{ margin: '10px', color: 'rgba(0, 0, 0, 0.5)' }}>対応していないURLです</div>
      )}

      {/*{comments && comments.length === 0 && threads && (*/}
      {/*  <>*/}
      {/*    <div style={{ margin: '15px', color: 'rgba(0, 0, 0, 0.5)' }}>*/}
      {/*      スレッドを選択してください*/}
      {/*    </div>*/}

      {/*    {threads.map((thread) => {*/}
      {/*      return (*/}
      {/*        <div*/}
      {/*          key={`${channel.streamId}-threads-${thread.no}`}*/}
      {/*          style={{ display: 'flex', margin: '10px 15px' }}*/}
      {/*        >*/}
      {/*          <div*/}
      {/*            style={{*/}
      {/*              // width: '50px',*/}
      {/*              color: 'rgb(0, 128, 0)',*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            {`${thread.no} - ${thread.title}(${thread.comments_size})`}*/}
      {/*          </div>*/}
      {/*          /!*<div style={{ width: '100%', wordBreak: 'break-all' }}></div>*!/*/}
      {/*        </div>*/}
      {/*      )*/}
      {/*    })}*/}
      {/*  </>*/}
      {/*)}*/}

      {comments &&
        comments.map((comment) => {
          return (
            <div key={`${channel.streamId}-comments-${comment['no']}`} style={{ display: 'flex', margin: '10px 15px' }}>
              <div
                style={{
                  width: '50px',
                  color: 'rgb(0, 128, 0)',
                }}
              >
                {comment['no']}
              </div>
              <div style={{ width: '100%', wordBreak: 'break-all' }}>
                {comment['body'].split('\n').map((line, index) => {
                  return <div key={`${channel.streamId}-comments-${comment['no']}-${index}`}>{line}</div>
                })}
              </div>
            </div>
          )
        })}
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  border-top: solid 1px rgba(0, 0, 0, 0.1);
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  background: white;
  padding: 5px 0px;
  overflow: auto;
  height: 200px;
`

export default Comments
