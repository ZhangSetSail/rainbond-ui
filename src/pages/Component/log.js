/* eslint-disable react/sort-comp */
/* eslint-disable react/no-array-index-key */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-string-refs */
import { Button, Card, Cascader, Form, Input } from 'antd';
import { connect } from 'dva';
import React, { Fragment, PureComponent } from 'react';
import Ansi from '../../components/Ansi/index';
import NoPermTip from '../../components/NoPermTip';
import { getContainerLog, getServiceLog } from '../../services/app';
import appUtil from '../../utils/app';
import globalUtil from '../../utils/global';
import HistoryLog from './component/Log/history';
import History1000Log from './component/Log/history1000';
import styles from './Log.less';

@connect(
  ({ user }) => ({
    currUser: user.currentUser
  }),
  null,
  null,
  { withRef: true }
)
export default class Index extends PureComponent {
  formRef = React.createRef();
  constructor(arg) {
    super(arg);
    this.state = {
      containerLog: [],
      logs: [],
      instances: [],
      started: true,
      showHistoryLog: false,
      showHistory1000Log: false,
      showHighlighted: '',
      filter: '',
      pod_name: '',
      container_name: ''
    };
  }
  componentDidMount() {
    if (!this.canView()) return;
    this.loadLog();
    this.fetchInstanceInfo();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.refs.box &&
      prevState.logs.length !== this.state.logs.length &&
      this.state.showHighlighted === ''
    ) {
      this.refs.box.scrollTop = this.refs.box.scrollHeight;
    }
  }
  componentWillUnmount() {
    if (this.props.socket) {
      this.props.socket.closeLogMessage();
    }
  }
  fetchInstanceInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'appControl/fetchPods',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        app_alias: this.props.appAlias
      },
      callback: res => {
        if (res && res.status_code === 200) {
          const list = (res.list && res.list.new_pods) || [];
          if (list && list.length > 0) {
            list.map(item => {
              item.name = item.pod_name;
              item.container.map(items => {
                items.name = items.container_name;
              });
            });
          }
          this.setState({
            // 接口变化
            instances: list
          });
        }
      }
    });
  };
  onFinish = value => {
    this.setState({ filter: value }, () => {
      const { logs } = this.state;
      this.setLogs(logs);
    });
  };
  setLogs = logs => {
    const { filter } = this.state;
    let newlogs = logs;
    newlogs = logs.filter(item => {
      if (filter == '' || item.indexOf(filter) != -1) {
        return true;
      }
      return false;
    });
    newlogs = newlogs.map(item => {
      if (item.indexOf(filter) != -1) {
        const newitem = item.replace(filter, `\x1b[33m${filter}\x1b[0m`);
        return newitem;
      }
      return item;
    });
    if (newlogs.length > 5000) {
      newlogs = newlogs.slice(logs.length - 5000, logs.length);
      this.setState({ logs: newlogs });
    } else {
      this.setState({ logs: newlogs });
    }
  };
  watchLog() {
    if (this.props.socket) {
      this.props.socket.setOnLogMessage(
        messages => {
          if (messages && messages.length > 0) {
            const logs = this.state.logs || [];
            const newlogs = logs.concat(messages);
            this.setLogs(newlogs);
          }
        },
        messages => {
          if (this.state.started) {
            let logs = this.state.logs || [];
            logs = logs.concat(messages);
            if (this.refs.box) {
              this.refs.box.scrollTop = this.refs.box.scrollHeight;
            }
            this.setLogs(logs);
          }
        }
      );
    }
  }
  loadLog() {
    const { logs } = this.state;
    if (logs.length == 0) {
      this.fetchServiceLog();
    } else {
      this.watchLog();
    }
  }
  fetchServiceLog = () => {
    getServiceLog({
      team_name: globalUtil.getCurrTeamName(),
      app_alias: this.props.appAlias
    }).then(data => {
      if (data) {
        if (this.refs.box) {
          this.refs.box.scrollTop = this.refs.box.scrollHeight;
        }
        this.setState({ logs: data.list || [] });
        this.watchLog();
      }
    });
  };

  fetchContainerLog = () => {
    const { pod_name, container_name } = this.state;
    getContainerLog({
      team_name: globalUtil.getCurrTeamName(),
      app_alias: this.props.appAlias,
      pod_name,
      container_name
    }).then(data => {
      if (data && data.response_data) {
        const arr = data.response_data.split('\n');
        this.setState({
          containerLog: arr || []
        });
      }
    });
  };

  canView() {
    return appUtil.canManageAppLog(this.props.appDetail);
  }
  handleStop = () => {
    this.setState({ started: false });
    if (this.props.socket) {
      this.props.socket.closeLogMessage();
    }
  };
  handleStart = () => {
    this.setState({ started: true });
    this.watchLog();
  };
  showDownHistoryLog = () => {
    this.setState({ showHistoryLog: true });
  };
  hideDownHistoryLog = () => {
    this.setState({ showHistoryLog: false });
  };
  showDownHistory1000Log = () => {
    this.setState({ showHistory1000Log: true });
  };
  hideDownHistory1000Log = () => {
    this.setState({ showHistory1000Log: false });
  };
  onChangeCascader = value => {
    if (value && value.length > 1) {
      this.setState(
        {
          pod_name: value[0],
          container_name: value[1]
        },
        () => {
          this.fetchContainerLog();
        }
      );
    } else {
      this.setState(
        {
          containerLog: []
        },
        () => {
          this.fetchServiceLog();
        }
      );
    }
  };

  render() {
    if (!this.canView()) return <NoPermTip />;
    const { logs, containerLog, showHighlighted, instances } = this.state;
    return (
      <Card
        title={
          <Fragment>
            {this.state.started ? (
              <Button onClick={this.handleStop}>暂停推送</Button>
            ) : (
              <Button onClick={this.handleStart}>开始推送</Button>
            )}
          </Fragment>
        }
        extra={
          <Fragment>
            <a onClick={this.showDownHistoryLog} style={{ marginRight: 10 }}>
              历史日志下载
            </a>
            <a onClick={this.showDownHistory1000Log}>最近1000条日志</a>
          </Fragment>
        }
      >
        <Form layout="inline" name="logFilter" style={{ marginBottom: '16px' }}>
          <Form.Item
            name="container"
            label="容器"
            className={styles.podCascader}
          >
            <Cascader
              fieldNames={{
                label: 'name',
                value: 'name',
                children: 'container'
              }}
              options={instances}
              onChange={this.onChangeCascader}
              placeholder="请选择容器"
            />
          </Form.Item>
          <Form.Item
            name="filter"
            label="过滤文本"
            style={{ marginRight: '0' }}
          >
            <Input.Search style={{ width: '300px' }} onSearch={this.onFinish} />
          </Form.Item>
        </Form>
        <div className={styles.logsss} ref="box">
          {(containerLog &&
            containerLog.length > 0 &&
            containerLog.map((item, index) => {
              return (
                <div key={index}>
                  <span
                    style={{
                      color: '#666666'
                    }}
                  >
                    <span>{index + 1}</span>
                  </span>
                  <span
                    ref="texts"
                    style={{
                      width: '100%',
                      color: '#FFF'
                    }}
                  >
                    <Ansi>{item}</Ansi>
                  </span>
                </div>
              );
            })) ||
            (logs &&
              logs.length > 0 &&
              logs.map((log, index) => {
                return (
                  <div key={index}>
                    <span
                      style={{
                        color:
                          showHighlighted == log.substring(0, log.indexOf(':'))
                            ? '#FFFF91'
                            : '#666666'
                      }}
                    >
                      <span>{log == '' ? '' : `${index + 1}`}</span>
                    </span>
                    <span
                      ref="texts"
                      style={{
                        color:
                          showHighlighted == log.substring(0, log.indexOf(':'))
                            ? '#FFFF91'
                            : '#FFF'
                      }}
                    >
                      <Ansi>
                        {log.substring(log.indexOf(':') + 1, log.length)}
                      </Ansi>
                    </span>

                    {logs.length == 1 ? (
                      <span
                        style={{
                          color:
                            showHighlighted ==
                            log.substring(0, log.indexOf(':'))
                              ? '#FFFF91'
                              : '#bbb',
                          cursor: 'pointer',
                          backgroundColor: log.substring(0, log.indexOf(':'))
                            ? '#666'
                            : ''
                        }}
                        onClick={() => {
                          this.setState({
                            showHighlighted:
                              showHighlighted ==
                              log.substring(0, log.indexOf(':'))
                                ? ''
                                : log.substring(0, log.indexOf(':'))
                          });
                        }}
                      >
                        <Ansi>{log.substring(0, log.indexOf(':'))}</Ansi>
                      </span>
                    ) : logs.length > 1 &&
                      index >= 1 &&
                      log.substring(0, log.indexOf(':')) ==
                        logs[index <= 0 ? index + 1 : index - 1].substring(
                          0,
                          logs[index <= 0 ? index + 1 : index - 1].indexOf(':')
                        ) ? (
                      ''
                    ) : (
                      <span
                        style={{
                          color:
                            showHighlighted ==
                            log.substring(0, log.indexOf(':'))
                              ? '#FFFF91'
                              : '#bbb',
                          cursor: 'pointer',
                          backgroundColor:
                            index == 0 && log.substring(0, log.indexOf(':'))
                              ? '#666'
                              : log.substring(0, log.indexOf(':')) ==
                                logs[
                                  index <= 0 ? index + 1 : index - 1
                                ].substring(
                                  0,
                                  logs[
                                    index <= 0 ? index + 1 : index - 1
                                  ].indexOf(':')
                                )
                              ? ''
                              : '#666'
                        }}
                        onClick={() => {
                          this.setState({
                            showHighlighted:
                              showHighlighted ==
                              log.substring(0, log.indexOf(':'))
                                ? ''
                                : log.substring(0, log.indexOf(':'))
                          });
                        }}
                      >
                        <Ansi>{log.substring(0, log.indexOf(':'))}</Ansi>
                      </span>
                    )}
                  </div>
                );
              }))}
        </div>
        {this.state.showHistoryLog && (
          <HistoryLog
            onCancel={this.hideDownHistoryLog}
            appAlias={this.props.appAlias}
          />
        )}
        {this.state.showHistory1000Log && (
          <History1000Log
            onCancel={this.hideDownHistory1000Log}
            appAlias={this.props.appAlias}
          />
        )}
      </Card>
    );
  }
}
