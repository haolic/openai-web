import { ROLEMAP } from '@/utils/constant';
import { Avatar } from 'antd';
import ReactMarkdown from 'react-markdown';
import ReactSyntaxHighlighter from 'react-syntax-highlighter';
import { atelierSulphurpoolLight, hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm';
import { IMessageItem } from '../MessageContent';
import styles from './index.module.less';
import React from 'react';
import classnames from 'classnames';
import gpt from '@/assets/ChatGPT_24.svg';
import { useSnapshot } from 'valtio';
import store from '@/store';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css'

interface IProps {
  messageInfo: IMessageItem;
  showTypeBlock?: boolean;
}

const colorMap = new Map([
  ['light', atelierSulphurpoolLight],
  ['dark', hybrid],
]);

const MessageItem = React.memo((props: IProps) => {
  const { messageInfo, showTypeBlock } = props;
  const { theme } = useSnapshot(store);

  return (
    <div
      style={{
        backgroundColor:
          messageInfo.role === ROLEMAP.USER ? `${messageInfo.color}10` : 'transparent',
      }}
      className={classnames(styles['msg-item'])}
    >
      {messageInfo.role === ROLEMAP.ASSISTANT && <Avatar src={gpt} size={28} />}
      {messageInfo.role === ROLEMAP.USER && (
        <div className={styles.selfavatar}>
          <div style={{ backgroundColor: messageInfo.color }} className={styles.inneravatar}></div>
        </div>
      )}

      {messageInfo.role === ROLEMAP.ASSISTANT && (
        <div className={classnames(styles.typography, styles[theme])}>
          <ReactMarkdown
            // 数学公式渲染
            rehypePlugins={[rehypeKatex]}
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              table: ({ node, ...props }) => {
                return (
                  <table
                    {...props}
                    border={1}
                    className={styles.table}
                    style={{ borderCollapse: 'collapse', width: '100%' }}
                  />
                );
              },
              a: ({ node, ...props }) => {
                return <a {...props} target="_blank" rel="noreferrer" />;
              },
              pre: ({ node, ...props }) => {
                return <pre {...props} className={styles.pre} />;
              },
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                if (inline) {
                  return (
                    <code {...props} className={classnames(styles.code, className)}>
                      {children}
                    </code>
                  );
                }
                return !inline && match ? (
                  <ReactSyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={colorMap.get(theme) as any}
                    language={match[1]}
                    PreTag="div"
                    className={styles.syntax}
                    {...props}
                  />
                ) : (
                  <code {...props} className={classnames(className, styles.blockcode)}>
                    {children}
                  </code>
                );
              },
            }}
          >
            
            {`${messageInfo.content || ''}${showTypeBlock ? ' ▂' : ''}`}
          </ReactMarkdown>
        </div>
      )}

      {messageInfo.role === ROLEMAP.USER && (
        <div className={styles.usercontent}>{messageInfo.content || ''}</div>
      )}
    </div>
  );
});

export default MessageItem;
